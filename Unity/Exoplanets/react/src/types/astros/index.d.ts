interface Astro {
  id: number;
  name: string;
  radius: number; // Ratio relative to Sun
  imageUrl: string; // Not in DB
}

interface Exoplanet extends Astro {
  disc_date: string;
  mass: string;
}

interface Star extends Astro {
  ext_id: string;
  luminosity: number;
}

interface Constellation {
  id: number;
  name: string;
}

export {
  Astro, Exoplanet, Star, Constellation,
};
