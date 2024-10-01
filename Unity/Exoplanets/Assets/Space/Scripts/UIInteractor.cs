using TMPro;
using UnityEngine;

public class UIInteractor : MonoBehaviour
{
    [SerializeField] private TMP_InputField constellationNameInput;
    [SerializeField] private TMP_Text infoText;
    [SerializeField] private TMP_InputField warpToX, warpToY, warpToZ;
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

    public Vector3 GetWarpPosition()
    {
        float x = float.Parse(warpToX.text);
        float y = float.Parse(warpToY.text);
        float z = float.Parse(warpToZ.text);
        return new Vector3(x, y, z);
    }
}