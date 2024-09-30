using System.Collections.Generic;
using UnityEngine;

public class StarController : MonoBehaviour
{
    public static Dictionary<string, StarController> stars = new();
    string id;

    public static StarController CreateStar(string id, GameObject prefab, Vector3 position, int scale, Transform parent)
    {
        GameObject star = Instantiate(prefab, position, Quaternion.identity, parent);
        star.transform.localScale = Vector3.one * scale;
        StarController starController = star.GetComponent<StarController>();
        starController.id = id;
        stars.Add(id, starController);
        return starController;
    }

}