using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class DialogueController : MonoBehaviour
{
    public static DialogueController Instance { get; private set; }
    private const float WRITE_DELAY = 0.05f;
    private const float FADE_SPEED = 255;
    private const float POST_DELAY_PER_CHARACTER = 0.1f;
    private TMP_Text textBox;
    private Queue<Dialogue> dialogueQueue = new();

    private void Awake()
    {
        Instance = this;
    }

    private void Start()
    {
        textBox = GetComponent<TMP_Text>();
        StartCoroutine(WriteTextCoroutine());
    }

    public void ShowDialogue(string key, float delay = 0.5f)
    {
        Dialogue dialogue = new() { text = Dialogues.DIALOGUES[$"{SettingsManager.Language}_{key}"], delay = delay };
        WriteText(dialogue);
    }

    public void WriteText(Dialogue dialogue)
    {
        dialogueQueue.Enqueue(dialogue);
    }

    private IEnumerator WriteTextCoroutine()
    {
        while (true)
        {
            yield return new WaitUntil(() => dialogueQueue.Count > 0);
            Dialogue dialogue = dialogueQueue.Dequeue();
            string text = dialogue.text;
            yield return new WaitForSeconds(dialogue.delay);
            textBox.color = Color.white;
            for (int i = 0; i < text.Length; i++)
            {
                textBox.text += text[i];
                yield return new WaitForSeconds(WRITE_DELAY);
            }
            yield return new WaitForSeconds(POST_DELAY_PER_CHARACTER * text.Length);
            float alpha = 255;
            while (alpha > 0)
            {
                alpha -= FADE_SPEED * Time.deltaTime;
                textBox.color = new Color32(255, 255, 255, (byte)alpha);
                yield return null;
            }
            textBox.text = "";
        }
    }


}
