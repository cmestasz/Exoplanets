using System.Collections;
using System.Collections.Generic;
using ReactUnity.UGUI;
using UnityEngine;

public class AstroPrefabBuilder : MonoBehaviour
{

    public Material[] materials;

    public GameObject prefab;

    public void Build(PrefabComponent Component, int selectedMaterial)
    {
        AstroPrefab astro = new()
        {
            prefab = prefab
        };
        astro.SetMaterial(materials[selectedMaterial]);
        astro.Insert(Component);
    }
}
