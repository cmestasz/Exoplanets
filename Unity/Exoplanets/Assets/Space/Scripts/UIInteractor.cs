using TMPro;
using UnityEngine;

public class UIInteractor : MonoBehaviour
{
    [SerializeField] private TMP_InputField constellationNameInput;
    [SerializeField] private TMP_Text infoText;
    [SerializeField] private TMP_InputField warpToRA, warpToDEC, warpToPARALLAX;
    public static UIInteractor Instance { get; private set; }


    void Awake()
    {
        Instance = this;
    }

    public string GetConstellationName()
    {
        return constellationNameInput.text;
    }

    public void SetInfoText(string text)
    {
        infoText.text = text;
    }

    public SpaceCoord GetWarpPosition()
    {
        float ra = float.Parse(warpToRA.text);
        float dec = float.Parse(warpToDEC.text);
        float parallax = float.Parse(warpToPARALLAX.text);
        return new SpaceCoord(ra, dec, parallax);
    }
}