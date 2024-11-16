[System.Serializable]
public class SurroundingsPosRequest
{
    public float ra;
    public float dec;
    public float dist;
}

[System.Serializable]
public class SurroundingsIdRequest
{
    public string id;
}

[System.Serializable]
public class SurroundingsPosResponse
{
    public Star[] stars;
}

[System.Serializable]
public class SurroundingsIdResponse
{
    public Star[] stars;
    public string name;
    public float ra;
    public float dec;
    public float dist;
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