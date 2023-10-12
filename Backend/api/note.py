#generate requirement
#cmd into local file location
#pipreq .
"""import re
from ToLLM.localLLMCall import localcall


def extract_key_word(questions):
    import nltk
    from nltk import FreqDist
    from nltk.tokenize import word_tokenize
    from nltk.corpus import stopwords

    nltk.download('stopwords')
    nltk.download('punkt')

    res = []
    for question in questions:
        words = [word for word in word_tokenize(question) if word.isalnum()]
        filtered_words = [word for word in words if word not in stopwords.words('english')]
        freq_dist = FreqDist(filtered_words)
        keywords = list(freq_dist.keys())
        res.append(keywords)
        print(keywords)

    return res

def extract_quoted_words(sentence):
    # Extracting sequences inside double or single quotation marks
    return re.findall(r'"(.*?)"|\'(.*?)\'', sentence)

def get_clean_quotes(sentence):
    quotes = extract_quoted_words(sentence)
    # Flatten the tuple and remove None values
    return [q for sub in quotes for q in sub if q]
"""