from functools import lru_cache
import pathlib

from starlette import status
from starlette.requests import Request
from starlette.responses import JSONResponse

from routers.extract import router as extract_router
from routers.job import router as job_router

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from anyio.lowlevel import RunVar
from anyio import CapacityLimiter

load_dotenv(dotenv_path=pathlib.Path(__file__).parent.resolve())


origins = [
    "https://ragify-app.vercel.app",
    "http://localhost:3000",
    "http://0.0.0.0:8000",
]


def create_app():
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    routers = [extract_router, job_router]

    for router in routers:
        app.include_router(router)

    return app


app = create_app()


@app.on_event("startup")
def startup():
    # Define the number of background tasks job executed simultaneously.
    RunVar("_default_thread_limiter").set(CapacityLimiter(1))
