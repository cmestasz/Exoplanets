using System;
using UnityEngine;

public class MoveSkybox : MonoBehaviour
{
    public float speed = -0.5f;

    public Light directionalLight;

    public float tiltAngle = 135f;

    public float offSet = 40;

    void Update()
    {
        float currentRotation = RenderSettings.skybox.GetFloat("_Rotation");

        currentRotation += Time.deltaTime * speed;
        RenderSettings.skybox.SetFloat("_Rotation", currentRotation);

        if (directionalLight != null)
        {
            directionalLight.transform.rotation = Quaternion.Euler(tiltAngle, -currentRotation + offSet, 0);
        }

        if (currentRotation >= 360f || currentRotation <= -360f)
        {
            RenderSettings.skybox.SetFloat("_Rotation", 0f);
            speed = -Mathf.Abs(speed);  
        }

    }

}
