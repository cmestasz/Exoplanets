using System.Collections.Generic;
using UnityEngine;

public class SpaceController : MonoBehaviour
{
    [SerializeField] private GameObject[] starPrefabs;
    [SerializeField] private GameObject earthPrefab;
    [SerializeField] private GameObject constellationConnectionPrefab;
    [SerializeField] private float starsPositionRange, starsScaleMin, starsScaleMax, amountOfStars;
    public static SpaceController Instance { get; private set; }
    public ConstellationBuilder ConstellationBuilder { get; private set; }
    public Transform StarsParent { get; private set; }
    public Transform PlanetsParent { get; private set; }
    public Vector3 CurrentRelativePosition { get; private set; }
    private int StarId { get; set; } = 0;

    private void Awake()
    {
        Instance = this;
    }

    private void Start()
    {
        InitVariables();
        TestOnStart();
    }

    private void InitVariables()
    {
        ConstellationBuilder = new(constellationConnectionPrefab, transform.Find("ConstellationConnections"));
        StarsParent = transform.Find("Stars");
        PlanetsParent = transform.Find("Planets");
        CurrentRelativePosition = Vector3.zero;
    }


    private void TestOnStart()
    {
        StartCoroutine(
            APIConnector.Post<SurroundingsRequest, SurroundingsResponse>("load_surroundings", new SurroundingsRequest { exoplanet_id = "00" }, response =>
            {
                foreach (Star thing in response.stars)
                {
                    int prefabIdx = Random.Range(0, starPrefabs.Length);
                    StarController.CreateStar(StarId++.ToString(), starPrefabs[prefabIdx], new Vector3(thing.x, thing.y, thing.z), thing.scale, StarsParent, CurrentRelativePosition);
                }
            })
        );
    }


    private void BuildRandomStars()
    {
        for (int i = 0; i < amountOfStars; i++)
        {
            float x = Random.Range(-starsPositionRange, starsPositionRange);
            float y = Random.Range(-starsPositionRange, starsPositionRange);
            float z = Random.Range(-starsPositionRange, starsPositionRange);

            Vector3 position = new(x, y, z);
            float scale = Random.Range(starsScaleMin, starsScaleMax);
            int prefabIdx = Random.Range(0, starPrefabs.Length);
            StarController.CreateStar(StarId++.ToString(), starPrefabs[prefabIdx], position, scale, StarsParent, CurrentRelativePosition);
        }
    }

    private void SpawnEarth()
    {
        PlanetController.CreatePlanet("Earth", earthPrefab, Vector3.zero, 100, PlanetsParent, CurrentRelativePosition);
    }

    public void WarpTo(Vector3 pos)
    {
        CurrentRelativePosition = pos;
        LoadStars();
        LoadConstellations();
    }

    public void RegenerateStars()
    {
        //TODO: you actually need a proper method for loading the stars and binding them correctly

        foreach (Transform child in StarsParent)
        {
            Destroy(child.gameObject);
        }
        ConstellationBuilder.ClearConnections();
        BuildRandomStars();
    }

    public void LoadStars()
    {
        Debug.Log($"We should now be loading stars for the position {CurrentRelativePosition}");
        RegenerateStars(); // to be changed for a db request
    }

    public void LoadConstellations()
    {
        Debug.Log($"We should now be loading constellations for the position {CurrentRelativePosition}");
        // db request
    }

    public void AddConstellationConnection(StarController star1, StarController star2)
    {
        ConstellationBuilder.AddConnection(star1, star2);
    }

    public void SaveConstellation(string name)
    {
        ConstellationBuilder.SaveConstellation(name);
    }

}