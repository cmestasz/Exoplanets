[System.Serializable]
public class SurroundingsRequest
{
    public float ra;
    public float dec;
    public float parallax;
}

[System.Serializable]
public class SurroundingsResponse
{
    public Star[] stars;
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