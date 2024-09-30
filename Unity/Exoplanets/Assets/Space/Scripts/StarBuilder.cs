using UnityEngine;

public class StarBuilder
{
    readonly GameObject[] starPrefabs;

    public StarBuilder(GameObject[] starPrefabs)
    {
        this.starPrefabs = starPrefabs;
    }

    public void BuildStar(Vector3 position, int scale, Transform parent)
    {
        int idx = Random.Range(0, starPrefabs.Length);
        GameObject star = Object.Instantiate(starPrefabs[idx], position, Quaternion.identity, parent);
        star.transform.localScale = Vector3.one * scale;
    }
}