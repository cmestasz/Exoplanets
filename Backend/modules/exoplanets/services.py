import astropy.table
from .models import Exoplanet
from astroquery.gaia import Gaia
from astropy.coordinates import SkyCoord
from astropy import units as u
import pyvo as vo
import matplotlib.pyplot as plt

client = vo.dal.TAPService("https://exoplanetarchive.ipac.caltech.edu/TAP")


async def find_exoplanets_by_name(name: str) -> list[Exoplanet]:
    global client
    query = f"SELECT * FROM ps WHERE pl_name LIKE '%{name}%'"
    result = client.search(query)

    a_table: astropy.table = result.to_table()
    subtable = a_table["hostname", "pl_name", "ra", "dec"]

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

    star_coords = SkyCoord(ra=results["ra"] * u.deg, dec=results["dec"] * u.deg, frame='icrs')
    sep = coord.separation(star_coords)

    plt.figure(figsize=(8, 8))
    plt.scatter((results['ra'] - ra) * 3600, (results['dec'] - dec) * 3600, color='blue', label='Stars')  # Converted to arcseconds
    plt.scatter(0, 0, color='red', label='Reference Position')
    plt.xlabel('RA Offset (arcseconds)')
    plt.ylabel('Dec Offset (arcseconds)')
    plt.title('Relative Star Positions')
    plt.legend()
    plt.grid(True)
    plt.show()

    print(subtable)
    print(results)
    return exoplanets
