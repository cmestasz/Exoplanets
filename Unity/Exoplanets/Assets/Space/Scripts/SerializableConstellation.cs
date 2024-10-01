
using UnityEngine;

[System.Serializable]
public class SerializableConstellation
{
    public string Id { get; private set; }
    public SerializableStar[] ConnectionsL { get; private set; }
    public SerializableStar[] ConnectionsR { get; private set; }

    public SerializableConstellation(Constellation constellation)
    {
        Id = constellation.Id;
        ConnectionsL = new SerializableStar[constellation.Connections.Count];
        ConnectionsR = new SerializableStar[constellation.Connections.Count];
        int i = 0;
        foreach (var connection in constellation.Connections)
        {
            ConnectionsL[i] = new SerializableStar(connection.Item1);
            ConnectionsR[i] = new SerializableStar(connection.Item2);
            i++;
        }
    }

    public void PermanentSave()
    {
        string debug = "";
        foreach (var connection in ConnectionsL)
        {
            debug += connection.Id + " ";
        }
        Debug.Log("Saved constellation with id: " + Id + " and connections: " + debug);
    }
}