using UnityEngine;

public class SettingsManager : MonoBehaviour
{
    public static SettingsManager instance;
    public static string Language { get; private set; } = "en";

    void Awake()
    {
        if (instance == null)
        {
            InitialConfig();
            instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
        ReloadConfig();
    }

    public void InitialConfig()
    {
    }

    public void ReloadConfig()
    {
    }
}