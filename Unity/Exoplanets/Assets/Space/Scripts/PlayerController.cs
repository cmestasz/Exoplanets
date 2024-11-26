using System.Collections;
using UnityEngine;
using static KeyboardBindings;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float moveSpeed;
    [SerializeField] private float rotateSpeed;
    [SerializeField] private float cursorSpeed;
    [SerializeField] private float zoomSpeed;
    [SerializeField] private float updateDelay;
    [SerializeField] private bool webcamInputActive;
    public static PlayerController Instance { get; private set; }
    public LineRenderer ConnectionLine { get; private set; }
    public StarController CurrentStar { get; private set; }
    public Vector3Int CurrentSector { get; private set; }
    private bool InputActive { get; set; }
    private WebCamTexture webcamTexture;
    private InputResponse currentAction;
    private Vector2 cursorPos;
    private const float borderOffset = 50;

    private void Awake()
    {
        Instance = this;
    }

    // Start is called before the first frame update
    void Start()
    {
        InitVariables();
        InitConfig();
    }

    // Update is called once per frame
    void Update()
    {
        CheckMovement();
        CheckRotation();
        CheckInteractions();
        CheckAlwaysActive();
        UpdateConstellationConnection();
        ProcessCurrentAction();
    }

    void InitVariables()
    {
        ConnectionLine = transform.Find("ConnectionLine").GetComponent<LineRenderer>();
        CurrentSector = Vector3Int.zero;
    }

    void InitConfig()
    {
        webcamTexture = new();
        webcamTexture.Play();
        StartCoroutine(GetInput());
    }

    private IEnumerator GetInput()
    {
        Color32[] colors = new Color32[webcamTexture.width * webcamTexture.height];
        while (true)
        {
            yield return new WaitUntil(() => webcamInputActive);
            webcamTexture.GetPixels32(colors);
            byte[] bytes = ImageConversion.EncodeArrayToJPG(colors, UnityEngine.Experimental.Rendering.GraphicsFormat.R8G8B8A8_SRGB, (uint)webcamTexture.width, (uint)webcamTexture.height, 0, 50);

            yield return
                APIConnector.PostBytes<InputResponse>("get_action", bytes, response =>
                {
                    currentAction = response;
                });
            yield return new WaitForSeconds(updateDelay);
        }
    }

    private void ProcessCurrentAction()
    {
        if (currentAction == null) return;
        if (currentAction.cursor.IsValid())
        {
            Vector2 canvasSize = UIInteractor.Instance.GetCanvasSize();
            float x = Mathf.Clamp(cursorPos.x + (currentAction.cursor.x - 0.5f) * cursorSpeed, -canvasSize.x / 2 + borderOffset, canvasSize.x / 2 - borderOffset);
            float y = Mathf.Clamp(cursorPos.y + (currentAction.cursor.y - 0.5f) * cursorSpeed, -canvasSize.y / 2 + borderOffset, canvasSize.y / 2 - borderOffset);
            cursorPos = new Vector2(x, y);
            UIInteractor.Instance.MoveCrosshair(cursorPos);
        }
        if (currentAction.rotation.IsValid())
        {
            transform.Rotate(Vector3.up, currentAction.rotation.dx * rotateSpeed);
            transform.Rotate(Vector3.left, currentAction.rotation.dy * rotateSpeed);
        }
        if (currentAction.zoom != 0)
        {
            transform.Translate(currentAction.zoom * zoomSpeed * Vector3.forward);
        }
        switch (currentAction.right_gesture)
        {
            case "click":
                TryGetInfo();
                break;
            case "select":
                TryStartConnection();
                break;
            case "deselect":
                TryEndConnection(); // TODO: maybe we should try to end it after a bit
                break;
        }
    }

    void CheckMovement()
    {
        if (!InputActive) return;

        Vector3 dir = Vector3.zero;

        if (Input.GetKey(FORWARD))
        {
            dir += Vector3.forward;
        }
        if (Input.GetKey(BACKWARD))
        {
            dir += Vector3.back;
        }
        if (Input.GetKey(LEFT))
        {
            dir += Vector3.left;
        }
        if (Input.GetKey(RIGHT))
        {
            dir += Vector3.right;
        }

        dir = dir.normalized;
        if (Input.GetKey(SPEED_UP))
        {
            dir *= 2;
        }

        transform.Translate(Time.deltaTime * moveSpeed * dir);
    }

    void CheckInteractions()
    {
        if (!InputActive) return;

        if (Input.GetKeyDown(ADD_TO_CONSTELLATION))
        {
            if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit))
            {
                if (hit.collider.TryGetComponent<StarController>(out var star))
                {
                    StartConnection(star);
                }
            }
        }
        if (Input.GetKeyUp(ADD_TO_CONSTELLATION))
        {
            if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit))
            {
                if (hit.collider.TryGetComponent<StarController>(out var star))
                {
                    EndConnection(star);
                }
            }
            else
            {
                EndConnection();
            }
        }
        if (Input.GetKeyDown(SAVE_CONSTELLATION))
        {
            SpaceController.Instance.SaveConstellation(UIInteractor.Instance.GetConstellationName());
        }
        if (Input.GetKeyDown(WARP_POS))
        {
            SpaceController.Instance.WarpToPos(UIInteractor.Instance.GetWarpPosition());
        }
        if (Input.GetKeyDown(WARP_ID))
        {
            SpaceController.Instance.WarpToId(UIInteractor.Instance.GetWarpId());
        }
        if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit2)
            && hit2.collider.TryGetComponent<IHasInfo>(out var hasInfo)
            && Input.GetKeyDown(GET_INFO))
        {
            UIInteractor.Instance.SetInfoText(hasInfo.Info);
        }
    }

    private void TryGetInfo()
    {
        if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit)
            && hit.collider.TryGetComponent<IHasInfo>(out var hasInfo))
        {
            UIInteractor.Instance.SetInfoText(hasInfo.Info);
        }
    }

    private void TryStartConnection()
    {
        if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit)
            && hit.collider.TryGetComponent<StarController>(out var star))
        {
            StartConnection(star);
        }
    }

    private void TryEndConnection()
    {
        if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit)
            && hit.collider.TryGetComponent<StarController>(out var star))
        {
            EndConnection(star);
        }
        else
        {
            EndConnection();
        }
    }

    void CheckAlwaysActive()
    {
        if (Input.GetKeyDown(TOGGLE_INPUT))
        {
            ToggleInput();
        }
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            Application.Quit();
        }
    }

    void StartConnection(StarController star)
    {
        CurrentStar = star;
        ConnectionLine.positionCount = 2;
    }

    void UpdateConstellationConnection()
    {
        if (CurrentStar != null)
        {
            ConnectionLine.SetPosition(0, CurrentStar.transform.position);
            ConnectionLine.SetPosition(1, Camera.main.transform.position + Camera.main.transform.forward * 100);
        }
    }

    void EndConnection(StarController star)
    {
        if (CurrentStar != null)
        {
            SpaceController.Instance.AddConstellationConnection(CurrentStar, star);
            ConnectionLine.positionCount = 0;
            CurrentStar = null;
        }
    }

    void EndConnection()
    {
        if (CurrentStar != null)
        {
            ConnectionLine.positionCount = 0;
            CurrentStar = null;
        }
    }

    void CheckRotation()
    {
        if (!InputActive) return;

        float mouseX = Input.GetAxis("Mouse X");
        float mouseY = Input.GetAxis("Mouse Y");

        transform.Rotate(Vector3.up, mouseX * rotateSpeed);
        transform.Rotate(Vector3.left, mouseY * rotateSpeed);
    }

    void ToggleInput()
    {
        InputActive = !InputActive;
        UnityEngine.Cursor.lockState = InputActive ? CursorLockMode.Locked : CursorLockMode.None;
    }
}
