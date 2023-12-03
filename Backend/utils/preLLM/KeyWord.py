import nltk
from nltk import pos_tag
from nltk.tokenize import word_tokenize

# Ensure resources are downloaded
nltk.download('averaged_perceptron_tagger')
nltk.download('punkt')

class extract:
    def __init__(self, text):
        self.words = word_tokenize(text)

    def extract_verbs(self):
        pos_tags = pos_tag(self.words)
        verbs = [word for word, tag in pos_tags if tag.startswith('VB')]
        return verbs
    def extract_nouns(self):
        pos_tags = pos_tag(self.words)
        nouns = [word for word, tag in pos_tags if tag.startswith('NN') or tag.startswith('NNS')]
        return nouns

    #corrections = {"scrum": "NN"}
    def correct_tags(tagged_sentence, corrections):
        return [(word, corrections.get(word, tag)) for word, tag in tagged_sentence]


if __name__ == "__main__":

    test = extract("what is scrum?")
    verbs = test.extract_verbs()
    noun = test.extract_nouns()
    print(verbs)
    print(noun)
