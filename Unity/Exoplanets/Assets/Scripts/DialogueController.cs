using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class DialogueController : MonoBehaviour
{
    public static DialogueController Instance { get; private set; }
    [SerializeField] private float writeDelay;
    [SerializeField] private float delayPerCharacter;
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

    public void WriteText(string text, bool interrupt)
    {
        if (interrupt)
        {
            dialogueQueue.Clear();
        }
        dialogueQueue.Enqueue(text);
    }

    private IEnumerator WriteTextCoroutine()
    {
    }


}
