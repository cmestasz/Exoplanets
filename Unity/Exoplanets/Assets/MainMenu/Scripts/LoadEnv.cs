using UnityEngine;
using CandyCoded.env;
using System.Collections.Generic;

public class LoadEnv : MonoBehaviour
{
    void Start()
    {
        if (env.TryParseEnvironmentVariable("DATABASE_URL", out string dbURL))
        {
            System.Environment.SetEnvironmentVariable("DATABASE_URL", dbURL);
            Debug.Log("DATABASE_URL has been loaded");
        }
        if (env.TryParseEnvironmentVariable("DATABASE_KEY", out string dbKey))
        {
            System.Environment.SetEnvironmentVariable("DATABASE_KEY", dbKey);
            Debug.Log("DATABASE_KEY has been loaded");
        }
        if (env.TryParseEnvironmentVariable("API_DOMAIN", out string apiDomain))
        {
            System.Environment.SetEnvironmentVariable("API_DOMAIN", apiDomain);
            Debug.Log("API_DOMAIN has been loaded");
        }
    }

}
