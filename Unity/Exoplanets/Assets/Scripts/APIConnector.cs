using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class APIConnector
{
    const string API_URL = "https://tttttttt";

    public static IEnumerator Get<Response>(string endpoint, System.Action<Response> callback)
    {
        using UnityWebRequest request = UnityWebRequest.Get(API_URL + endpoint);
        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError(request.error);
        }
        else
        {
            callback(JsonUtility.FromJson<Response>(request.downloadHandler.text));
        }
    }

    public static IEnumerator Post<Request, Response>(string endpoint, Request data, System.Action<Response> callback)
    {
        using UnityWebRequest request = UnityWebRequest.PostWwwForm(API_URL + endpoint, JsonUtility.ToJson(data));
        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError(request.error);
        }
        else
        {
            callback(JsonUtility.FromJson<Response>(request.downloadHandler.text));
        }
    }
}