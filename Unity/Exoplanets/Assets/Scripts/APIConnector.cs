using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class APIConnector
{
    const string API_URL = "http://127.0.0.1:8000/";

    public static IEnumerator Post<Request, Response>(string endpoint, Request data, System.Action<Response> callback, System.Action<string> errorCallback = null)
    {
        using UnityWebRequest request = UnityWebRequest.Post(API_URL + endpoint, JsonUtility.ToJson(data), "application/json");
        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Error error = JsonUtility.FromJson<Error>(request.downloadHandler.text);
            if (error == null)
                Debug.LogError(request.result);
            else
                errorCallback?.Invoke(error.detail);
        }
        else
        {
            Debug.Log(request.downloadHandler.text);
            Response response = JsonUtility.FromJson<Response>(request.downloadHandler.text);
            callback(response);
        }
    }

    public static IEnumerator PostBytes<Response>(string endpoint, byte[] data, System.Action<Response> callback)
    {

        /*using UnityWebRequest request = new(API_URL + endpoint, "POST");
        request.uploadHandler = new UploadHandlerRaw(data);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.uploadHandler.contentType = "text/html";
        request.SetRequestHeader("Content-Type", "text/html");
        */

        WWWForm form = new();
        form.AddBinaryData("file", data, "image.png", "image/png");
        UnityWebRequest request = UnityWebRequest.Post(API_URL + endpoint, form);

        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError(request.error);
        }
        else
        {
            Debug.Log(request.downloadHandler.text);
            Response response = JsonUtility.FromJson<Response>(request.downloadHandler.text);
            callback(response);
        }
    }
}