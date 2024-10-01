using System.Collections.Generic;
using UnityEngine;

public class PlanetController : MonoBehaviour, IHasInfo
{
    public static Dictionary<string, PlanetController> planets = new();
    public string Id { get; private set; }
    public Vector3 RelativePosition { get; private set; }
    public string Info => $"This is a planet with id {Id}";

    public static PlanetController CreatePlanet(string id, GameObject prefab, Vector3 position, float scale, Transform parent, Vector3 relativePosition)
    {
        GameObject planet = Instantiate(prefab, position, Quaternion.identity, parent);
        planet.transform.localScale = Vector3.one * scale;
        PlanetController planetController = planet.GetComponent<PlanetController>();
        planetController.Id = id;
        planetController.RelativePosition = relativePosition;
        planets.Add(id, planetController);
        return planetController;
    }
}