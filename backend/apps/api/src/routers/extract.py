from typing import List
from fastapi import BackgroundTasks, UploadFile, Form, File, HTTPException, Depends
from starlette import status
from fastapi import APIRouter
from starlette.responses import JSONResponse

from misc.utils import bufferize_uploaded_files
from database import get_db
from schemas.extract import ExtractSchema
from services.extract_service import ExtractService

from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/extract")


@router.post("/", status_code=status.HTTP_200_OK)
async def extract(
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    extract_api: str = Form(...),
    session_uid: str = Form(...),
    files: list[UploadFile] = File(...),
) -> JSONResponse:
    import json

    try:
        extract_api_json = json.loads(extract_api)  # Parse the JSON string
        extract_schema = ExtractSchema(**extract_api_json)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=400, detail="Invalid JSON for extract_api")

    await bufferize_uploaded_files(files)

    response = ExtractService(extract_schema=extract_schema).invoke_extract_job(
        background_tasks, session_uid, db
    )

    # return response
    return response
