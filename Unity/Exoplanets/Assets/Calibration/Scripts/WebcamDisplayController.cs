using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WebcamDisplayController : MonoBehaviour
{
    public static WebcamDisplayController Instance { get; private set; }
    const float CAMERA_SCALE = 0.4f;
    public WebCamTexture WebcamTexture { get; private set; }

    private void Awake()
    {
        Instance = this;
    }

    // Start is called before the first frame update
    void Start()
    {
        WebcamTexture = new();
        GetComponent<Renderer>().material.mainTexture = WebcamTexture;
        WebcamTexture.Play();

        int width = WebcamTexture.width;
        int height = WebcamTexture.height;
        float aspect = (float)width / height;
        transform.localScale = new Vector3(aspect * CAMERA_SCALE, 1.0f, 1.0f * CAMERA_SCALE);

    }

    // Update is called once per frame
    void Update()
    {

    }
}
