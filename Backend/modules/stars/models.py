from pydantic import BaseModel


class Star(BaseModel):
    x: int
    y: int
    z: int
    scale: int
    name: str


class SurroundingsRequest(BaseModel):
    exoplanet_id: str

class NameRequest(BaseModel):
    exoplanet_name: str

class SurroundingsResponse(BaseModel):
    stars: list[Star]
