using System;
using System.Net;
using UnityEngine;

public class LocalServer : MonoBehaviour
{
    private HttpListener _httpListener;

    object _handleCode;

    string codeReceived;

    void Start()
    {
        this.codeReceived = "";
        _httpListener = new HttpListener();
        _httpListener.Prefixes.Add("http://localhost:7463/callback/");
        _httpListener.Start();
        _httpListener.BeginGetContext(new AsyncCallback(OnRequestReceive), _httpListener);
        Debug.Log("Servidor HTTP local iniciado en http://localhost:7463/callback");
    }

    public void SetHandleCode(object handleCode)
    {
        this._handleCode = handleCode;
    }

    private void OnRequestReceive(IAsyncResult result)
    {
        if (_httpListener == null) return;

        var context = _httpListener.EndGetContext(result);
        var request = context.Request;
        var response = context.Response;
        Debug.Log(request.QueryString);

        string c = request.QueryString["code"];
        Debug.Log("Código recibido: " + c);
        this.codeReceived = c;

        string responseString = "<html><body><b>Autenticación completada, puedes cerrar esta ventana.</b></body></html>";
        byte[] buffer = System.Text.Encoding.UTF8.GetBytes(responseString);
        response.ContentLength64 = buffer.Length;
        response.OutputStream.Write(buffer, 0, buffer.Length);
        response.OutputStream.Close();

    }

    void Update()
    {
        if (this.codeReceived.Length > 0)
        {
            if (_handleCode != null)
            {
                var callback = ReactUnity.Helpers.Callback.From(_handleCode);
                callback.Call(this.codeReceived);
                this.codeReceived = "";

            }
            else
            {
                Debug.Log("HandleCode is null   ");
            }

        }
    }
}
