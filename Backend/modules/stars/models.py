from pydantic import BaseModel


class Star(BaseModel):
    x: str
    y: str
    z: str
    name: str


class SurroundingsRequest(BaseModel):
    exoplanet_id: str

class NameRequest(BaseModel):
    exoplanet_name: str

class SurroundingsResponse(BaseModel):
    stars: list[Star]
