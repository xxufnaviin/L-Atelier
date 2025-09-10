# mcp-server/server.py
from mcp.server import Server
from mcp.server.stdio import stdio_server
import json
import os
from datetime import datetime, timedelta

# Initialize server
server = Server("glowpulse-gcp-server")

# Mock data simulating BigQuery results
MOCK_TRENDS_DATA = {
    "trends": [
        {
            "name": "Oh No",
            "type": "audio",
            "platform": "TikTok",
            "growth_score": 72,
            "country": "MY",
            "date": "2024-09-15"
        },
        {
            "name": "Glass Skin",
            "type": "keyword",
            "platform": "YouTube Shorts",
            "growth_score": 88,
            "country": "MY",
            "date": "2024-09-15"
        },
        {
            "name": "#SunsetBlush",
            "type": "hashtag",
            "platform": "Instagram Reels",
            "growth_score": 65,
            "country": "MY",
            "date": "2024-09-15"
        },
        {
            "name": "Vanilla Girl",
            "type": "keyword",
            "platform": "TikTok",
            "growth_score": 45,
            "country": "US",
            "date": "2024-09-15"
        }
    ]
}

# Tool: Get top trends from mock data
@server.list_tools()
async def list_tools():
    return [
        {
            "name": "get_top_trends_bigquery",
            "description": "Get the current top trending audios, keywords, and hashtags for a given country. Default is Malaysia (MY).",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "country_code": {
                        "type": "string",
                        "description": "The ISO country code, e.g., 'MY' for Malaysia, 'US' for Global.",
                        "default": "MY"
                    },
                    "limit": {
                        "type": "number",
                        "description": "Number of top trends to return per category.",
                        "default": 5
                    }
                }
            }
        },
        {
            "name": "predict_success_score",
            "description": "Predict a success score (%) for a trend recipe by querying historical performance data.",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "audio_name": {"type": "string", "description": "Name of the audio trend."},
                    "keyword_name": {"type": "string", "description": "Name of the keyword trend."},
                    "platform": {"type": "string", "enum": ["TikTok", "Instagram Reels", "YouTube Shorts"]},
                    "demographic": {"type": "string", "enum": ["Gen Z", "Millennials", "All"]}
                },
                "required": ["audio_name", "keyword_name", "platform", "demographic"]
            }
        }
    ]

@server.call_tool()
async def call_tool(name, arguments):
    if name == "get_top_trends_bigquery":
        country_code = arguments.get("country_code", "MY")
        limit = arguments.get("limit", 5)
        
        # Filter mock data by country
        filtered_trends = [t for t in MOCK_TRENDS_DATA["trends"] if t["country"] == country_code]
        sorted_trends = sorted(filtered_trends, key=lambda x: x["growth_score"], reverse=True)[:limit]
        
        return {"result": json.dumps(sorted_trends, indent=2)}
    
    elif name == "predict_success_score":
        # Simulate a prediction based on mock data
        audio_name = arguments["audio_name"]
        keyword_name = arguments["keyword_name"]
        platform = arguments["platform"]
        demographic = arguments["demographic"]
        
        # Simple heuristic for demo
        base_score = 50
        if "Oh No" in audio_name:
            base_score += 20
        if "Glass Skin" in keyword_name:
            base_score += 15
        if platform == "TikTok":
            base_score += 10
        if demographic == "Gen Z":
            base_score += 5
            
        success_score = min(100, base_score)
        
        return {"result": f"The predicted success score for '{audio_name}' + '{keyword_name}' on {platform} targeting {demographic} is {success_score}%."}
    
    else:
        raise ValueError(f"Unknown tool: {name}")

if __name__ == "__main__":
    stdio_server(server)