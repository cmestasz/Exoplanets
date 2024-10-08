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


class Surrounding(BaseModel):
    space_things: list[SpaceThing]


class SurroundingsRequest(BaseModel):
    exoplanet_x: int
    exoplanet_y: int
    exoplanet_z: int


class SurroundingsResponse(BaseModel):
    space_things: list[SpaceThing]


surroundings: dict[str, list[SpaceThing]] = {}


def generate_random_surroundings(exoplanet_id) -> list[SpaceThing]:
    sector = []
    for i in range(1):
        sector.append(SpaceThing(
            x=random.randint(-100, 100),
            y=random.randint(-100, 100),
            z=random.randint(-100, 100),
            type="planet",
            name=f"P{i}_{exoplanet_id}",
        ))
    for i in range(10):
        sector.append(SpaceThing(
            x=random.randint(-100, 100),
            y=random.randint(-100, 100),
            z=random.randint(-100, 100),
            type="star",
            name=f"S{i}_{exoplanet_id}",
        ))
    return sector


def id_from_exoplanet_coords(x, y, z) -> str:
    return f"{x}_{y}_{z}"

@app.post("/load_surroundings")
def load_surroundings(request: SurroundingsRequest) -> SurroundingsResponse:
    surroundings_id = id_from_exoplanet_coords(request.exoplanet_x, request.exoplanet_y, request.exoplanet_z)
    if surroundings_id not in surroundings:
        surroundings[surroundings_id] = generate_random_surroundings(surroundings_id)
    return SurroundingsResponse(space_things=surroundings[surroundings_id])
