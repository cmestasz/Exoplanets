using UnityEngine;

public class AdjustCamera : MonoBehaviour
{
    public Canvas canvas;
    private Camera mainCamera;

    private RectTransform canvasRect;

    private Vector2 lastSize;

    private void GetCamera()
    {
        mainCamera = Camera.main;
        if (mainCamera == null)
        {
            Debug.LogError("No se encontró una cámara principal.");
            return;
        }
        mainCamera.orthographic = true;
    }

    private void Adjust()
    {        

        float canvasHeight = canvasRect.rect.height / 2f;
        mainCamera.orthographicSize = canvasHeight;
        

        mainCamera.transform.position = new Vector3(
            canvasRect.position.x,
            canvasRect.position.y,
            canvasRect.position.z - ( canvasHeight / 2f )
        );

    }

    void Start()
    {
        canvasRect = canvas.GetComponent<RectTransform>();
        GetCamera();
        Adjust();
        lastSize = canvasRect.rect.size;
    }

    void Update()
    {
        if (canvasRect != null && canvasRect.rect.size != lastSize)
        {
            Adjust();
            lastSize = canvasRect.rect.size;
        }
    }
}
