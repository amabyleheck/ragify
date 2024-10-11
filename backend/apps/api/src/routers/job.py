from fastapi import Depends
from starlette import status
from fastapi import APIRouter
from starlette.responses import JSONResponse

from crud.job import get_jobs
from database import get_db

from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/jobs")


@router.get("/", status_code=status.HTTP_200_OK)
async def extract(
    session_uid: str,
    db: Session = Depends(get_db),
) -> JSONResponse:

    jobs = get_jobs(db, session_uid)

    return {"status": "success", "jobs": jobs}
