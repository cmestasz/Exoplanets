using System;
using UnityEngine;
using static Constants;

public class Utils
{
    public static void ForEveryRenderableSector(Vector3Int currentSector, Action<Vector3Int> action)
    {
        for (int x = -RENDER_DISTANCE; x < RENDER_DISTANCE; x++)
        {
            for (int y = -RENDER_DISTANCE; y < RENDER_DISTANCE; y++)
            {
                for (int z = -RENDER_DISTANCE; z < RENDER_DISTANCE; z++)
                {
                    Vector3Int sector = new(currentSector.x + x, currentSector.y + y, currentSector.z + z);
                    action(sector);
                }
            }
        }
    }
}