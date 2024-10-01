using System;
using System.Collections.Generic;
using UnityEngine;

public class StarController : MonoBehaviour
{
    public static Dictionary<string, StarController> stars = new();
    public string Id { get; private set; }
    public Vector3 RelativePosition { get; private set; }

    [Obsolete]
    public static StarController CreateStar(string id, GameObject prefab, Vector3 position, int scale, Transform parent)
    {
        GameObject star = Instantiate(prefab, position, Quaternion.identity, parent);
        star.transform.localScale = Vector3.one * scale;
        StarController starController = star.GetComponent<StarController>();
        starController.Id = id;
        stars.Add(id, starController);
        return starController;
    }

    public static StarController CreateStar(string id, GameObject prefab, Vector3 position, int scale, Transform parent, Vector3 relativePosition)
    {
        GameObject star = Instantiate(prefab, position, Quaternion.identity, parent);
        star.transform.localScale = Vector3.one * scale;
        StarController starController = star.GetComponent<StarController>();
        starController.Id = id;
        starController.RelativePosition = relativePosition;
        stars.Add(id, starController);
        return starController;
    }
    
}