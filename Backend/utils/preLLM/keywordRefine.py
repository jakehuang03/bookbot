import os
import string
import openai

def find_important_keyword(sentence, api_key):
    openai.api_key = api_key

    response = openai.Completion.create(
        engine="text-davinci-003",  # or another available engine
        prompt=f"What is the most important keyword in the following sentence? \"{sentence}\"",
        max_tokens=10  # Adjust as needed
    )

    return response.choices[0].text.strip()

# Example usage
def gptextract(question):
    api_key = os.environ.get('OPENAI_API_KEY')
    t = str(find_important_keyword(question, api_key))
    translator = str.maketrans('', '', string.punctuation)
    t = t.translate(translator)
    t = t.lower()
    res = []
    res.append(t)
    print(res)
    return res