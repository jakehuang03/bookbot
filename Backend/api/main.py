from temp370Project.Backend.api.ToLLM.localLLMCall import localcall
from temp370Project.Backend.api.preLLM.WordSearch import WordSearch

if __name__ == "__main__":
    # initialize tensor and word finding
    bookname = "b.pdf"
    word = "director"
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

    question = "give me the number of scenes that helen was talking with the voice"
    question2 = ["what do directors do?","why do we need directors"]

    # asking the llm
    response = localcall(context, question2)
    print(response)
