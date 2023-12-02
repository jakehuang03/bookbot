# from gpt4all import GPT4All


import os
import openai


def localcall2(paragraphs, question):
    # C:\\\\Users\\\\cy295\\\\.cache\\\\gpt4all\\
    model = GPT4All("llama-2-7b-chat.ggmlv3.q8_0.bin")
    documents = paragraphs

    if len(paragraphs) > 50:
        items = list(paragraphs.items())[:50]
        documents = dict(items)
    else:
        documents = paragraphs

    # Convert the list of strings into a system template
    system_template = "A chat based on the following documents:\n"
    for i, doc in enumerate(documents, 1):
        system_template += f"Document {i}: {doc}\n"

    prompt_template = "USER: {0}\nASSISTANT: "

    with model.chat_session(system_template, prompt_template):
        response = model.generate(question, max_tokens=len(paragraphs) * 100)
        print(response)
        return response

    # system_template += question
    # response = model.generate(system_template, max_tokens=len(paragraphs)*100)
    # return response

    # for i in question:
    # response = model.generate(i, max_tokens=len(paragraphs) * 100)
    # print(response)
    
def localcall(paragraphs, question):

    openai.api_key = ''
    
    # Prepare documents
    if len(paragraphs) > 50:
        items = list(paragraphs.items())[:50]
        documents = dict(items)
    else:
        documents = paragraphs

    # Convert the list of strings into a system template
    prompt = "Based on the following documents:\n"
    for i, doc in enumerate(documents, 1):
        prompt += f"Document {i}: {doc}\n"
    
    prompt = "answer the following question: " + question

    # try:
    #     completion = openai.Completion.create(
    #         model="gpt-3.5-turbo-instruct",
    #         prompt=prompt,
    #         max_tokens=1024,
    #         n=1,
    #         stop=None,
    #         temperature=0.5
    #     )

    #     return completion.choices[0].text
    # except openai.error.RateLimitError:
    #     return "You exceeded your current quota, please check your plan and billing details."
    
    # Prepare the message payload for the chat completions API
    messages = [
        {"role": "system", "content": prompt},
        {"role": "user", "content": question}
    ]

    # Use the chat completions API with the DaVinci model from OpenAI
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=300  
    )

    response_content = response.choices[0].message['content'].strip()
    print(response_content)
    return response_content