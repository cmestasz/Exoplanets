using System.Collections;
using UnityEngine;
using static KeyboardBindings;

public class CalibrationInputController : MonoBehaviour
{
    [SerializeField] private float webcamUpdateDelay;
    private int windowIdx = 0; // 0 - 3
    private string currentAction = "";

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
                    currentAction = response.action;
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
        string text;
        switch (currentAction)
        {
            case "left":
                text = "Moviendose a la izquierda (left)";
                break;
            case "right":
                text = "Moviendose a la derecha (right)";
                break;
            case "up":
                text = "Moviendose hacia arriba (up)";
                break;
            case "down":
                text = "Moviendose hacia abajo (down)";
                break;
            case "zoom_in":
                text = "Acercando la camara (zoom_in)";
                break;
            case "zoom_out":
                text = "ALejando la camara (zoom_out)";
                break;
            default:
                text = "Haciendo nada (do_nothing)";
                break;
        }
        UIInteractor.Instance.SetInfoText(text);
    }

    private void ChangeWindow(int direction)
    {
        windowIdx = (windowIdx + direction + 4) % 4;
        transform.rotation = Quaternion.Euler(0, windowIdx * 90, 0);
    }

}