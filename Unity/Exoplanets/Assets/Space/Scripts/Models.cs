[System.Serializable]
public class Star
{
    public float x;
    public float y;
    public float z;
    public string name;
}

[System.Serializable]
public class Exoplanet
{
    public float ra;
    public float dec;
    public float dist;
    public string name;
    // some other data
}

[System.Serializable]
public class StarPair
{
    public Star star1;
    public Star star2;
}

[System.Serializable]
public class Constellation
{
    public string reference;
    public string name;
    public StarPair[] connections;
}

// dont use inside other classes, for standarization purposes
[System.Serializable]
public class SpaceCoord
{
    public float ra;
    public float dec;
    public float dist;

    public SpaceCoord()
    {
        dist = 1;
    }

    public SpaceCoord(float ra, float dec, float dist)
    {
        this.ra = ra;
        this.dec = dec;
        this.dist = dist;
    }

    public override string ToString()
    {
        return $"ra: {ra}, dec: {dec}, dist: {dist}";
    }
}