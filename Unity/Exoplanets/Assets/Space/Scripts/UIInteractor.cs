using UnityEngine;
using UnityEngine.UI;

public class UIInteractor : MonoBehaviour
{
    public Image crosshair;
    public static UIInteractor Instance { get; private set; }

    private void Awake()
    {
        Instance = this;
    }

    public void MoveCrosshair(Vector2 position)
    {
        crosshair.rectTransform.anchoredPosition = position;
    }

    public Vector2 GetCrosshairPosition()
    {
        return crosshair.rectTransform.anchoredPosition;
    }

    public float GetScaleFactor()
    {
        return GetComponent<Canvas>().scaleFactor;
    }

    public Vector2 GetCanvasSize()
    {
        RectTransform rt = GetComponent<RectTransform>();
        return new Vector2(rt.rect.width, rt.rect.height);
    }
}