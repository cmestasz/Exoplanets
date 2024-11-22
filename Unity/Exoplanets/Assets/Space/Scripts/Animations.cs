using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.Rendering.Universal;

public class Animations
{
    public static IEnumerator WarpFadeIn(ColorAdjustments colorAdjustments)
    {
        float exposure = 0;
        while (exposure < 20)
        {
            exposure += 0.25f;
            colorAdjustments.postExposure.value = exposure;
            yield return null;
        }
    }

    public static IEnumerator WarpFadeOut(ColorAdjustments colorAdjustments)
    {
        float exposure = 20;
        while (exposure > 0)
        {
            exposure -= 0.25f;
            colorAdjustments.postExposure.value = exposure;
            yield return null;
        }
    }

    public static IEnumerator TitleFadeIn(TMP_Text titleText)
    {
        float alpha = 0;
        while (alpha < 255)
        {
            alpha += 127 * Time.deltaTime;
            alpha = alpha > 255 ? 255 : alpha;
            titleText.color = new Color32(255, 255, 255, (byte)alpha);
            yield return null;
        }
    }

    public static IEnumerator TitleFadeOut(TMP_Text titleText)
    {
        float alpha = 255;
        while (alpha > 0)
        {
            alpha -= 127 * Time.deltaTime;
            alpha = alpha < 0 ? 0 : alpha;
            titleText.color = new Color32(255, 255, 255, (byte)alpha);
            yield return null;
        }
    }
}