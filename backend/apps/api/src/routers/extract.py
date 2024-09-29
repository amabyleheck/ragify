from fastapi import BackgroundTasks, Request
from starlette import status
from fastapi import APIRouter
from starlette.responses import JSONResponse

from schemas.extract import ExtractSchema
from services.extract_service import ExtractService

router = APIRouter(prefix="/api/extract")


@router.post("/", status_code=status.HTTP_200_OK)
async def extract(
    request: Request, extract_api: ExtractSchema, background_tasks: BackgroundTasks
) -> JSONResponse:
    form_data = await request.form()
    file_list = [form_data.getlist(key)[0] for key in form_data.keys()]
    file_bytes = [await file.read() for file in file_list]

    response = ExtractService(extract_schema=extract_api).invoke_extract_job(
        background_tasks
    )

    return response
