using System;
using ReactUnity.UGUI;
using UnityEngine;

public class AdjustCamera : MonoBehaviour
{

    private int NO_POST_LAYER;

    private int DEFAULT_LAYER;

    private bool cameraToCanvas;

    public Canvas canvas;

    private Camera mainCamera;

    public Camera auxiliarCamera1;

    public Camera auxiliarCamera2;

    private UGUIComponent comp1;

    private UGUIComponent comp2;

    private Vector2 lastAuxiliarSize1;

    private Vector2 lastAuxiliarSize2;

    public void AdjustToCanvas()
    {
        if (!cameraToCanvas && mainCamera != null && canvas != null)
        {
            cameraToCanvas = true;
            mainCamera.cullingMask = -1;
            auxiliarCamera1.transform.SetParent(null);
            auxiliarCamera1.enabled = false;
            auxiliarCamera2.transform.SetParent(null);
            auxiliarCamera2.enabled = false;
        }

    }

    public void AdjustFirstAuxiliar(UGUIComponent comp, bool orthographic = true)
    {
        if (auxiliarCamera1 != null)
        {
            PrepareMainForAuxiliars();
            auxiliarCamera1.enabled = true;
            comp1 = comp;
            AdjustTo(comp, auxiliarCamera1, orthographic);
            lastAuxiliarSize1 = comp.RectTransform.rect.size;
        }
    }

    public void AdjustSecondAuxiliar(UGUIComponent comp, bool orthographic = true)
    {
        if (auxiliarCamera2 != null)
        {
            PrepareMainForAuxiliars();
            auxiliarCamera2.enabled = true;
            comp2 = comp;
            AdjustTo(comp, auxiliarCamera2, orthographic);
            lastAuxiliarSize2 = comp.RectTransform.rect.size;
        }
    }

    private void AdjustTo(UGUIComponent component, Camera camera, bool orthographic)
    {
        camera.orthographic = orthographic;
        RectTransform compRect = component.GetComponent<RectTransform>();
        camera.transform.SetParent(compRect.transform, false);
        camera.aspect = compRect.rect.width / compRect.rect.height;
        camera.transform.localPosition = new Vector3(0, 0, -1200);
        camera.transform.localRotation = Quaternion.identity;
        if (orthographic)
        {
            camera.orthographicSize = (compRect.rect.height * compRect.lossyScale.y) / 2f;
        }
        else
        {
            float distance = Mathf.Abs(camera.transform.position.z - compRect.position.z);
            camera.fieldOfView = 2f * Mathf.Atan((compRect.rect.height * compRect.lossyScale.y) / (2f * distance)) * Mathf.Rad2Deg;
        }
    }

    void PrepareMainForAuxiliars()
    {
        if (cameraToCanvas)
        {
            mainCamera.cullingMask &= ~(1 << NO_POST_LAYER);
            mainCamera.cullingMask &= ~(1 << DEFAULT_LAYER);
            cameraToCanvas = false;
        }
    }

    private void ValidateLayers()
    {
        if (NO_POST_LAYER == -1 || DEFAULT_LAYER == -1)
        {
            Debug.LogError("Las capas 'No Post' o 'Default' no están configuradas en el proyecto.");
        }
    }

    void Awake()
    {
        NO_POST_LAYER = LayerMask.NameToLayer("No Post");
        DEFAULT_LAYER = LayerMask.NameToLayer("Default");
    }

    void Start()
    {
        mainCamera = Camera.main;

        if (mainCamera == null)
        {
            Debug.LogError("No se encontró la cámara principal.");
            return;
        }

        if (canvas == null)
        {
            Debug.LogError("El Canvas no está asignado.");
            return;
        }

        ValidateLayers();
        AdjustToCanvas();

    }

    void Update()
    {
        if (!cameraToCanvas)
        {
            if (auxiliarCamera1 != null && auxiliarCamera1.enabled && comp1 != null && !comp1.Destroyed)
            {
                Vector2 currentSize = comp1.RectTransform.rect.size;
                if (currentSize != lastAuxiliarSize1)
                {
                    AdjustFirstAuxiliar(comp1, auxiliarCamera1.orthographic);
                    lastAuxiliarSize1 = currentSize;
                }
            }
            if (auxiliarCamera2 != null && auxiliarCamera2.enabled && comp2 != null && !comp2.Destroyed)
            {
                Vector2 currentSize = comp2.RectTransform.rect.size;
                if (currentSize != lastAuxiliarSize2)
                {
                    AdjustSecondAuxiliar(comp2, auxiliarCamera2.orthographic);
                    lastAuxiliarSize2 = currentSize;
                }
            }
        }
    }
}
