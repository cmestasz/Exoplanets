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

// dont use inside other classes, for standarization purposes
[System.Serializable]
public class SpaceCoord
{
    public float ra;
    public float dec;
    public float parallax;

    public SpaceCoord()
    {
        parallax = 1;
    }

    public SpaceCoord(float ra, float dec, float parallax)
    {
        this.ra = ra;
        this.dec = dec;
        this.parallax = parallax;
    }
}