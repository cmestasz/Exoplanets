using UnityEngine;

public class SpaceController : MonoBehaviour
{
    public static SpaceController Instance { get; private set; }
    [SerializeField] private GameObject[] starPrefabs;
    [SerializeField] private GameObject constellationConnectionPrefab;
    public ConstellationBuilder ConstellationBuilder { get; private set; }
    public Transform starsParent { get; private set; }

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
        starsParent = transform.Find("Stars");
    }

    void BuildRandomStars()
    {
        for (int i = 0; i < 100; i++)
        {
            Vector3 position = new(Random.Range(-100, 100), Random.Range(-100, 100), Random.Range(-100, 100));
            int scale = Random.Range(1, 5);
            int prefabIdx = Random.Range(0, starPrefabs.Length);
            StarController.CreateStar(i.ToString(), starPrefabs[prefabIdx], position, scale, starsParent);
        }
    }

    public void RegenerateStars()
    {
        foreach (Transform child in starsParent)
        {
            Destroy(child.gameObject);
        }
        BuildRandomStars();
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