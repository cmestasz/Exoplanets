from pydantic import BaseModel


class Exoplanet(BaseModel):
    id: str
    name: str


class ExoplanetsRequest(BaseModel):
    id: str


class ExoplanetsResponse(BaseModel):
    exoplanets: list[Exoplanet]
