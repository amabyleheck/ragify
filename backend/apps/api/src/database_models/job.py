from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID, BYTEA
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()


class JobStatus(enum.Enum):
    IN_QUEUE = "in_queue"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(UUID(as_uuid=True), nullable=False)
    background_task_id = Column(UUID(as_uuid=True), nullable=False)
    status = Column(Enum(JobStatus), nullable=False, default=JobStatus.IN_QUEUE)
    started_at = Column(DateTime, nullable=False, default=datetime.now)
    completed_at = Column(DateTime, nullable=True)
    result_file = Column(BYTEA, nullable=True)

    def __repr__(self):
        return f"<Job(id={self.id}, session_id={self.session_id}, status={self.status}, started_at={self.started_at}, completed_at={self.completed_at})>"
