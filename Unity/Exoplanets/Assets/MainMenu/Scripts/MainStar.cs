using System;
using ReactUnity.Helpers;
using ReactUnity.UGUI;
using ReactUnity.UGUI.Behaviours;
using UnityEngine;

public class MainStar : MonoBehaviour, IPrefabTarget
{
    PrefabComponent Component { get; set; }

    public Material curstomMaterial;
    public ReactRendererUGUI react;
    public GameObject prefab;

    public void Mount(PrefabComponent cmp)
    {
        if (cmp == null)
        {
            Debug.Log("Cmp is null, cannot mount");
            return;
        }
        Debug.Log("Mounting MainStar Component");
        Component = cmp;

        if (prefab != null)
        {
            GameObject instance = Instantiate(prefab, Vector3.zero, Quaternion.identity);
            instance.transform.SetParent(cmp.RectTransform, false);
            instance.transform.localScale = new Vector3(300f, 300f, 300f);

            RectTransform rectTransform = instance.GetComponent<RectTransform>();
            if (rectTransform != null)
            {
                rectTransform.anchorMin = new Vector2(0.5f, 0.5f); // Centro
                rectTransform.anchorMax = new Vector2(0.5f, 0.5f); // Centro
                rectTransform.anchoredPosition = Vector2.zero;
            }

            Renderer renderer = instance.GetComponent<Renderer>();
            if (renderer != null)
            {
                if (curstomMaterial != null)
                {
                    renderer.material = curstomMaterial;
                    Debug.Log("Material assigned successfully");
                }
                else
                {
                    Debug.LogError("Failed to load material");
                }
            }
            else
            {
                Debug.LogError("No Renderer found on the prefab");
            }

            Debug.Log("Prefab instantiated successfully");
        }
        else
        {
            Debug.LogError("Failed to load prefab");
        }
    }

    public bool SetProperty(string propertyName, object value)
    {
        return false;
    }

    public Action AddEventListener(string eventName, Callback callback)
    {
        return null;
    }

    public void Unmount(PrefabComponent cmp)
    {
        Debug.Log("Unmounting Main Star component");
        Component = null;
    }



    void Start()
    {
    }

    void Update()
    {

    }
}
