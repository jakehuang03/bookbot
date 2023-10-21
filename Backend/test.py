import db.crud as crud
print(crud.get_book_by_name(bookname="test", genre="Fiction"))