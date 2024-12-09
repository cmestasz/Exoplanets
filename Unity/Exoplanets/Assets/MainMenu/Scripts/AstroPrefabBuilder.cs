using System.Collections.Generic;
using ReactUnity.UGUI;
using UnityEngine;

public class AstroPrefabBuilder : MonoBehaviour
{
    public Material[] materials;
    public GameObject prefab;
    public List<GameObject> instances;

    public int Build(PrefabComponent Component, int selectedMaterial)
    {
        if (prefab == null)
        {
            Debug.LogError("Prefab no asignado en el AstroPrefabBuilder.");
            return -1;
        }

        if (selectedMaterial < 0 || selectedMaterial >= materials.Length)
        {
            Debug.LogError("Índice de material inválido.");
            return -1;
        }

        GameObject instance = Instantiate(prefab, Vector3.zero, Quaternion.identity);
        instance.layer = 7;
        AstroPrefab astro = instance.GetComponent<AstroPrefab>();

        if (astro == null)
        {
            Debug.LogError("El prefab no tiene un componente AstroPrefab.");
            return -1;
        }

        // Configurar el material y el componente
        astro.SetMaterial(materials[selectedMaterial]);
        astro.Insert(Component);


        instances.Add(instance);
        return instances.Count - 1;
    }

    public void Destroy(int index)
    {
        if (index < 0 || index >= instances.Count)
        {
            Debug.LogError("Índice fuera de rango para destruir la instancia.");
            return;
        }

        GameObject destroyThis = instances[index];
        Destroy(destroyThis);
        instances.RemoveAt(index);
    }
}

