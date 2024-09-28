using System.Collections.Generic;
using UnityEngine;

public class ConstellationBuilder
{
    public LineRenderer constellationLine;
    readonly List<StarController> activeConstellation = new();

    public ConstellationBuilder(LineRenderer lineRenderer)
    {
        constellationLine = lineRenderer;
    }

    public void AddStar(StarController star)
    {
        activeConstellation.Add(star);
        DrawConstellation();
    }

    public void SaveConstellation(string name)
    {
        activeConstellation.Clear();
        DrawConstellation();
    }

    void DrawConstellation()
    {
        if (activeConstellation.Count == 0)
        {
            constellationLine.positionCount = 0;
            return;
        }

        constellationLine.positionCount = activeConstellation.Count + 1;
        for (int i = 0; i < activeConstellation.Count; i++)
        {
            constellationLine.SetPosition(i, activeConstellation[i].transform.position);
        }
        constellationLine.SetPosition(activeConstellation.Count, activeConstellation[0].transform.position);
    }

}