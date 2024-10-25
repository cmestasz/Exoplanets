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
        SRotateWindow(90 * (windowIdx - direction), 90 * windowIdx);
        Debug.Log("Window index: " + windowIdx);
    }

    private IEnumerator RotateWindow(float start, float end)
    {
        float t = 0;
        while (t < 1)
        {
            t += Time.deltaTime;
            transform.localRotation = Quaternion.Euler(0, Mathf.Lerp(start, end, t), 0);
            yield return null;
        }
    }
}