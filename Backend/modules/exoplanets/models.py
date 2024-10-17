from pydantic import BaseModel


class Exoplanet(BaseModel):
    id: str
    name: str
    ra: float
    dec: float


class ExoplanetsRequest(BaseModel):
    name: str


class ExoplanetsResponse(BaseModel):
    exoplanets: list[Exoplanet]
