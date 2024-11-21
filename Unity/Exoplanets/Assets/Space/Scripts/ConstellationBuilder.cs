using System.Collections.Generic;
using UnityEngine;

public class ConstellationBuilder
{
    public GameObject ConstellationPrefab { get; private set; }
    public GameObject ConnectionPrefab { get; private set; }
    public List<LineRenderer> ConstellationLines { get; private set; } = new();
    public ConstellationController CurrentConstellation { get; private set; }

    public ConstellationBuilder(GameObject connectionPrefab)
    {
        ConnectionPrefab = connectionPrefab;
    }

    public void AddConnection(StarController star1, StarController star2, Transform parent)
    {
        GameObject connection = Object.Instantiate(ConnectionPrefab);
        LineRenderer lineRenderer = connection.GetComponent<LineRenderer>();
        lineRenderer.positionCount = 2;
        lineRenderer.SetPosition(0, star1.transform.position);
        lineRenderer.SetPosition(1, star2.transform.position);
        ConstellationLines.Add(lineRenderer);

        CurrentConstellation ??= ConstellationController.InitConstellation(ConstellationPrefab, parent);
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