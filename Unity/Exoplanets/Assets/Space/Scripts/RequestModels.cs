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
public class SurroundingsPosResponse : Errorable
{
    public Star[] stars;
}

[System.Serializable]
public class SurroundingsIdResponse : Errorable
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
public class ConstellationsResponse : Errorable
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
    public string name;
    public ConstellationStar[] stars;
}

[System.Serializable]
public class CreateConstellationResponse : Errorable
{
}

[System.Serializable]
public class InputResponse : Errorable
{
    public string action;
}
