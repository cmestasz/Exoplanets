using System.Collections;
using UnityEngine;
using static KeyboardBindings;

public class CalibrationInputController : MonoBehaviour
{
    private int windowIdx = 0; // 0 - 3

    void Update()
    {
        CheckInput();
    }

    private void CheckInput()
    {
        if (Input.GetKeyDown(RIGHT))
        {
            ChangeWindow(1);
        }
        else if (Input.GetKeyDown(LEFT))
        {
            ChangeWindow(-1);
        }
    }

    private void ChangeWindow(int direction)
    {
        windowIdx = (windowIdx + direction + 4) % 4;
        transform.rotation = Quaternion.Euler(0, windowIdx * 90, 0);
    }

}