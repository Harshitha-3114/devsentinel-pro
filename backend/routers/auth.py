from fastapi import APIRouter
from fastapi.responses import RedirectResponse
import requests
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
FRONTEND_URL = os.getenv("FRONTEND_URL")

@router.get("/auth/github/login")
def github_login():
    return RedirectResponse(
        f"https://github.com/login/oauth/authorize"
        f"?client_id={GITHUB_CLIENT_ID}"
        f"&scope=repo,user"
    )

@router.get("/auth/github/callback")
def github_callback(code: str):
    # Exchange code for token
    response = requests.post(
        "https://github.com/login/oauth/access_token",
        data={
            "client_id": GITHUB_CLIENT_ID,
            "client_secret": GITHUB_CLIENT_SECRET,
            "code": code,
        },
        headers={"Accept": "application/json"}
    )
    token_data = response.json()
    access_token = token_data.get("access_token")

    # Redirect to frontend with token
    return RedirectResponse(
        f"{FRONTEND_URL}/auth/success?token={access_token}"
    )

@router.get("/auth/github/user")
def get_github_user(token: str):
    response = requests.get(
        "https://api.github.com/user",
        headers={"Authorization": f"Bearer {token}"}
    )
    return response.json()