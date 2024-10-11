[System.Serializable]
public class SurroundingsRequest
{
    public int exoplanet_x;
    public int exoplanet_y;
    public int exoplanet_z;
}
[System.Serializable]
public class SpaceThing
{
    public int x;
    public int y;
    public int z;
    public int scale;
    public string type;
    public string name;
    public override string ToString()
    {
        return $"{name} of type {type} is at {x}, {y}, {z}";
    }
}
[System.Serializable]
public class SurroundingsResponse
{
    public SpaceThing[] space_things;
    override public string ToString()
    {
        return $"Response with {space_things.Length} space things";
    }
}