from datetime import datetime
from uuid import UUID
from pydantic import BaseModel
from typing import Literal


class JobSchema(BaseModel):
    """
    Represents an asynchronous extraction job.

    Attributes:
        id (int): Unique identifier for the job.
        session_id (str): Identifier for the session storage that requested this job.
        status (Literal["in_queue", "in_progress", "completed", "failed"]): Current status of the job. Defaults to "in_queue".
        started_at (datetime): Timestamp when the job started.
        completed_at (datetime): Timestamp when the job was completed.

    Note:
        The `session_id` is a string to match the browser session storage identifier.
    """

    id: int
    session_id: UUID
    background_task_id: UUID
    status: Literal["in_queue", "in_progress", "completed", "failed"] = "in_queue"
    started_at: datetime = datetime.now()
    completed_at: datetime = None
    result_file: bytes = None
