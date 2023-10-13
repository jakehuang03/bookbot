import db.crud

def hash_password(password: str):
    return "fakehashed" + password

def decode_token(token):
    # This doesn't provide any security at all
    # Check the next version
    user = db.crud.get_user_by_email(token)
    return user