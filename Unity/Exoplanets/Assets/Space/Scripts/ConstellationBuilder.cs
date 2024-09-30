using System.Collections.Generic;
using UnityEngine;

public class ConstellationBuilder
{
    Transform connectionsParent;
    GameObject constellationConnectionPrefab;
    List<LineRenderer> constellationLines = new();

    public ConstellationBuilder(GameObject constellationConnectionPrefab, Transform connectionsParent)
    {
        this.connectionsParent = connectionsParent;
        this.constellationConnectionPrefab = constellationConnectionPrefab;
    }

    public void AddConnection(StarController star1, StarController star2)
    {
        GameObject connection = Object.Instantiate(constellationConnectionPrefab, connectionsParent);
        LineRenderer lineRenderer = connection.GetComponent<LineRenderer>();
        lineRenderer.positionCount = 2;
        lineRenderer.SetPosition(0, star1.transform.position);
        lineRenderer.SetPosition(1, star2.transform.position);
        constellationLines.Add(lineRenderer);
    }

    public void SaveConstellation(string name)
    {
        foreach (LineRenderer line in constellationLines)
        {
            Debug.Log($"Saving {line.gameObject.name} with {line.GetPosition(0)} and {line.GetPosition(1)}");
            Object.Destroy(line.gameObject);
        }
        constellationLines.Clear();
    }
}