interface Coords {
  ra: number;
  dec: number;
  dist: number;
}

interface Astro {
  id: string;
  name: string;
  radius: number; // Ratio relative to Sun
}

type Exoplanet = Astro & Coords & {
  host_star: string;
  stars_amount: number;
  discovery_year: string;
};

interface Star extends Astro {
  ext_id: string;
  luminosity: number;
}

type Constellation = {
  id: number;
  name: string;
} & Coords;

export {
  Astro, Exoplanet, Star, Constellation,
};
