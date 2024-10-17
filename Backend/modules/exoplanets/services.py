import astropy.table
from .models import Exoplanet
from astroquery.gaia import Gaia
from astropy.coordinates import SkyCoord
from astropy import units as u
import pyvo as vo

client = vo.dal.TAPService("https://exoplanetarchive.ipac.caltech.edu/TAP")


async def find_exoplanets_by_name(name: str) -> list[Exoplanet]:
    global client
    query = f"SELECT * FROM ps WHERE pl_name LIKE '%{name}%'"
    result = client.search(query)

    a_table: astropy.table = result.to_table()

    exoplanets = []
    for row in a_table:
        exoplanets.append(Exoplanet(
            id=row["hostname"], name=row["pl_name"], ra=row["ra"], dec=row["dec"]))

    ra, dec = exoplanets[0].ra, exoplanets[0].dec
    coord = SkyCoord(ra=ra * u.deg, dec=dec * u.deg, frame='icrs')

    radius = 0.1 * u.deg
    query = f'''
SELECT TOP 10
    source_id, ra, dec, parallax, pmra, pmdec
FROM gaiadr3.gaia_source
WHERE CONTAINS(POINT('ICRS', ra, dec), CIRCLE('ICRS', {ra}, {dec}, {radius.to(u.deg).value})) = 1
'''

    job = Gaia.launch_job_async(query)
    results = job.get_results()

    print(results)
    return exoplanets
