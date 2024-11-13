using UnityEngine;

public class MoveSkybox : MonoBehaviour
{
    public float speed = 0.1f;
    
    void Update()
    {
        RenderSettings.skybox.SetFloat("_Rotation", Time.time * speed);
    }
}
