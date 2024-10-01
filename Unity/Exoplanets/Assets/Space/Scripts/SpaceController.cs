using UnityEngine;

public class SpaceController : MonoBehaviour
{
    [SerializeField] private GameObject[] starPrefabs;
    [SerializeField] private GameObject constellationConnectionPrefab;
    [SerializeField] private float starsPositionRange, starsScaleMin, starsScaleMax, amountOfStars;
    public static SpaceController Instance { get; private set; }
    public ConstellationBuilder ConstellationBuilder { get; private set; }
    public Transform StarsParent { get; private set; }
    public Vector3 CurrentRelativePosition { get; private set; }
    private int StarId { get; set; } = 0;

    void Awake()
    {
        Instance = this;
    }

    void Start()
    {
        InitVariables();
        BuildRandomStars();
    }

    void InitVariables()
    {
        ConstellationBuilder = new(constellationConnectionPrefab, transform.Find("ConstellationConnections"));
        StarsParent = transform.Find("Stars");
        CurrentRelativePosition = Vector3.zero;
    }

    void BuildRandomStars()
    {
        for (int i = 0; i < amountOfStars; i++)
        {
            float x = Random.Range(-starsPositionRange, starsPositionRange);
            float y = Random.Range(-starsPositionRange, starsPositionRange);
            float z = Random.Range(-starsPositionRange, starsPositionRange);

            Vector3 position = new(x, y, z);
            float scale = Random.Range(starsScaleMin, starsScaleMax);
            int prefabIdx = Random.Range(0, starPrefabs.Length);
            StarController.CreateStar(StarId.ToString(), starPrefabs[prefabIdx], position, scale, StarsParent, CurrentRelativePosition);
            StarId++;
        }
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