using System;
using System.Collections.Generic;

public class Constellation
{
    public string Id { get; private set; }
    public bool IsSaved { get; private set; }
    public HashSet<Tuple<StarController, StarController>> Connections { get; private set; } = new(); 
    public static Dictionary<string, Constellation> Constellations { get; private set; } = new();

    public static Constellation CreateConstellation()
    {
        Constellation constellation = new();
        return constellation;
    }

    public static void PermanentSaveAll()
    {
        foreach (var constellation in Constellations)
        {
            if (constellation.Value.IsSaved)
            {

            }
        }
    }

    public void AddConnection(StarController star1, StarController star2)
    {
        Connections.Add(new Tuple<StarController, StarController>(star1, star2));
    }

    public void Save(string id)
    {
        if (IsSaved)
        {
            return;
        }
        Constellations.Add(id, this);
        IsSaved = true;
        Id = id;

        SerializableConstellation serializableConstellation = new(this);
        serializableConstellation.PermanentSave();
    }

}