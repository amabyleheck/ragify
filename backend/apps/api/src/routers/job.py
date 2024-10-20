import base64
from fastapi import APIRouter, Depends
from starlette import status
from starlette.responses import JSONResponse

from crud.job import get_jobs
from database import get_db
from database_models.job import Job

from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/jobs")


@router.get("/", status_code=status.HTTP_200_OK)
async def extract(
    session_uid: str,
    db: Session = Depends(get_db),
) -> JSONResponse:

    jobs: list[Job] = get_jobs(db, session_uid)

    # Convert list of bytes to base64 encoded string
    for job in jobs:
        if isinstance(job.result_file, bytes):
            job.result_file = base64.b64encode(job.result_file).decode("utf-8")

    return {"status": "success", "jobs": jobs}
