using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ConstellationController : MonoBehaviour, IHasInfo
{
    public static Dictionary<int, ConstellationController> constellations = new();
    public static ConstellationController Current { get; private set; }
    public Transform Parent { get; private set; }
    public Constellation Constellation { get; private set; }
    private Dictionary<string, List<string>> Stars { get; set; }
    public string Info => $"This is a constellation with id {Constellation.id}";

    public static ConstellationController InitConstellation(GameObject prefab, Transform parent, SpaceCoord relative)
    {
        GameObject constellationObj = Instantiate(prefab, parent);
        Current = constellationObj.GetComponent<ConstellationController>();
        Current.Constellation = new() { id = 0, ra = relative.ra, dec = relative.dec, dist = relative.dist };
        Current.Stars = new();
        return Current;
    }

    public static void AddConnection(StarController star1, StarController star2, GameObject connectionPrefab)
    {
        if (Current == null)
        {
            Debug.Log("dumbass");
            return;
        }

        GameObject connection = Instantiate(connectionPrefab, Current.Parent);
        LineRenderer lineRenderer = connection.GetComponent<LineRenderer>();
        lineRenderer.positionCount = 2;
        lineRenderer.SetPosition(0, star1.transform.position);
        lineRenderer.SetPosition(1, star2.transform.position);

        if (!Current.Stars.ContainsKey(star1.Id))
            Current.Stars.Add(star1.Id, new() { star2.Id });
        else 
            Current.Stars[star1.Id].Add(star2.Id);
    }

    public static void SaveConstellation(string name)
    {
        Current.Constellation.name = name;
        Current.Constellation.stars = new ConstellationStar[Current.Stars.Count];
        int i = 0;
        foreach (string key in Current.Stars.Keys)
        {
            Current.Constellation.stars[i] = new() { ext_id = key, connected_stars = new string[Current.Stars[key].Count] }; 
            int j = 0;
            foreach(string star in Current.Stars[key])
            {
                Current.Constellation.stars[i].connected_stars[j] = star;
                j++;
            }
            i++;
        }

        Current.StartCoroutine(SaveConstellationCoroutine());
    }

    public static IEnumerator SaveConstellationCoroutine()
    {
        Debug.Log("trying to save");
        Debug.Log(JsonUtility.ToJson(Current.Constellation));
        CreateConstellationRequest request = new() { user_id = 1, constellation = Current.Constellation };
        yield return null;
        /*yield return APIConnector.Post<CreateConstellationRequest, CreateConstellationResponse>("create_constellation", request,
        response => {
            Debug.Log("yay");
        });*/
    }


    public static ConstellationController BuildConstellation(Constellation constellation, GameObject prefab, GameObject connectionPrefab, Transform parent)
    {
        GameObject constellationObj = Instantiate(prefab, parent);
        ConstellationController controller = constellationObj.GetComponent<ConstellationController>();
        controller.Parent = constellationObj.transform;
        constellations.Add(constellation.id, controller);
        foreach (ConstellationStar star in constellation.stars)
        {
            StarController curr = StarController.GetStar(star.ext_id);
            foreach (string connectedStarId in star.connected_stars)
            {
                StarController other = StarController.GetStar(connectedStarId);
                GameObject connection = Instantiate(connectionPrefab, controller.Parent);
                LineRenderer lineRenderer = connection.GetComponent<LineRenderer>();
                lineRenderer.positionCount = 2;
                lineRenderer.SetPosition(0, curr.transform.position);
                lineRenderer.SetPosition(1, other.transform.position);
            }
        }
        return controller;
    }
}