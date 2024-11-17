using System.Collections;
using System.Collections.Generic;
using System.IO.MemoryMappedFiles;
using UnityEngine;

// states
// 0 - unreadable
// 1 - python write
// 2 - c# write

public class Communicator
{
    private Dictionary<string, MemoryMappedViewAccessor> maps;

    public Communicator()
    {
        maps = new();
    }

    public void Link(int size, string tag)
    {
        MemoryMappedFile map = MemoryMappedFile.OpenExisting($"Exoplanets\\{tag}");
        maps.Add(tag, map.CreateViewAccessor());
    }

    public void Write(string tag, byte[] data, int pos, int length)
    {
        maps[tag].WriteArray(pos, data, 0, length);
        maps[tag].Write(0, (byte)2);
    }

    public IEnumerator Read(string tag, byte[] data, int pos, int length)
    {
        yield return new WaitUntil(() => maps[tag].ReadByte(0) == 1);
        maps[tag].ReadArray(pos, data, 0, length);
    }

    public void Close(string tag)
    {
        maps[tag].Dispose();
        maps.Remove(tag);
    }
}