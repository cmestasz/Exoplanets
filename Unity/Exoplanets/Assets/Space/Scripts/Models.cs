[System.Serializable]
public class SurroundingsRequest
{
    public string exoplanet_id;
}
[System.Serializable]
public class Star
{
    public int x;
    public int y;
    public int z;
    public int scale;
    public string name;
}
[System.Serializable]
public class SurroundingsResponse
{
    public Star[] stars;
}

[System.Serializable]
public class InputResponse
{
    public string action;
}