[System.Serializable]
public class Error
{
    public string detail;
}

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
public class ConstellationStar
{
    public int id; //might not be needed
    public string name;
    public float x, y, z; // also might not be needed
    public int[] connectedStars;
}

[System.Serializable]
public class Constellation
{
    public float ra;
    public float dec;
    public float dist;
    public string name;
    public ConstellationStar[] stars;
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