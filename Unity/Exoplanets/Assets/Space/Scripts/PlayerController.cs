using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using static KeyboardBindings;

public class PlayerController : MonoBehaviour
{
    [SerializeField] float moveSpeed;
    [SerializeField] float rotateSpeed;
    LineRenderer connectionLine;
    StarController currentStar;

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
        UpdateConnection();
    }

    void InitVariables()
    {
        connectionLine = transform.Find("ConnectionLine").GetComponent<LineRenderer>();
    }

    void InitConfig()
    {
        Cursor.lockState = CursorLockMode.Locked;
    }

    void MovePlayer(Vector3 dir)
    {
        transform.Translate(Time.deltaTime * moveSpeed * dir);
    }

    void CheckMovement()
    {
        if (Input.GetKey(FORWARD))
        {
            MovePlayer(Vector3.forward);
        }
        if (Input.GetKey(BACKWARD))
        {
            MovePlayer(Vector3.back);
        }
        if (Input.GetKey(LEFT))
        {
            MovePlayer(Vector3.left);
        }
        if (Input.GetKey(RIGHT))
        {
            MovePlayer(Vector3.right);
        }
        if (Input.GetKeyDown(REGENERATE_STARS))
        {
            SpaceController.instance.RegenerateStars();
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
        }
        if (Input.GetKeyDown(SAVE_CONSTELLATION))
        {
            SpaceController.instance.SaveConstellation("Constellation");
        }
    }

    void StartConnection(StarController star)
    {
        currentStar = star;
        connectionLine.positionCount = 2;
    }

    void UpdateConnection()
    {
        if (currentStar != null)
        {
            connectionLine.SetPosition(0, currentStar.transform.position);
            connectionLine.SetPosition(1, Camera.main.transform.position + Camera.main.transform.forward * 10);
        }
    }

    void EndConnection(StarController star)
    {
        if (currentStar != null)
        {
            SpaceController.instance.AddConstellationConnection(currentStar, star);
            connectionLine.positionCount = 0;
            currentStar = null;
        }
    }

    void CheckRotation()
    {
        float mouseX = Input.GetAxis("Mouse X");
        float mouseY = Input.GetAxis("Mouse Y");

        transform.Rotate(Vector3.up, mouseX * rotateSpeed);
        transform.Rotate(Vector3.left, mouseY * rotateSpeed);
    }
}
