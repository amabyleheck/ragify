from uuid import uuid4
from fastapi import BackgroundTasks

from database import get_db
from crud.job import update_job_status
from schemas.job import JobSchema
from misc.utils import bufferize_uploaded_files

from schemas.extract import ExtractSchema


class ExtractService:
    """
    Service responsible to trigger and queue a new BackgroundTask to handle the extraction.
    """

    def __init__(self, extract_schema: ExtractSchema) -> None:
        self.schema = extract_schema
        self.task_uid = uuid4()

    async def background_extract(extract_schema: ExtractSchema, uid: uuid4):
        db = get_db()

        update_job_status(db, uid, "in_progress")
        bufferize_uploaded_files(extract_schema.form.files)

        # TODO: add extract logic
        try:
            pass
        except:
            pass

        # ... finally
        update_job_status(db, uid, "completed")

    def invoke_extract_job(self, background_task: BackgroundTasks):
        """
        Invokes the extract background job
        """

        try:
            background_task.add_task(self.background_extract, self.schema, self.uid)

            return {
                "status": "success",
                "message": "Extraction has started. Check the progress in the dashboard.",
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}
