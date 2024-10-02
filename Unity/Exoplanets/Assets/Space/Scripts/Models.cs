[System.Serializable]
public class TestRequest
{
    public string sector_id;
}
[System.Serializable]
public class SpaceThing
{
    public int x;
    public int y;
    public int z;
    public string type;
    public string name;
    public override string ToString()
    {
        return $"{name} of type {type} is at {x}, {y}, {z}";
    }
}
[System.Serializable]
public class TestResponse
{
    public SpaceThing[] space_things;
    override public string ToString()
    {
        return $"Response with {space_things.Length} space things";
    }
}