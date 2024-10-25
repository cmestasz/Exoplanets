using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WebcamDisplayController : MonoBehaviour
{
    const float CAMERA_SCALE = 0.4f;
    private WebCamTexture webcamTexture;

    // Start is called before the first frame update
    void Start()
    {
        webcamTexture = new WebCamTexture();
        GetComponent<Renderer>().material.mainTexture = webcamTexture;
        webcamTexture.Play();
        int width = webcamTexture.width;
        int height = webcamTexture.height;
        float aspect = (float)width / height;
        transform.localScale = new Vector3(aspect * CAMERA_SCALE, 1.0f, 1.0f * CAMERA_SCALE);

    }

    // Update is called once per frame
    void Update()
    {

    }
}
