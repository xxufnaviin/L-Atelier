from fastapi import FastAPI

app = FastAPI(title="Modular Backend API")

@app.get("/")
def read_root():
    """
    This is the root endpoint of the application.
    It's separate from the /api endpoint.
    """
    return {"message": "Welcome to the main backend app!"}

