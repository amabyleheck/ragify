from datetime import datetime
import os
from uuid import uuid4
from dotenv import load_dotenv
from sqlalchemy.orm import Session

from database_models.job import Job
from schemas.job import JobSchema

load_dotenv()

ABS_PATH = os.getenv("ABS_PATH")


def create_job(db: Session, job_data: Job) -> Job:
    db.add(job_data)
    db.commit()
    db.refresh(job_data)
    return job_data


def get_job(db: Session, job_id: int) -> Job:
    return db.query(Job).filter(Job.id == job_id).first()


def get_jobs(db: Session, session_id: uuid4) -> list[Job]:
    return (
        db.query(Job).filter(Job.session_id == session_id).order_by(Job.id.desc()).all()
    )


def update_job_status(
    db: Session, job_id: int, new_status: str, completed: bool = None
) -> Job:
    job = get_job(db, job_id)

    if job:
        job.status = new_status
        if completed:
            job.completed_at = datetime.now()
        db.commit()
        db.refresh(job)
    return job


def update_job_results_file(db: Session, job_id: int) -> Job:
    job = get_job(db, job_id)

    if job:
        results_file_path = f"{ABS_PATH}/final/results.zip"
        with open(results_file_path, "rb") as file:
            job.result_file = file.read()

        db.commit()
        db.refresh(job)
    return job
