using UnityEngine;

public class SpaceController : MonoBehaviour
{
    public static SpaceController instance;
    [SerializeField] GameObject[] starPrefabs;
    [SerializeField] GameObject constellationConnectionPrefab;
    StarBuilder starBuilder;
    ConstellationBuilder constellationBuilder;
    Transform starsParent;

    void Awake()
    {
        instance = this;
    }

    void Start()
    {
        InitVariables();
        BuildRandomStars();
    }

    void InitVariables()
    {
        starBuilder = new(starPrefabs);
        constellationBuilder = new(constellationConnectionPrefab, transform.Find("ConstellationConnections"));
        starsParent = transform.Find("Stars");
    }

    void BuildRandomStars()
    {
        for (int i = 0; i < 100; i++)
        {
            Vector3 position = new(Random.Range(-100, 100), Random.Range(-100, 100), Random.Range(-100, 100));
            int scale = Random.Range(1, 5);
            starBuilder.BuildStar(position, scale, starsParent);
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
        constellationBuilder.AddConnection(star1, star2);
    }

    public void SaveConstellation(string name)
    {
        constellationBuilder.SaveConstellation(name);
    }
    
}