using System.Collections;
using System.Collections.Generic;
using ReactUnity.Interfaces;
using ReactUnity.UGUI;
using UnityEngine;

public class AstroPrefab : MonoBehaviour, IReactInsertable
{

    private Material selectedMaterial;

    public void SetMaterial(Material mat)
    {
        selectedMaterial = mat;
    }

    public void Insert(PrefabComponent Component)
    {
        gameObject.transform.SetParent(Component.RectTransform, false);
        gameObject.transform.localScale = new Vector3(250f, 250f, 250f);
        RectTransform rectTransform = gameObject.GetComponent<RectTransform>();
        if (rectTransform != null)
        {
            rectTransform.anchorMin = new Vector2(0.5f, 0.5f); // Centro
            rectTransform.anchorMax = new Vector2(0.5f, 0.5f); // Centro
            rectTransform.anchoredPosition = Vector2.zero;
        }
        Renderer renderer = gameObject.GetComponent<Renderer>();
        if (renderer != null)
        {
            if (selectedMaterial != null)
            {
                renderer.material = selectedMaterial;
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

    }
    void Start()
    {

    }

    void Update()
    {

    }
}
