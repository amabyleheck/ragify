from pydantic import BaseModel

from schemas.global_form import FormSchema


class ExtractSchema(BaseModel):
    """
    Represents an extraction
    """

    form: FormSchema
    annotation: dict[
        str, dict[str, str]
    ]  # Typing of annotation for each variable for each file

    class Config:
        from_attributes = True
