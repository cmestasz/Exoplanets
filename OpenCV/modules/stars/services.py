import random
from .models import Star
import asyncio

MIN_DIST = 250
MAX_DIST = 500


def random_in_range(min, max, allow_negs=True) -> int:
    return random.randint(min, max) * (random.choice([-1, 1]) if allow_negs else 1)


async def generate_random_stars(exoplanet_id) -> list[Star]:
    sector = []
    for i in range(5):
        sector.append(Star(
            x=random_in_range(MIN_DIST, MAX_DIST),
            y=random_in_range(MIN_DIST, MAX_DIST),
            z=random_in_range(MIN_DIST, MAX_DIST),
            scale=random_in_range(25, 60, False),
            name=f"S{i}_{exoplanet_id}",
        ))

    await asyncio.sleep(0.3) # peticion a la api

    return sector
