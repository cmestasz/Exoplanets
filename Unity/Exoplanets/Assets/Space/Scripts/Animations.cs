using System.Collections;
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
}