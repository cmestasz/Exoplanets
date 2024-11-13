using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

public class SpaceController : MonoBehaviour
{
    [SerializeField] private GameObject[] starPrefabs;
    [SerializeField] private GameObject constellationConnectionPrefab;
    [SerializeField] private float starsPositionRange, starsScaleMin, starsScaleMax, amountOfStars;
    [SerializeField] private GameObject postProcessing;
    public static SpaceController Instance { get; private set; }
    public ConstellationBuilder ConstellationBuilder { get; private set; }
    public Transform StarsParent { get; private set; }
    public Transform PlanetsParent { get; private set; }
    public string CurrentReference { get; private set; }
    private int StarId { get; set; } = 0;
    private ColorAdjustments ColorAdjustments { get; set; }

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
        ColorAdjustments = postProcessing.GetComponent<Volume>().profile.components[1] as ColorAdjustments;
    }


    private void TestOnStart()
    {
        LoadStarsAsync(0, 0, 2, response => BuildStars(response.stars));
    }

    private void BuildStars(Star[] stars)
    {
        foreach (Star star in stars)
        {
            int prefabIdx = Random.Range(0, starPrefabs.Length);
            Vector3 pos = new(star.x * 15, star.y * 15, star.z * 15);
            StarController.CreateStar(StarId++.ToString(), starPrefabs[prefabIdx], pos, StarsParent);
        }
    }

    private void BuildConstellations(Constellation[] constellations)
    {
        Debug.Log("Building constellations");
        foreach (Constellation constellation in constellations)
        {
            // ConstellationBuilder.BuildConstellation(constellation);
        }
    }

    private void LoadStarsAsync(float ra, float dec, float dist, System.Action<SurroundingsResponse> callback)
    {
        SurroundingsRequest request = new()
        {
            ra = ra,
            dec = dec,
            dist = dist
        };
        StartCoroutine(APIConnector.Post<SurroundingsRequest, SurroundingsResponse>("load_surroundings", request, callback));
    }

    public void WarpTo(SpaceCoord pos)
    {
        StartCoroutine(WarpToAnim(pos));
    }

    private IEnumerator WarpToAnim(SpaceCoord pos)
    {
        float exposure = 0;
        while (exposure < 20)
        {
            exposure += 0.25f;
            ColorAdjustments.postExposure.value = exposure;
            yield return null;
        }
        ClearStars();
        Star[] stars = null;
        LoadStarsAsync(pos.ra, pos.dec, pos.dist, response => stars = response.stars);
        Constellation[] constellations = null;
        LoadConstellationsAsync(response => constellations = response.constellations);
        yield return new WaitUntil(() => stars != null && constellations != null);

        BuildStars(stars);
        BuildConstellations(constellations);

        while (exposure > 0)
        {
            exposure -= 0.25f;
            ColorAdjustments.postExposure.value = exposure;
            yield return null;
        }
    }

    private void ClearStars()
    {
        foreach (Transform child in StarsParent)
        {
            Destroy(child.gameObject);
        }
    }

    public void LoadConstellationsAsync(System.Action<ConstellationsResponse> callback)
    {
        Debug.Log($"We should now be loading constellations for the exoplanet reference {CurrentReference}");
        ConstellationsResponse response = new()
        {
            constellations = new Constellation[1]
        };
        callback(response);
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