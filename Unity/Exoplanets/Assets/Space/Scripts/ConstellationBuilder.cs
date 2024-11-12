using System.Collections.Generic;
using UnityEngine;

public class ConstellationBuilder
{
    public Transform ConnectionsParent { get; private set; }
    public GameObject ConstellationConnectionPrefab { get; private set; }
    public List<LineRenderer> ConstellationLines { get; private set; } = new();
    public ConstellationOld CurrentConstellation { get; private set; }

    public ConstellationBuilder(GameObject constellationConnectionPrefab, Transform connectionsParent)
    {
        ConnectionsParent = connectionsParent;
        ConstellationConnectionPrefab = constellationConnectionPrefab;
    }

    public void AddConnection(StarController star1, StarController star2)
    {
        GameObject connection = Object.Instantiate(ConstellationConnectionPrefab, ConnectionsParent);
        LineRenderer lineRenderer = connection.GetComponent<LineRenderer>();
        lineRenderer.positionCount = 2;
        lineRenderer.SetPosition(0, star1.transform.position);
        lineRenderer.SetPosition(1, star2.transform.position);
        ConstellationLines.Add(lineRenderer);

        CurrentConstellation ??= ConstellationOld.CreateConstellation();
        CurrentConstellation.AddConnection(star1, star2);
    }

    public void ClearConnections()
    {
        for (int i = 0; i < ConnectionsParent.childCount; i++)
        {
            Object.Destroy(ConnectionsParent.GetChild(i).gameObject);
        }

        CurrentConstellation = null;
        ConstellationLines.Clear();
    }

    public void SaveConstellation(string id)
    {
        CurrentConstellation.Save(id);
        CurrentConstellation = null;

        foreach (var line in ConstellationLines)
        {
            line.startColor = Color.green;
            line.endColor = Color.green;
        }

        ConstellationLines.Clear();
    }
}