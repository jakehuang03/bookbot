import db.crud
from utils.preLLM.keywordRefine import gptextract
from utils.ToLLM.localLLMCall import localcall
from utils.preLLM.WordSearch import WordSearch

def callwithquestions(file, question):

    # initialize tensor and word finding
    bookname = file
    word2 = gptextract(question)
    print(word2)
    word = word2[0]
    print(word)
    word_search = WordSearch(bookname)
    word_positions = word_search.find_word(word)
    context = word_search.sentences_around_index(word_positions, 2)

    # wording finding
    result = {"extractedpar": []}
    i = 0
    
    for pos, surrounding_sentences in context.items():
        page_num = word_search.position_to_page_number(pos)
        temp = {"page": page_num + 1, 'content': surrounding_sentences, 'id': i}
        i = i+1
        result["extractedpar"].append(temp)
        print(f"At position {pos} (Page {page_num + 1}):")
        for sentence in surrounding_sentences:
            print(sentence)
        print("\n")


    # asking the llm
    response = localcall(context, question)
    result['response'] = response
    return result

def ask_questions(book, question):

        # Access the "book" and "questions" fields from the request_data dictionar

        result = callwithquestions(book, question)
        res = {}
        temp = [{'id': 1, 'answer': result['response']}]
        res['answer'] = temp
        res['extractedpar'] = result['extractedpar']
        res['book'] = db.crud.get_bookname_by_id(book)
        res['question'] = question
        return res
    
if __name__ == "__main__":
    question = "what do the director do?"
    ask_questions("b.pdf", question)