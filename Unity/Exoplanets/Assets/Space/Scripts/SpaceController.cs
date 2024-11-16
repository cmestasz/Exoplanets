using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;
using static Animations;

public class SpaceController : MonoBehaviour
{
    [SerializeField] private GameObject[] starPrefabs;
    [SerializeField] private GameObject constellationConnectionPrefab;
    [SerializeField] private GameObject postProcessing;
    public static SpaceController Instance { get; private set; }
    public ConstellationBuilder ConstellationBuilder { get; private set; }
    public Transform StarsParent { get; private set; }
    public Transform PlanetsParent { get; private set; }
    public SpaceCoord CurrentReference { get; private set; }
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
        // LoadStarsAsync(0, 0, 2, response => BuildStars(response.stars));
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

    private string LoadStarsPosAsync(float ra, float dec, float dist, System.Action<SurroundingsPosResponse> callback)
    {
        SurroundingsPosRequest request = new()
        {
            ra = ra,
            dec = dec,
            dist = dist
        };
        string status = null;
        StartCoroutine(APIConnector.Post("load_surroundings", request, callback, error => status = error));
        return status;
    }

    private string LoadStarsIdAsync(string id, System.Action<SurroundingsIdResponse> callback)
    {
        SurroundingsIdRequest request = new()
        {
            id = id
        };
        string status = null;
        StartCoroutine(APIConnector.Post("load_surroundings", request, callback, error => status = error));
        return status;
    }

    public void WarpToPos(SpaceCoord pos)
    {
        StartCoroutine(WarpToAnim(pos, null));
    }

    public void WarpToId(string id)
    {
        StartCoroutine(WarpToAnim(null, id));
    }

    private IEnumerator WarpToAnim(SpaceCoord pos, string id)
    {
        yield return WarpFadeIn(ColorAdjustments);

        Star[] stars = null;
        Constellation[] constellations = null;
        string name = null;
        float ra = 0, dec = 0, dist = 0;

        string error = null;
        if (pos != null)
        {
            error = LoadStarsPosAsync(pos.ra, pos.dec, pos.dist, response =>
            {
                stars = response.stars;
            });
            ra = pos.ra;
            dec = pos.dec;
            dist = pos.dist;
        }
        else if (id != null)
        {
            error = LoadStarsIdAsync(id, response =>
            {
                stars = response.stars;
                name = response.name;
                ra = response.ra;
                dec = response.dec;
                dist = response.dist;
            });
        }

        yield return new WaitUntil(() => stars != null || error != null);
        if (error != null)
        {
            if (error == "invalid")
                DialogueController.Instance.ShowDialogue("warp_invalid");
            else
                DialogueController.Instance.ShowDialogue("warp_fail");

            yield return WarpFadeOut(ColorAdjustments);
            yield break;
        }

        CurrentReference = new SpaceCoord(ra, dec, dist);
        error = null;
        error = LoadConstellationsAsync(response => constellations = response.constellations);
        yield return new WaitUntil(() => constellations != null || error != null);
        if (error != null)
        {
            DialogueController.Instance.ShowDialogue("warp_fail");
            yield return WarpFadeOut(ColorAdjustments);
            yield break;
        }

        ClearStars();
        BuildStars(stars);
        BuildConstellations(constellations);

        yield return WarpFadeOut(ColorAdjustments);
        DialogueController.Instance.ShowDialogue("warp");
        if (pos != null)
            DialogueController.Instance.ShowDialogue("warp_posonly");
        else if (name == null)
            DialogueController.Instance.ShowDialogue("warp_noname");
    }


    private void ClearStars()
    {
        foreach (Transform child in StarsParent)
        {
            Destroy(child.gameObject);
        }
    }

    public string LoadConstellationsAsync(System.Action<ConstellationsResponse> callback)
    {
        Debug.Log($"We should now be loading constellations for {CurrentReference}");
        ConstellationsResponse response = new()
        {
            constellations = new Constellation[1]
        };
        callback(response);
        return null;
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