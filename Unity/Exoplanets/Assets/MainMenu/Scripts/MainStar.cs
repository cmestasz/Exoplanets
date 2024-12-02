using ReactUnity.Interfaces;
using ReactUnity.UGUI;
using UnityEngine;
public class MainStar : MonoBehaviour, IReactInsertable
{
    private GameObject instance;

    private Vector3 lastMousePosition;

    public float dragSpeed = 5f;

    public float rotationSpeed = 3f;

    public Material customMaterial;

    public ReactRendererUGUI react;

    public GameObject prefab;

    public void Insert(PrefabComponent Component)
    {
        if (prefab != null)
        {
            instance = Instantiate(prefab, Vector3.zero, Quaternion.identity);
            instance.transform.SetParent(Component.RectTransform, false);
            instance.transform.localScale = new Vector3(250f, 250f, 250f);

            RectTransform rectTransform = instance.GetComponent<RectTransform>();
            if (rectTransform != null)
            {
                rectTransform.anchorMin = new Vector2(0.5f, 0.5f); // Centro
                rectTransform.anchorMax = new Vector2(0.5f, 0.5f); // Centro
                rectTransform.anchoredPosition = Vector2.zero;
            }

            Renderer renderer = instance.GetComponent<Renderer>();
            if (renderer != null)
            {
                if (customMaterial != null)
                {
                    renderer.material = customMaterial;
                    Debug.Log("Material assigned successfully");
                }
                else
                {
                    Debug.LogError("Failed to load material");
                }
            }
            else
            {
                Debug.LogError("No Renderer found on the prefab");
            }

            Debug.Log("Prefab instantiated successfully");
        }
    }

    void Start()
    {
    }

    void Update()
    {
        if (instance != null)
        {
            AutoRotate();
            HandleMouseDrag();
        }
    }

    void HandleMouseDrag()
    {
        if (Input.GetMouseButtonDown(0))
        {
            lastMousePosition = Input.mousePosition;
        }

        if (Input.GetMouseButton(0))
        {
            Vector3 delta = Input.mousePosition - lastMousePosition;
            lastMousePosition = Input.mousePosition;

            // Rotación en el eje Y para horizontal y en el eje X para vertical
            instance.transform.Rotate(Vector3.up, -delta.x * dragSpeed * Time.deltaTime, Space.World);
            instance.transform.Rotate(Vector3.right, delta.y * dragSpeed * Time.deltaTime, Space.World);
        }
    }

    void AutoRotate()
    {

        Vector3 inclinedAxis = new Vector3(0.3f, 1f, 0f).normalized;
        instance.transform.Rotate(inclinedAxis, rotationSpeed * Time.deltaTime);
    }
}
