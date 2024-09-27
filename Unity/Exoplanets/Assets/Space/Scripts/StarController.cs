using UnityEngine;

public class StarController : MonoBehaviour
{
    void OnMouseDown()
    {
        Debug.Log($"Star {gameObject.name} was clicked!");
    }
}