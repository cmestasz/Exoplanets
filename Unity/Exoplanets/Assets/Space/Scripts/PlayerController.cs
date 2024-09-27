using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using static KeyboardBindings;

public class PlayerController : MonoBehaviour
{
    [SerializeField] float moveSpeed;
    [SerializeField] float rotateSpeed;

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
    }

    void InitVariables()
    {
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
    }

    void CheckRotation()
    {
        float mouseX = Input.GetAxis("Mouse X");
        float mouseY = Input.GetAxis("Mouse Y");

        transform.Rotate(Vector3.up, mouseX * rotateSpeed);
        transform.Rotate(Vector3.left, mouseY * rotateSpeed);
    }
}
