using System.Collections;
using UnityEngine;
using static KeyboardBindings;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float moveSpeed;
    [SerializeField] private float rotateSpeed;
    [SerializeField] private float updateDelay;
    [SerializeField] private bool webcamInputActive;
    public LineRenderer ConnectionLine { get; private set; }
    public StarController CurrentStar { get; private set; }
    public Vector3Int CurrentSector { get; private set; }
    private bool InputActive { get; set; }
    private WebCamTexture webcamTexture;
    private string currentAction;

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
        Debug.Log(webcamTexture.graphicsFormat);
        while (true)
        {
            yield return new WaitUntil(() => webcamInputActive);
            webcamTexture.GetPixels32(colors);
            byte[] bytes = ImageConversion.EncodeArrayToJPG(colors, UnityEngine.Experimental.Rendering.GraphicsFormat.R8G8B8A8_SRGB, (uint)webcamTexture.width, (uint)webcamTexture.height, 0, 50);

            yield return
                APIConnector.PostBytes<InputResponse>("get_action_by_image", bytes, response =>
                {
                    currentAction = response.action;
                });
            yield return new WaitForSeconds(updateDelay);
        }
    }

    private void ProcessCurrentAction()
    {
        if (currentAction == null) return;
        switch (currentAction)
        {
            case "left":
                transform.Rotate(Vector3.up, -rotateSpeed);
                break;
            case "right":
                transform.Rotate(Vector3.up, rotateSpeed);
                break;
            case "up":
                transform.Rotate(Vector3.left, -rotateSpeed);
                break;
            case "down":
                transform.Rotate(Vector3.left, rotateSpeed);
                break;
            case "zoom_in":
                transform.Translate(moveSpeed * Time.deltaTime * Vector3.forward);
                break;
            case "zoom_out":
                transform.Translate(moveSpeed * Time.deltaTime * Vector3.back);
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
        Cursor.lockState = InputActive ? CursorLockMode.Locked : CursorLockMode.None;
    }
}
