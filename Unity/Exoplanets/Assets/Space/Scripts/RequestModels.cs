[System.Serializable]
public class SurroundingsRequest
{
    public float ra;
    public float dec;
    public float dist;
}

[System.Serializable]
public class SurroundingsResponse
{
    public Star[] stars;
}

[System.Serializable]
public class ExoplanetsRequest
{
    public string name; // or id?
}

[System.Serializable]
public class ExoplanetsResponse
{
    public Exoplanet[] exoplanets;
}

[System.Serializable]
public class InputResponse
{
    public string action;
}