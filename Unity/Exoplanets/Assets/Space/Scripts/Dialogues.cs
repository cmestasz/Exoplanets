using System.Collections.Generic;

public static class Dialogues
{
    public static Dictionary<string, string> DIALOGUES = new()
    {
        { "es_warp", "Bienvenido a..." },
        { "en_warp", "Welcome to..." },
        { "es_warp_posonly", "Un lugar cualquiera en el espacio." },
        { "en_warp_posonly", "A random place in space." },
        { "es_warp_invalid", "Esa posicion no existe." },
        { "en_warp_invalid", "That position does not exist." },
        { "es_warp_fail", "Algo salio mal." },
        { "en_warp_fail", "Something went wrong." },
        { "es_warp_noname", "Parece que no hay un nombre comun para este exoplaneta, asi que tendremos que usar su ID." },
        { "en_warp_noname", "It seems there is no common name for this exoplanet, so we will have to use its ID." }
    };
}