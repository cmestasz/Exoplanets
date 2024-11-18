using System;
using System.Collections.Generic;
using System.Net;
using UnityEngine;

public class AuthServer : MonoBehaviour
{
    private HttpListener _httpListener;

    private object _handleCode;

    private string _codeReceived;

    private bool _error;

    private Dictionary<string, string> _dict;

    void Start()
    {
        _codeReceived = "";
        _error = false;
        _httpListener = new HttpListener();
        _httpListener.Prefixes.Add("http://localhost:7463/callback/");
        _httpListener.Start();
        _httpListener.BeginGetContext(new AsyncCallback(OnRequestReceive), _httpListener);
        Debug.Log("Servidor HTTP local iniciado en http://localhost:7463/callback");
    }

    public void SetHandleCode(object handleCode, Dictionary<string, string> dict)
    {
        _handleCode = handleCode;
        _dict = dict;
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
        _codeReceived = c;
        if (_codeReceived.Length == 0) {
            _error = true;
        }

        string responseString = $@"
<html>

<head>
    <meta charset=""UTF-8"" />
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"" />
    <link rel=""preconnect"" href=""https://fonts.googleapis.com"">
    <link rel=""preconnect"" href=""https://fonts.gstatic.com"" crossorigin>
    <script src=""https://kit.fontawesome.com/f77f33c6ae.js"" crossorigin=""anonymous""></script>
    <link
      href=""https://fonts.googleapis.com/css2?family=Audiowide&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Orbitron:wght@400..900&display=swap""
      rel=""stylesheet"">
    <title>{(_error ? _dict["titlePageError"] : _dict["titlePage"])}</title>
</head>
<style>
    * {{
        box-sizing: border-box;
        margin: 0;
    }}

    a {{
        text-decoration: none;
    }}

    a:visited {{
        text-decoration: none;
    }}

    :root {{
        --primary: #E05600;
        --secondary: #C2B51F;
    }}

    body {{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100dvh;
        padding: 2rem;
        gap: 2rem;
        background-color: black;
        text-align: center;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }}

    h1 {{
        color: var(--primary);
        font-size: 2.5rem;
        font-family: 'Audiowide';
        line-height: 3rem;
    }}

    h2 {{
        color: var(--secondary);
        font-family: 'Orbitron';
    }}

    h3 {{
        font-family: 'Exo 2';
        color: var(--secondary);
        font-size: small;
    }}

    .links {{
        display: flex;
        gap: 2rem;
        color: var(--secondary);
        font-size: 1.5rem;
    }}

    .icon-container {{
        color: var(--secondary);
        font-size: small;
        font-weight: 500;
        font-family: 'Exo 2';
        display: flex;
        gap: .4rem;
        align-items: center;

        & a {{
        color: var(--secondary);
        }}
    }}

    .icon-container:hover {{
        color: var(--primary);

        & a {{
        color: var(--primary);
        }}
    }}

</style>

<body>
    <h1>{(_error ? _dict["mainMessageError"] : _dict["mainMessage"])}</h1>
    <h3>{(_error ? _dict["subMessageError"] : _dict["subMessage"])}</h3>
    <div class=""links"">
        <div class=""icon-container"">
        <i class=""fa-brands fa-github icon-s""></i>
        <a href=""https://github.com/cmestasz/Exoplanets"">{_dict["repo"]}</a>
        </div>
        <div class=""icon-container"">
        <i class=""fa-regular fa-envelope icon-s""></i>
        <a href=""emailto:lgsc21211@gmail.com"">{_dict["email"]}</a>
        </div>
    </div>
</body>

</html>"; 
        byte[] buffer = System.Text.Encoding.UTF8.GetBytes(responseString);
        response.ContentLength64 = buffer.Length;
        response.OutputStream.Write(buffer, 0, buffer.Length);
        response.OutputStream.Close();

    }

    void Update()
    {
        if (_codeReceived.Length > 0)
        {
            if (_handleCode != null && !_error)
            {
                Debug.Log("Se llamarpa a handleCode");
                var callback = ReactUnity.Helpers.Callback.From(_handleCode);
                callback.Call(_codeReceived);
                _codeReceived = "";
                _error = false;

            }
            else if (_error)
            {
                _codeReceived = "";
                _error = false;
                Debug.Log("Un error ha ocurrido");
            }

        }
    }
}
