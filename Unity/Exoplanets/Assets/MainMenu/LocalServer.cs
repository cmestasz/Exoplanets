using System;
using System.Net;
using UnityEngine;

public class LocalServer : MonoBehaviour
{
    private HttpListener _httpListener;

    private bool _serverActive;

    public void StartServer()
    {
        if (!_serverActive)
        {
            _httpListener = new HttpListener();
            _httpListener.Prefixes.Add("http://localhost:7463/callback/");
            _httpListener.Start();
            _httpListener.BeginGetContext(new AsyncCallback(OnRequestReceive), _httpListener);
            _serverActive = true;
            Debug.Log("Servidor HTTP local iniciado en http://localhost:7463/callback");
        }
    }

    private void OnRequestReceive(IAsyncResult result)
    {
        if (_httpListener == null) return;

        var context = _httpListener.EndGetContext(result);
        var request = context.Request;
        var response = context.Response;
        Debug.Log(request.QueryString);

        string code = request.QueryString["code"];
        Debug.Log("Código recibido: " + code);

        string responseString = "<html><body><b>Autenticación completada, puedes cerrar esta ventana.</b></body></html>";
        byte[] buffer = System.Text.Encoding.UTF8.GetBytes(responseString);
        response.ContentLength64 = buffer.Length;
        response.OutputStream.Write(buffer, 0, buffer.Length);
        response.OutputStream.Close();

    }
}
