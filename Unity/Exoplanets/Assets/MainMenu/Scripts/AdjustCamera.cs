using System;
using ReactUnity.UGUI;
using UnityEngine;

public class AdjustCamera : MonoBehaviour
{

    private static int AUXILIAR_CAMERA_1_LAYER;

    private static int AUXILIAR_CAMERA_2_LAYER;

    private static int UI_LAYER;

    private static int MAXIMIZED_LAYER;

    private bool cameraToCanvas;

    private bool needPlayerController;

    public Canvas canvas;

    private Camera mainCamera;

    public Camera auxiliarCamera1;

    public Camera auxiliarCamera2;

    private UGUIComponent comp1;

    private UGUIComponent comp2;

    private Vector2 lastAuxiliarSize1;

    private Vector2 lastAuxiliarSize2;

    public void SetLayerRecursively(GameObject obj, int newLayer)
    {
        obj.layer = newLayer;
        foreach (Transform child in obj.transform)
        {
            SetLayerRecursively(child.gameObject, newLayer);
        }
    }

    public void MaximizedExoplanets(UGUIComponent component)
    {
        SetLayerRecursively(component.GameObject, MAXIMIZED_LAYER);
        mainCamera.cullingMask &= ~(1 << UI_LAYER);
        mainCamera.cullingMask |= 1 << MAXIMIZED_LAYER;
        AdjustFirstAuxiliar(component, false, true);
    }

    public void ResetMain(UGUIComponent component)
    {
        SetLayerRecursively(component.GameObject, UI_LAYER);
        mainCamera.cullingMask &= ~(1 << MAXIMIZED_LAYER);
        mainCamera.cullingMask |= 1 << UI_LAYER;
        AdjustFirstAuxiliar(component, false, true);
    }

    public void ResetFirst()
    {
        auxiliarCamera1.transform.SetParent(null);
        auxiliarCamera1.enabled = false;
    }

    public void ResetSecond()
    {
        auxiliarCamera2.transform.SetParent(null);
        auxiliarCamera2.enabled = false;
    }


    public void AdjustToCanvas()
    {
        if (!cameraToCanvas && mainCamera != null && canvas != null)
        {
            cameraToCanvas = true;
            mainCamera.cullingMask = -1;
            PrepareMainForAuxiliars();
            ResetFirst();
            ResetSecond();
        }

    }

    public void AdjustFirstAuxiliar(UGUIComponent comp, bool orthographic = true, bool needPlayerController = false)
    {
        if (auxiliarCamera1 != null)
        {
            PrepareMainForAuxiliars();
            auxiliarCamera1.enabled = true;
            comp1 = comp;
            AdjustTo(comp, auxiliarCamera1, orthographic);
            if (needPlayerController)
            {
                auxiliarCamera1.transform.SetParent(PlayerController.Instance.transform, false);
                auxiliarCamera1.transform.position = comp.RectTransform.position;
                auxiliarCamera1.cullingMask |= 1 << UI_LAYER;
            } else {
                auxiliarCamera1.cullingMask &= ~(1 << UI_LAYER);
            }
            this.needPlayerController = needPlayerController;
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
            mainCamera.cullingMask &= ~(1 << AUXILIAR_CAMERA_1_LAYER);
            mainCamera.cullingMask &= ~(1 << AUXILIAR_CAMERA_2_LAYER);
            cameraToCanvas = false;
        }
    }

    private void ValidateLayers()
    {
        if (AUXILIAR_CAMERA_1_LAYER == -1 || AUXILIAR_CAMERA_2_LAYER == -1)
        {
            Debug.LogError("Las capas 'AuxiliarCamera1' o 'AuxiliarCamera2' no están configuradas en el proyecto.");
        }
    }

    void Awake()
    {
        AUXILIAR_CAMERA_1_LAYER = LayerMask.NameToLayer("AuxiliarCamera1");
        AUXILIAR_CAMERA_2_LAYER = LayerMask.NameToLayer("AuxiliarCamera2");
        UI_LAYER = LayerMask.NameToLayer("UI");
        MAXIMIZED_LAYER = LayerMask.NameToLayer("Maximized");

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
                    AdjustFirstAuxiliar(comp1, auxiliarCamera1.orthographic, needPlayerController);
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
