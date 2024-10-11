from .models import Exoplanet
import asyncio

EXOPLANET_ID = 1

async def find_exoplanets_by_name(name: str) -> list[Exoplanet]:
    global EXOPLANET_ID
    exoplanets = []
    for i in range(10):
        exoplanets.append(Exoplanet(
            id=EXOPLANET_ID,
            name=f"{name}_{i}"
        ))
        EXOPLANET_ID += 1

    await asyncio.sleep(0.3) # peticion a la api

    return exoplanets