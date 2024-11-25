using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using SimpleFileBrowser;

public class ProfilePictureSelector : MonoBehaviour
{
    public RawImage profilePicture; 

    public void OpenFileBrowser()
    {
        FileBrowser.SetFilters(true, new FileBrowser.Filter("Images", ".jpg", ".png", ".jpeg"));
        FileBrowser.SetDefaultFilter(".jpg");

        StartCoroutine(ShowLoadDialogCoroutine());
    }

    private IEnumerator ShowLoadDialogCoroutine()
    {
        yield return FileBrowser.WaitForLoadDialog(FileBrowser.PickMode.Files, false, null, null, "Seleccionar Imagen", "Cargar");

        if (FileBrowser.Success && FileBrowser.Result.Length > 0)
        {
            string filePath = FileBrowser.Result[0]; // Ruta del archivo seleccionado
            Debug.Log("Archivo seleccionado: " + filePath);

            LoadProfilePicture(filePath);
        }
        else
        {
            Debug.Log("No se seleccionó ningún archivo.");
        }
    }

    private void LoadProfilePicture(string filePath)
    {
        byte[] imageBytes = System.IO.File.ReadAllBytes(filePath);
        Texture2D texture = new Texture2D(2, 2);
        texture.LoadImage(imageBytes);

        profilePicture.texture = texture;
    }
}

