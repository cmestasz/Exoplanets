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
public class ConstellationsRequest
{
    public string reference;
}

[System.Serializable]
public class ConstellationsResponse
{
    public Constellation[] constellations;
}

[System.Serializable]
public class ExoplanetsByNameRequest
{
    public string name;
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