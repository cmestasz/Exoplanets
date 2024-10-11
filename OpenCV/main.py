from fastapi import FastAPI, UploadFile
from .modules.stars.services import generate_random_stars
from .modules.stars.models import SurroundingsRequest, SurroundingsResponse
from .modules.exoplanets.services import find_exoplanets_by_name
from .modules.exoplanets.models import ExoplanetsRequest, ExoplanetsResponse
from .modules.input.models import InputResponse
from .modules.input.services import process_input

app = FastAPI()


@app.post("/load_surroundings")
async def load_surroundings(request: SurroundingsRequest) -> SurroundingsResponse:
    stars = await generate_random_stars(request.exoplanet_id)
    return SurroundingsResponse(stars=stars)


@app.post("/get_exoplanets_by_name")
async def get_exoplanets_by_name(request: ExoplanetsRequest) -> ExoplanetsResponse:
    exoplanets = await find_exoplanets_by_name(request.id)
    return ExoplanetsResponse(exoplanets=exoplanets)


@app.post("/get_action_by_image")
async def get_action_by_image(file: UploadFile) -> InputResponse:
    action = await process_input(file)
    return InputResponse(action=action)