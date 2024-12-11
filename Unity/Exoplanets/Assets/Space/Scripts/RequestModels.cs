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
public class Cursor
{
    public float x;
    public float y;

    public bool IsValid()
    {
        return x != 0 || y != 0;
    }
}

[System.Serializable]
public class Rotation
{
    public float dx;
    public float dy;
    public bool IsValid()
    {
        return dx != 0 || dy != 0;
    }
}

[System.Serializable]
public class InputResponse
{
    public Cursor cursor;
    public string right_gesture;
    public Rotation rotation;
    public float zoom;
}
