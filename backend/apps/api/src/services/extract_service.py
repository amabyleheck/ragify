import time
from typing import List
from uuid import uuid4
from fastapi import BackgroundTasks, UploadFile

from database_models.job import Job, JobStatus
from crud.job import create_job, update_job_status
from misc.utils import bufferize_uploaded_files, clean_up_uploaded_files

from sqlalchemy.orm import Session

from schemas.extract import ExtractSchema

from extractor.main import extract


class ExtractService:
    """
    Service responsible to trigger and queue a new BackgroundTask to handle the extraction.
    """

    def __init__(self, extract_schema: ExtractSchema) -> None:
        self.schema = extract_schema
        self.task_uid = uuid4()

    async def background_extract(
        self,
        extract_schema: ExtractSchema,
        job_id: int,
        db: Session,
    ):
        update_job_status(db, job_id, JobStatus.IN_PROGRESS)

        print(extract_schema.dict())
        extract(schema=extract_schema.dict())

        clean_up_uploaded_files()

        update_job_status(db, job_id, JobStatus.COMPLETED, completed=True)
        print(f"Job {job_id} completed")

    def invoke_extract_job(
        self,
        background_task: BackgroundTasks,
        session_uid: uuid4,
        db: Session,
    ) -> dict:
        """
        Invokes the extract background job
        """

        try:
            job = create_job(
                db, Job(session_id=session_uid, background_task_id=self.task_uid)
            )

            background_task.add_task(self.background_extract, self.schema, job.id, db)

            return {
                "status": "success",
                "message": "Extraction has started. Check the progress in the dashboard.",
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}
