import requests

url = "https://chd-backend.onrender.com/predict"
image_path = "test_images/ASD01.jpg"  # change this to your local image path

with open(image_path, "rb") as img:
    files = {"file": img}
    response = requests.post(url, files=files)

print("Status Code:", response.status_code)
print("Response:", response.json())
