using System.Collections.Generic;
using UnityEngine;

public class SpaceController : MonoBehaviour
{
    [SerializeField] private GameObject[] starPrefabs;
    [SerializeField] private GameObject constellationConnectionPrefab;
    [SerializeField] private float starsPositionRange, starsScaleMin, starsScaleMax, amountOfStars;
    public static SpaceController Instance { get; private set; }
    public ConstellationBuilder ConstellationBuilder { get; private set; }
    public Transform StarsParent { get; private set; }
    public Transform PlanetsParent { get; private set; }
    public SpaceCoord CurrentRelativePosition { get; private set; }
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
        CurrentRelativePosition = new();
    }


    private void TestOnStart()
    {
        LoadStars(0, 0, 2);
    }

    private void LoadStars(float ra, float dec, float parallax)
    {
        SurroundingsRequest request = new()
        {
            ra = ra,
            dec = dec,
            parallax = parallax
        };
        StartCoroutine(
            APIConnector.Post<SurroundingsRequest, SurroundingsResponse>("load_surroundings", request, response =>
            {
                foreach (Star star in response.stars)
                {
                    int prefabIdx = Random.Range(0, starPrefabs.Length);
                    Vector3 pos = new(star.x * 15, star.y * 15, star.z * 15);
                    StarController.CreateStar(StarId++.ToString(), starPrefabs[prefabIdx], pos, StarsParent);
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
            int prefabIdx = Random.Range(0, starPrefabs.Length);
            StarController.CreateStar(StarId++.ToString(), starPrefabs[prefabIdx], position, StarsParent);
        }
    }

    public void WarpTo(SpaceCoord pos)
    {
        CurrentRelativePosition = pos;
        ClearStars();
        LoadStars(pos.ra, pos.dec, pos.parallax);
        LoadConstellations();
    }

    private void ClearStars()
    {
        foreach (Transform child in StarsParent)
        {
            Destroy(child.gameObject);
        }
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