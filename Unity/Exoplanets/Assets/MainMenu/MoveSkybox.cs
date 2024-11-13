using UnityEngine;

public class MoveSkybox : MonoBehaviour
{
    public float speed = 0.5f;
    private Vector3 direction = Vector3.right;

    void Update()
    {
        RenderSettings.skybox.SetFloat("_Rotation", Time.time * speed);

        if (Time.time % 4 < 1)
        {
            direction = Vector3.right;
        }
        else if (Time.time % 4 < 2)
        {
            direction = Vector3.down;
        }
        else if (Time.time % 4 < 3)
        {
            direction = Vector3.left;
        }
        else
        {
            direction = Vector3.up;
        }

        RenderSettings.skybox.SetVector("_MainTex_ST", new Vector4(direction.x * Time.time * speed, direction.y * Time.time * speed, 0, 0));
    }
}
