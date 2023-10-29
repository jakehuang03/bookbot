from gpt4all import GPT4All


def localcall(paragraphs, question):
    # C:\\\\Users\\\\cy295\\\\.cache\\\\gpt4all\\
    model = GPT4All('llama-2-7b-chat.ggmlv3.q8_0.bin')
    documents = paragraphs
    
    if len(paragraphs) > 50:
        items = list(paragraphs.items())[:50]
        documents = dict(items)
    else:
        documents = paragraphs

    # Convert the list of strings into a system template
    system_template = 'A chat based on the following documents:\n'
    for i, doc in enumerate(documents, 1):
        system_template += f"Document {i}: {doc}\n"

    prompt_template = 'USER: {0}\nASSISTANT: '

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
