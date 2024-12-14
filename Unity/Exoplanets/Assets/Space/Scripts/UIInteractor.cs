using UnityEngine;
using UnityEngine.UI;

public class UIInteractor : MonoBehaviour
{
    private Image crosshair;
    public static UIInteractor Instance { get; private set; }

    private RectTransform rt;

    private float lastWidth;

    private float lastHeight;

    private void Awake()
    {
        Instance = this;
    }

    private void Start()
    {
        rt = GetComponent<RectTransform>();
        crosshair = transform.Find("Crosshair").GetComponent<Image>();
        AdjustCrosshair();
    }

    private void Update()
    {
        if (lastWidth != rt.rect.width || lastHeight != rt.rect.height)
        {
            AdjustCrosshair();
        }
    }

    public void AdjustCrosshair()
    {
        crosshair.rectTransform.anchoredPosition = new Vector2(
            rt.rect.width / 2f,
            rt.rect.height / 2f
        );
        lastHeight = rt.rect.height;
        lastWidth = rt.rect.width;
    }

    public void MoveCrosshair(Vector2 position)
    {
        crosshair.rectTransform.anchoredPosition = position;
    }

    public RectTransform GetCanvasRectTransform()
    {
        return rt;
    }

    public Vector2 GetCrosshairPosition()
    {
        return crosshair.rectTransform.anchoredPosition;
    }
    public Vector2 GetRectCrosshairPosition()
    {
        return crosshair.rectTransform.localPosition;
    }
    public RectTransform GetRectCrosshair()
    {
        return crosshair.rectTransform;
    }

    public float GetScaleFactor()
    {
        return GetComponent<Canvas>().scaleFactor;
    }

    public Vector2 GetCanvasSize()
    {
        return new Vector2(rt.rect.width, rt.rect.height);
    }
}