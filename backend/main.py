from fastapi import FastAPI
import uvicorn
from typing import List
from pydantic import BaseModel
from google_bigquery import main as bigqueryClient
from ml.trend_success import TrendSuccessPredictor

app = FastAPI(title="Modular Backend API")


class ContentRequest(BaseModel):
    keyword: str
    audio_path: str
    platform: str 
    target_audience: List[str]

successPredictor = TrendSuccessPredictor()

@app.get("/")
def read_root():
    """
    This is the root endpoint of the application.
    It's separate from the /api endpoint.
    """
    return {"message": "Welcome to the main backend app!"}

@app.get("/trend/analytics")
def trend_analysis():
    query = """
    SELECT json_data FROM analyzed_data.trend_analytics LIMIT 1
    """
    data = bigqueryClient.query(query)
    # print(type(data)) # dict
    return {"data":data,
            "message": "ok"}


@app.post("/recipe/predict")
async def predict_recipe_success(request: ContentRequest):
    successPredictor.load_model()
    results = successPredictor.predict_trend_success(request.keyword,
                                           request.audio_path,
                                           request.platform,
                                           request.target_audience)
    return results



if __name__ == "__main__":
    successPredictor.load_model()
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)