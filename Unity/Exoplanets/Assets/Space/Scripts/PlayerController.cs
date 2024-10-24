using System.Collections;
using UnityEngine;
using static KeyboardBindings;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float moveSpeed;
    [SerializeField] private float rotateSpeed;
    [SerializeField] private float updateDelay;
    public LineRenderer ConnectionLine { get; private set; }
    public StarController CurrentStar { get; private set; }
    public Vector3Int CurrentSector { get; private set; }
    private bool InputActive { get; set; }
    private WebCamTexture webcamTexture;

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
        // Cursor.lockState = CursorLockMode.Locked;
        webcamTexture = new();
        Renderer renderer = GameObject.Find("WebcamDisplay").GetComponent<Renderer>();
        renderer.material.mainTexture = webcamTexture;
        webcamTexture.Play();
        webcamTexture.requestedFPS = 15;
        StartCoroutine(GetInput());
    }

    private IEnumerator GetInput()
    {
        Texture2D texture = new(webcamTexture.width, webcamTexture.height);
        while (true)
        {
            texture.SetPixels32(webcamTexture.GetPixels32());
            byte[] bytes = texture.EncodeToJPG(50);
            
            yield return
                APIConnector.PostBytes<InputResponse>("get_action_by_image", bytes, response =>
                {
                });
            yield return new WaitForSeconds(updateDelay);
        }
    }

    private void ProcessAction(string action)
    {
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

        if (Input.GetKeyDown(REGENERATE_STARS))
        {
            SpaceController.Instance.RegenerateStars();
        }
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
        if (Input.GetKeyDown(WARP))
        {
            SpaceController.Instance.WarpTo(UIInteractor.Instance.GetWarpPosition());
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
