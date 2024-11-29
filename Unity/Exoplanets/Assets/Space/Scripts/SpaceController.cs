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
    [SerializeField] private Material[] planetMaterials;
    [SerializeField] private GameObject connectionPrefab;
    [SerializeField] private GameObject constellationPrefab;
    [SerializeField] private GameObject postProcessing;
    public static SpaceController Instance { get; private set; }
    public GameObject CurrentPlanet { get; private set; }
    public Transform ConstellationParent { get; private set; }
    public Transform StarsParent { get; private set; }
    public SpaceCoord CurrentReference { get; private set; }
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
        StarsParent = transform.Find("Stars");
        ConstellationParent = transform.Find("Constellations");
        ColorAdjustments = postProcessing.GetComponent<Volume>().profile.components[1] as ColorAdjustments;
        CurrentPlanet = transform.Find("Planet").gameObject;
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
            StarController.CreateStar(star.id, starPrefabs[prefabIdx], pos, StarsParent);
        }
    }

    private void BuildConstellations(Constellation[] constellations)
    {
        foreach (Constellation constellation in constellations)
        {
            ConstellationController.BuildConstellation(constellation, constellationPrefab, connectionPrefab, ConstellationParent);
        }
    }

    private void BuildExoplanet(bool active)
    {
        CurrentPlanet.SetActive(active);
        if (active)
        {
            CurrentPlanet.GetComponent<MeshRenderer>().material = planetMaterials[Random.Range(0, planetMaterials.Length)];
        }
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
            SurroundingsPosRequest request = new()
            {
                ra = ra,
                dec = dec,
                dist = dist,
            };
            yield return APIConnector.Post<SurroundingsPosRequest, SurroundingsPosResponse>("load_surroundings", request,
            response =>
            {
                stars = response.stars;
            }, err =>
            {
                error = err;
            }
            );
            ra = pos.ra;
            dec = pos.dec;
            dist = pos.dist;
        }
        else if (id != null)
        {
            SurroundingsIdRequest request = new()
            {
                id = id,
            };
            yield return APIConnector.Post<SurroundingsIdRequest, SurroundingsIdResponse>("load_surroundings_by_id", request,
            response =>
            {
                stars = response.stars;
                name = response.name;
                ra = response.ra;
                dec = response.dec;
                dist = response.dist;
            }, err =>
            {
                error = err;
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

        /*
        CurrentReference = new SpaceCoord(ra, dec, dist);
        ActiveConstellationsRequest request1 = new()
        {
            user_id = 1,
            ra = ra,
            dec = dec,
            dist = dist
        };
        yield return APIConnector.Post<ActiveConstellationsRequest, ConstellationsResponse>("list_active_constellations", request1,
        response =>
        {
            constellations = response.constellations;
        }, err =>
        {
            error = err;
        });

        if (error != null)
        {
            DialogueController.Instance.ShowDialogue("warp_fail");
            yield return WarpFadeOut(ColorAdjustments);
            yield break;
        }
        */

        ClearStars();
        BuildStars(stars);
        // BuildConstellations(constellations);
        BuildExoplanet(id != null);
        PlayerController.Instance.transform.position = new(0, 0, -40);
        PlayerController.Instance.transform.rotation = Quaternion.identity;

        yield return WarpFadeOut(ColorAdjustments);
        DialogueController.Instance.ShowDialogue("warp");
        UIInteractor.Instance.ShowTitle(name);
        if (pos != null)
            DialogueController.Instance.ShowDialogue("warp_posonly");
    }


    private void ClearStars()
    {
        foreach (Transform child in StarsParent)
        {
            Destroy(child.gameObject);
        }
    }

    public void AddConstellationConnection(StarController star1, StarController star2)
    {
        if (ConstellationController.Current == null)
            ConstellationController.InitConstellation(constellationPrefab, ConstellationParent, CurrentReference);

        ConstellationController.AddConnection(star1, star2, connectionPrefab);
    }

    public void SaveConstellation(string name)
    {
        ConstellationController.SaveConstellation(name);
    }

}