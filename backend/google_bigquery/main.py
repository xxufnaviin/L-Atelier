# to query data
from dotenv import load_dotenv
from google.cloud import bigquery
from datetime import datetime
import csv
import os


load_dotenv()


client = bigquery.Client.from_service_account_json(os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))


def query_to_JSON(query) -> list[dict]:
    listofJSON = []
    results = client.query(query).result()

    i = 0
    for rows in results:
        j = 0
        listofJSON.append({})
        for fields in results.schema:
            if(isinstance(list(rows.values())[j], datetime)):
                listofJSON[i][fields.name] = list(rows.values())[j].isoformat()
            else:    
                listofJSON[i][fields.name] = list(rows.values())[j]

            j += 1
        i += 1

    return listofJSON
        
def query_to_csv(query, output_path):
    results = client.query(query).result()
    with open(output_path, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([field.name for field in results.schema])  # header
        for row in results:
            writer.writerow(list(row.values()))
    print(f"Results saved to {output_path}")

def query(query):
    listofJSON = []
    results = client.query(query).result()
    for rows in results:
        listofJSON.append(rows.values())
    
    return listofJSON[0][0]
        
    # print()
    # return results
