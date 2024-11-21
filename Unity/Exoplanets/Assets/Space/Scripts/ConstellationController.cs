using System.Collections.Generic;
using UnityEngine;

public class ConstellationController : MonoBehaviour, IHasInfo
{
    public static Dictionary<int, ConstellationController> constellations = new();
    public SpaceCoord RelativePosition { get; private set; }
    public int Id { get; private set; }
    public string Name { get; private set; }
    public string Info => $"This is a constellation with id {Id}";

    public static ConstellationController CreateConstellation(Constellation constellation, GameObject prefab, GameObject connectionPrefab, Transform parent)
    {
        GameObject constellationObj = Instantiate(prefab, parent);
        ConstellationController controller = constellationObj.GetComponent<ConstellationController>();
        controller.Id = constellation.id;
        controller.Name = constellation.name;
        controller.RelativePosition = new(constellation.ra, constellation.dec, constellation.dist);
        constellations.Add(constellation.id, controller);
        foreach (ConstellationStar star in constellation.stars)
        {
            StarController curr = StarController.GetStar(star.ext_id);
            foreach (string connectedStarId in star.connectedStars)
            {
                StarController other = StarController.GetStar(connectedStarId);
                GameObject connection = Instantiate(connectionPrefab, constellationObj.transform);
                LineRenderer lineRenderer = connection.GetComponent<LineRenderer>();
                lineRenderer.positionCount = 2;
                lineRenderer.SetPosition(0, curr.transform.position);
                lineRenderer.SetPosition(1, other.transform.position);
            }
        }
        return controller;
    }
}