using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class DialogueController : MonoBehaviour
{
    public static DialogueController Instance { get; private set; }
    private const float writeDelay = 0.05f;
    private const float fadeSpeed = 255;
    private const float postDelayPerCharacter = 0.1f;
    private TMP_Text textBox;
    private Queue<string> dialogueQueue = new();

    private void Awake()
    {
        Instance = this;
    }

    private void Start()
    {
        textBox = GetComponent<TMP_Text>();
        StartCoroutine(WriteTextCoroutine());
    }

    public void ShowDialogue(string key)
    {
        WriteText(Dialogues.DIALOGUES[$"{SettingsManager.Language}_{key}"]);
    }

    public void WriteText(string text)
    {
        dialogueQueue.Enqueue(text);
    }

    private IEnumerator WriteTextCoroutine()
    {
        while (true)
        {
            yield return new WaitUntil(() => dialogueQueue.Count > 0);
            string text = dialogueQueue.Dequeue();
            textBox.color = Color.white;
            for (int i = 0; i < text.Length; i++)
            {
                textBox.text += text[i];
                yield return new WaitForSeconds(writeDelay);
            }
            yield return new WaitForSeconds(postDelayPerCharacter * text.Length);
            float alpha = 255;
            while (alpha > 0)
            {
                alpha -= fadeSpeed * Time.deltaTime;
                textBox.color = new Color32(255, 255, 255, (byte)alpha);
                yield return null;
            }
            textBox.text = "";
        }
    }


}
