from pydantic import BaseModel


class Star(BaseModel):
    x: float
    y: float
    z: float
    name: str


class SurroundingsRequest(BaseModel):
    exoplanet_id: str

class NameRequest(BaseModel):
    exoplanet_name: str

class SurroundingsResponse(BaseModel):
    stars: list[Star]
