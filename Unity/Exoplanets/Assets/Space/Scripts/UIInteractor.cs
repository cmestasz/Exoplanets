using TMPro;
using UnityEngine;

public class UIInteractor : MonoBehaviour
{
    [SerializeField] private TMP_InputField constellationNameInput;
    public static UIInteractor Instance { get; private set; }


    void Awake()
    {
        Instance = this;
    }

    public string GetConstellationName()
    {
        return constellationNameInput.text;
    }
}