from fastapi import FastAPI, Request, Response
import random
from pydantic import BaseModel

app = FastAPI()


class SpaceThing(BaseModel):
    x: int
    y: int
    z: int
    type: str
    name: str


class Sector(BaseModel):
    space_things: list[SpaceThing]


class SectorRequest(BaseModel):
    sector_x: int
    sector_y: int
    sector_z: int


class SectorResponse(BaseModel):
    space_things: list[SpaceThing]


sectors: dict[str, list[SpaceThing]] = {}


def generate_random_sector(sector_id) -> list[SpaceThing]:
    sector = []
    for i in range(1):
        sector.append(SpaceThing(
            x=random.randint(-100, 100),
            y=random.randint(-100, 100),
            z=random.randint(-100, 100),
            type="planet",
            name=f"P{i}_{sector_id}",
        ))
    for i in range(10):
        sector.append(SpaceThing(
            x=random.randint(-100, 100),
            y=random.randint(-100, 100),
            z=random.randint(-100, 100),
            type="star",
            name=f"S{i}_{sector_id}",
        ))
    return sector


def id_from_sector_coords(x, y, z) -> str:
    return f"{x}_{y}_{z}"

@app.post("/load_sector")
def load_sector(request: SectorRequest) -> SectorResponse:
    sector_id = id_from_sector_coords(request.sector_x, request.sector_y, request.sector_z)
    if sector_id not in sectors:
        sectors[sector_id] = generate_random_sector(sector_id)
    return SectorResponse(space_things=sectors[sector_id])
