using UnityEngine;

[System.Serializable]
public class SerializableStar
{
    public string Id { get; private set; }
    public Vector3 Position { get; private set; }
    public int Scale { get; private set; }

    public SerializableStar(StarController starController)
    {
        Id = starController.Id;
        Position = starController.transform.position;
        Scale = (int)starController.transform.localScale.x;
    }

}