using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using SimpleFileBrowser;
using ReactUnity.Helpers;

public class ProfilePictureSelector : MonoBehaviour
{
    private RawImage profilePicture;

    public void OpenFileBrowser(object setProfilePictureOnReact)
    {
        FileBrowser.SetFilters(true, new FileBrowser.Filter("Images", ".jpg", ".png", ".jpeg"));
        FileBrowser.SetDefaultFilter(".jpg");

        StartCoroutine(ShowLoadDialogCoroutine(setProfilePictureOnReact));
    }

    private IEnumerator ShowLoadDialogCoroutine(object setProfilePictureOnReact)
    {
        yield return FileBrowser.WaitForLoadDialog(FileBrowser.PickMode.Files, false, null, null, "Seleccionar Imagen", "Cargar");

        if (FileBrowser.Success && FileBrowser.Result.Length > 0)
        {
            string filePath = FileBrowser.Result[0];
            Debug.Log("Archivo seleccionado: " + filePath);

            LoadProfilePicture(filePath);

            SendImageToReact(filePath, setProfilePictureOnReact);
        }
        else
        {
            Debug.Log("No se seleccionó ningún archivo.");
            var callback = Callback.From(setProfilePictureOnReact);
            callback.Call("", "");
        }
    }

    private void LoadProfilePicture(string filePath)
    {
        try
        {
            byte[] imageBytes = File.ReadAllBytes(filePath);
            Texture2D texture = new Texture2D(2, 2);

            if (!texture.LoadImage(imageBytes))
            {
                Debug.LogError("No se pudo cargar la imagen como textura.");
                return;
            }

            profilePicture.texture = texture;
        }
        catch (System.Exception ex)
        {
            Debug.LogError("Error al cargar la imagen: " + ex.Message);
        }
    }

    private void SendImageToReact(string filePath, object setProfilePictureOnReact)
    {
        try
        {
            byte[] imageBytes = File.ReadAllBytes(filePath);
            string base64Image = System.Convert.ToBase64String(imageBytes);
            string mimeType = GetMimeType(filePath);
            var callback = Callback.From(setProfilePictureOnReact);
            callback.Call(mimeType, base64Image);
            Debug.Log("Imagen enviada a React en formato base64.");
        }
        catch (System.Exception ex)
        {
            Debug.LogError("Error al convertir o enviar la imagen: " + ex.Message);
        }
    }
    private string GetMimeType(string filePath)
    {
        string extension = Path.GetExtension(filePath).ToLower();
        return extension switch
        {
            ".png" => "image/png",
            ".jpg" => "image/jpeg",
            ".jpeg" => "image/jpeg",
            ".gif" => "image/gif",
            ".bmp" => "image/bmp",
            _ => "application/octet-stream",
        };
    }

}

/*
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

*/