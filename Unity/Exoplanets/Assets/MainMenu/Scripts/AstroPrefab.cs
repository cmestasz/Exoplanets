using System.Collections;
using System.Collections.Generic;
using ReactUnity.Interfaces;
using ReactUnity.UGUI;
using UnityEngine;

public class AstroPrefab : MonoBehaviour, IReactInsertable
{

    private GameObject instance;

    private Material selectedMaterial;

    public GameObject prefab;


    public void SetMaterial(Material mat)
    {
        selectedMaterial = mat;
    }

    public void Insert(PrefabComponent Component)
    {
        if (prefab != null)
        {
            instance = Instantiate(prefab, Vector3.zero, Quaternion.identity);
            instance.transform.SetParent(Component.RectTransform, false);
            instance.transform.localScale = new Vector3(250f, 250f, 250f);
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
                if (selectedMaterial != null)
                {
                    renderer.material = selectedMaterial;
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
            Debug.Log("Prefab is null");
        }
    }
    void Start()
    {

    }

    void Update()
    {

    }
}
