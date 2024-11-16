using UnityEngine;

public class DropdownController : MonoBehaviour
{

    // Método para verificar si el clic fue dentro del dropdown
    private bool IsClickInsideDropdown(ReactUnity.UGUI.ContainerComponent dropdown)
    {
        // Verificar si el clic está dentro del área del dropdown
        RectTransform rectTransform = dropdown.GetComponent<RectTransform>();
        Vector2 localPoint = rectTransform.InverseTransformPoint(Input.mousePosition);
        return rectTransform.rect.Contains(localPoint);
    }
}
