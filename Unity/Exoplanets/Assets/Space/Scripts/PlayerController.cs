using System.Collections;
using UnityEngine;
using static KeyboardBindings;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float normMoveSpeed, normRotateSpeed;
    [SerializeField] private float capRotateSpeed, capCursorSpeed, capZoomSpeed;
    [SerializeField] private float updateDelay;
    [SerializeField] private bool webcamInputActive;
    public static PlayerController Instance { get; private set; }
    public LineRenderer ConnectionLine { get; private set; }
    public StarController CurrentStar { get; private set; }
    private bool InputActive { get; set; }
    private int unselectedTolerance;
    private WebCamTexture webcamTexture;
    private InputResponse currentAction;
    private Vector2 cursorPos;
    private const float BORDER_OFFSET = 50;
    private const int BASE_UNSELECTED_TOLERANCE = 5;

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
        ConstantProcessCurrentAction();
    }

    private void InitVariables()
    {
        ConnectionLine = transform.Find("ConnectionLine").GetComponent<LineRenderer>();
        unselectedTolerance = BASE_UNSELECTED_TOLERANCE;
    }

    private void InitConfig()
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
                    WhenReceivedProcessCurrentAction();
                }, false);
            yield return new WaitForSeconds(updateDelay);
        }
    }

    private void WhenReceivedProcessCurrentAction()
    {
        switch (currentAction.right_gesture)
        {
            case "click":
                TryGetInfo();
                break;
            case "select":
                if (CurrentStar == null)
                    TryStartConnection();
                break;
            case "none":
                if (CurrentStar != null)
                    TryEndConnection();
                break;
        }
    }

    private void ConstantProcessCurrentAction()
    {
        if (currentAction == null) return;
        if (currentAction.cursor.IsValid() && CurrentStar == null)
        {
            Vector2 canvasSize = UIInteractor.Instance.GetCanvasSize();
            float x = Mathf.Clamp(cursorPos.x + (currentAction.cursor.x - 0.5f) * capCursorSpeed * Time.deltaTime, BORDER_OFFSET, canvasSize.x - BORDER_OFFSET);
            float y = Mathf.Clamp(cursorPos.y + (currentAction.cursor.y - 0.5f) * capCursorSpeed * Time.deltaTime, BORDER_OFFSET, canvasSize.y - BORDER_OFFSET);
            cursorPos = new Vector2(x, y);
            UIInteractor.Instance.MoveCrosshair(cursorPos);
        }
        if (currentAction.rotation.IsValid())
        {
            transform.Rotate(Vector3.up, Time.deltaTime * currentAction.rotation.dx * capRotateSpeed);
            transform.Rotate(Vector3.left, Time.deltaTime * currentAction.rotation.dy * capRotateSpeed);
        }
        if (currentAction.zoom != 0)
        {
            transform.Translate(Time.deltaTime * currentAction.zoom * capZoomSpeed * Vector3.forward);
        }
    }

    private void CheckMovement()
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

        transform.Translate(Time.deltaTime * normMoveSpeed * dir);
    }

    private void CheckInteractions()
    {
        if (!InputActive) return;

        if (Input.GetKeyDown(ADD_TO_CONSTELLATION))
        {
            TryStartConnection();
        }
        if (Input.GetKeyUp(ADD_TO_CONSTELLATION))
        {
            TryEndConnection();
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
        if (Input.GetKeyDown(RANDOM_STARS))
        {
            SpaceController.Instance.BuildRandomStars();
        }
        if (Input.GetKeyDown(GET_INFO))
        {
            TryGetInfo();
        }
    }

    private void TryGetInfo()
    {
        RaycastCheckType<IHasInfo>((hasInfo) => UIInteractor.Instance.SetInfoText(hasInfo.Info));
    }

    private void TryStartConnection()
    {
        RaycastCheckType<StarController>((star) => StartConnection(star));
    }

    private void TryEndConnection()
    {
        RaycastCheckType<StarController>((star) => EndConnection(star), () => EndConnection());
    }

    private void CheckAlwaysActive()
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

    private void StartConnection(StarController star)
    {
        CurrentStar = star;
        ConnectionLine.positionCount = 2;
    }

    private void UpdateConstellationConnection()
    {
        if (CurrentStar != null)
        {
            ConnectionLine.SetPosition(0, CurrentStar.transform.position);
            Ray ray = GetCrosshairRay();
            ConnectionLine.SetPosition(1, transform.position + ray.direction * 100);
        }
    }

    private void EndConnection(StarController star)
    {
        if (CurrentStar != null)
        {
            SpaceController.Instance.AddConstellationConnection(CurrentStar, star);
            ConnectionLine.positionCount = 0;
            CurrentStar = null;
        }
    }

    private void EndConnection()
    {
        if (CurrentStar != null)
        {
            ConnectionLine.positionCount = 0;
            CurrentStar = null;
        }
    }

    private void CheckRotation()
    {
        if (!InputActive) return;

        float mouseX = Input.GetAxis("Mouse X");
        float mouseY = Input.GetAxis("Mouse Y");

        transform.Rotate(Vector3.up, mouseX * normRotateSpeed);
        transform.Rotate(Vector3.left, mouseY * normRotateSpeed);
    }

    private void RaycastCheckType<ToCheck>(System.Action<ToCheck> isType, System.Action isntType = null)
    {
        Ray ray = GetCrosshairRay();
        Debug.DrawRay(transform.position, ray.direction * 100, Color.red, 5);
        if (Physics.Raycast(ray, out RaycastHit hit) && hit.collider.TryGetComponent<ToCheck>(out var obj))
            isType(obj);
        else
            isntType?.Invoke();
    }

    private Ray GetCrosshairRay()
    {
        Vector2 pos = UIInteractor.Instance.GetCrosshairPosition();
        Vector2 canvasSize = UIInteractor.Instance.GetCanvasSize();
        Vector2 screenPos = new(
            pos.x / canvasSize.x * Screen.width,
            pos.y / canvasSize.y * Screen.height
        );
        return Camera.main.ScreenPointToRay(screenPos);
    }

    private void ToggleInput()
    {
        InputActive = !InputActive;
        UnityEngine.Cursor.lockState = InputActive ? CursorLockMode.Locked : CursorLockMode.None;
    }
}
