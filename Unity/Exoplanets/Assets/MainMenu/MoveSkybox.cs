using System;
using UnityEngine;

public class MoveSkybox : MonoBehaviour
{
    public float speed = -0.5f;

    void Update()
    {
        float currentRotation = RenderSettings.skybox.GetFloat("_Rotation");

        currentRotation += Time.deltaTime * speed;
        RenderSettings.skybox.SetFloat("_Rotation", currentRotation);

        if (currentRotation >= 360f)
        {
            RenderSettings.skybox.SetFloat("_Rotation", 0f);
            speed = -Mathf.Abs(speed);
        }
        else if (currentRotation <= -360f)
        {
            RenderSettings.skybox.SetFloat("_Rotation", 0f);
            speed = Mathf.Abs(speed);
        }
    }

}
