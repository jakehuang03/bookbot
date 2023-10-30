import os

import openai


# dont use!
def chatgpt(promptt):
    openai.api_key = os.environ.get('OPENAI_API_KEY')
    try:
        completion = openai.Completion.create(
            model="gpt-3.5-turbo-instruct",
            prompt=promptt,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.5
        )

        return completion.choices[0].text
    except openai.error.RateLimitError:
        return "You exceeded your current quota, please check your plan and billing details."


# note
"""{
  "choices": [
    {
      "finish_reason": "length",
      "index": 0,
      "logprobs": null,
      "text": "\n\n\"Let Your Sweet Tooth Run Wild at Our Creamy Ice Cream Shack"
    }
  ],
  "created": 1683130927,
  "id": "cmpl-7C9Wxi9Du4j1lQjdjhxBlO22M61LD",
  "model": "gpt-3.5-turbo-instruct",
  "object": "text_completion",
  "usage": {
    "completion_tokens": 16,
    "prompt_tokens": 10,
    "total_tokens": 26
  }
}"""

if __name__ == "__main__":
    print(chatgpt("what is java"))
