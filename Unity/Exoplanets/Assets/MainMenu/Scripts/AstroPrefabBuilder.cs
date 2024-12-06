using ReactUnity.UGUI;
using UnityEngine;

public class AstroPrefabBuilder : MonoBehaviour
{
    public Material[] materials;
    public GameObject prefab;

    public void Build(PrefabComponent Component, int selectedMaterial)
    {
        if (prefab == null)
        {
            Debug.LogError("Prefab no asignado en el AstroPrefabBuilder.");
            return;
        }

        if (selectedMaterial < 0 || selectedMaterial >= materials.Length)
        {
            Debug.LogError("Índice de material inválido.");
            return;
        }

        GameObject instance = Instantiate(prefab, Vector3.zero, Quaternion.identity);
        instance.layer = 7;
        AstroPrefab astro = instance.GetComponent<AstroPrefab>();

        if (astro == null)
        {
            Debug.LogError("El prefab no tiene un componente AstroPrefab.");
            return;
        }

        // Configurar el material y el componente
        astro.SetMaterial(materials[selectedMaterial]);
        astro.Insert(Component);
    }
}

