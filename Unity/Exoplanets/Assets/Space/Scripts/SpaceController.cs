using UnityEngine;

public class SpaceController : MonoBehaviour
{
    public static SpaceController instance;
    [SerializeField] GameObject[] starPrefabs;
    StarBuilder starBuilder;
    Transform starsParent;

    void Awake()
    {
        if (instance == null)
        {
            instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }

    void Start()
    {
        InitVariables();
        BuildRandomStars();
    }

    void InitVariables()
    {
        starBuilder = new StarBuilder(starPrefabs);
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
    
}