using System.Collections;
using UnityEngine;
using static KeyboardBindings;

public class CalibrationInputController : MonoBehaviour
{
    [SerializeField] private float webcamUpdateDelay;
    private int windowIdx = 0; // 0 - 3
    private InputResponse currentAction;

    void Start()
    {
        StartCoroutine(GetWebcamInput());
    }

    void Update()
    {
        CheckInput();
        ProcessCurrentAction();
    }

    private IEnumerator GetWebcamInput()
    {
        yield return null;
        WebCamTexture webcamTexture = WebcamDisplayController.Instance.WebcamTexture;
        Texture2D texture = new(webcamTexture.width, webcamTexture.height);
        while (true)
        {
            texture.SetPixels32(webcamTexture.GetPixels32());
            byte[] bytes = texture.EncodeToJPG(50);

            yield return
                APIConnector.PostBytes<InputResponse>("get_action_by_image", bytes, response =>
                {
                    currentAction = response;
                });
            yield return new WaitForSeconds(webcamUpdateDelay);
        }
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

    private void ProcessCurrentAction()
    {
        if (currentAction == null) return;
    }

    private void ChangeWindow(int direction)
    {
        windowIdx = (windowIdx + direction + 4) % 4;
        transform.rotation = Quaternion.Euler(0, windowIdx * 90, 0);
    }

}