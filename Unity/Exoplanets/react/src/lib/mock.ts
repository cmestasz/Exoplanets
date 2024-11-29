import type { Exoplanet, Star } from '@mytypes/astros';

export const ProximaCentauri: Star = {
  id: 1,
  ext_id: 'dsasfsasg',
  name: 'Proxima Centauri',
  radius: 100000,
  imageUrl: 'https://example.com/images/proxima_centauri.jpg', // Image of the star
  luminosity: 0.0017, // Luminosity relative to Sun
};

export const Kepler_22: Star = {
  id: 2,
  name: 'Kepler-22',
  ext_id: 'gfkmgfgf',
  radius: 696342, // Radius in kilometers
  imageUrl: '/images/kepler.jpeg', // Image of the star
  luminosity: 0.79, // Luminosity relative to Sun
};

export const Kepler_21: Star = {
  id: 3,
  name: 'Kepler-21',
  ext_id: 'mgkpve',
  radius: 702000, // Radius in kilometers
  imageUrl: '/img/kepler.jpeg', // Image URL
  luminosity: 1.05, // Luminosity relative to Sun
};

export const Alpha_Centauri_A: Star = {
  id: 4,
  name: 'Alpha Centauri A',
  ext_id: 'fskmfdksmf',
  radius: 1234000, // Radius in kilometers
  imageUrl: 'https://example.com/images/alpha_centauri_a.jpg', // Image URL
  luminosity: 1.52, // Luminosity relative to Sun
};

export const Alpha_Centauri_B: Star = {
  id: 5,
  name: 'Alpha Centauri B',
  ext_id: 'mkldsmkfdsf',
  radius: 870000, // Radius in kilometers
  imageUrl: 'https://example.com/images/alpha_centauri_b.jpg', // Image URL
  luminosity: 0.5, // Luminosity relative to Sun
};

export const kepler22b: Exoplanet = {
  id: 1,
  name: 'Kepler-22b',
  mass: '1.14',
  radius: 12700, // Radius in kilometers
  imageUrl: '/img/kepler.jpeg', // Image URL
  disc_date: '1/2/1999',
};
export const proximaCentauriB: Exoplanet = {
  id: 2,
  name: 'Proxima Centauri b',
  mass: '1.17', // Mass relative to Earth
  radius: 11000, // Radius in kilometers
  imageUrl: '/img/proximaCentauri.jpeg', // Image URL
  disc_date: '1/3/2000',
};
