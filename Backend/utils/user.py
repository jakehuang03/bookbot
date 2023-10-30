import db.crud

from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def decode_token(token):
    # This doesn't provide any security at all
    # Check the next version
    user = db.crud.get_user_by_email(token)
    return user
