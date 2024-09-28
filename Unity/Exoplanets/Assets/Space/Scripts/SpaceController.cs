using UnityEngine;

public class SpaceController : MonoBehaviour
{
    public static SpaceController instance;
    [SerializeField] GameObject[] starPrefabs;
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
        constellationBuilder = new(transform.Find("ConstellationLine").GetComponent<LineRenderer>());
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

    public void AddStarToConstellation(StarController star)
    {
        constellationBuilder.AddStar(star);
    }

    public void SaveConstellation(string name)
    {
        constellationBuilder.SaveConstellation(name);
    }
    
}