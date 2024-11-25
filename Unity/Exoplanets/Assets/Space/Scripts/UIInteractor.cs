using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using static Animations;

public class UIInteractor : MonoBehaviour
{
    private TMP_Text infoText, titleText;
    private TMP_InputField warpToRA, warpToDEC, warpToDIST, warpToID, constellationName;
    private Image crosshair;
    private const float TITLE_TIME = 2, TITLE_DELAY = 2;
    public static UIInteractor Instance { get; private set; }

    private void Awake()
    {
        Instance = this;
    }

    private void Start()
    {
        InitVariables();
    }

    private void InitVariables()
    {
        infoText = transform.Find("InfoText").GetComponent<TMP_Text>();
        titleText = transform.Find("TitleText").GetComponent<TMP_Text>();
        warpToRA = transform.Find("WarpToRA").GetComponent<TMP_InputField>();
        warpToDEC = transform.Find("WarpToDEC").GetComponent<TMP_InputField>();
        warpToDIST = transform.Find("WarpToDIST").GetComponent<TMP_InputField>();
        warpToID = transform.Find("WarpToID").GetComponent<TMP_InputField>();
        constellationName = transform.Find("ConstellationName").GetComponent<TMP_InputField>();
        crosshair = transform.Find("Crosshair").GetComponent<Image>();
    }

    public string GetConstellationName()
    {
        return constellationName.text;
    }

    public void SetInfoText(string text)
    {
        infoText.text = text;
    }

    public SpaceCoord GetWarpPosition()
    {
        float ra = float.Parse(warpToRA.text);
        float dec = float.Parse(warpToDEC.text);
        float dist = float.Parse(warpToDIST.text);
        return new SpaceCoord(ra, dec, dist);
    }

    public string GetWarpId()
    {
        return warpToID.text;
    }

    public void ShowTitle(string title)
    {
        StartCoroutine(ShowTitleAnim(title));
    }

    public void MoveCrosshair(Vector2 position)
    {
        crosshair.rectTransform.anchoredPosition = position;
    }

    private IEnumerator ShowTitleAnim(string title)
    {
        titleText.text = title;
        yield return new WaitForSeconds(TITLE_DELAY);
        yield return TitleFadeIn(titleText);
        yield return new WaitForSeconds(TITLE_TIME);
        yield return TitleFadeOut(titleText);
    }
}