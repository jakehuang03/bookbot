from temp370Project.Backend.api.ToLLM.localLLMCall import localcall
from temp370Project.Backend.api.preLLM.keyexp import extract
from temp370Project.Backend.api.preLLM.KeyWordExtractionLLM import extract_key_word
from temp370Project.Backend.api.preLLM.WordSearch import WordSearch

if __name__ == "__main__":
    question = "give me the number of scenes that helen was talking with the voice"
    question2 = ["what do directors do?","why do we need directors"]


    # initialize tensor and word finding
    bookname = "b.pdf"
    word2 = extract(question2[0])
    print(word2[0])
    word = word2[0]
    word_search = WordSearch(bookname)
    word_positions = word_search.find_word(word)
    context = word_search.sentences_around_index(word_positions, 2)

    # wording finding
    for pos, surrounding_sentences in context.items():
        page_num = word_search.position_to_page_number(pos)
        print(f"At position {pos} (Page {page_num + 1}):")
        for sentence in surrounding_sentences:
            print(sentence)
        print("\n")



    # asking the llm
    response = localcall(context, question2)
    print(response)
