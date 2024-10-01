using System;
using System.Collections.Generic;
using UnityEngine;

public class StarController : MonoBehaviour, IHasInfo
{
    // TODO: maybe keep a serializable star object inside of here??

    public static Dictionary<string, StarController> stars = new();
    public static Vector3 RelativePosition { get; private set; }
    public string Id { get; private set; }
    public string Info => $"This is a star with id {Id}";

    public static StarController CreateStar(string id, GameObject prefab, Vector3 position, float scale, Transform parent, Vector3 relativePosition)
    {
        GameObject star = Instantiate(prefab, position, Quaternion.identity, parent);
        star.transform.localScale = Vector3.one * scale;
        StarController starController = star.GetComponent<StarController>();
        starController.Id = id;
        stars.Add(id, starController);
        return starController;
    }

    public static void LoadStars(Vector3 relativePosition)
    {
        RelativePosition = relativePosition;
    }
    
}