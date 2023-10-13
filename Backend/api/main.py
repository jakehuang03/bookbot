import uvicorn
import threading
from simplecall import call
from receiveUploadFile import app


# Use threads to run both apps
def run_simplecall():
    uvicorn.run(call, host="0.0.0.0", port=8000)


def run_receivefile():
    uvicorn.run(app, host="0.0.0.0", port=8001)


# Execute threads
if __name__ == "__main__":
    t1 = threading.Thread(target=run_simplecall())
    t2 = threading.Thread(target=run_receivefile())

    t1.start()
    t2.start()

    t1.join()
    t2.join()
