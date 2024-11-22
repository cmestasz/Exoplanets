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
public class AllConstellationsRequest
{
    public int user_id;
}

[System.Serializable]
public class ConstellationsResponse
{
    public Constellation[] constellations;
}

[System.Serializable]
public class ActiveConstellationsRequest
{
    public int user_id;
    public float ra;
    public float dec;
    public float dist;
}

[System.Serializable]
public class CreateConstellationRequest
{
    public int user_id;
    public Constellation constellation;
}

[System.Serializable]
public class CreateConstellationResponse
{
    public string message;
}

[System.Serializable]
public class InputResponse
{
    public string action;
}
