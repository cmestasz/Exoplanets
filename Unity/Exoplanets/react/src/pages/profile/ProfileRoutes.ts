export const routes = [
  { route: 'account', icon: 'person' },
  { route: 'constellations', icon: 'star' },
  { route: 'options', icon: 'settings' },
  { route: 'about', icon: 'info' },
  { route: 'help', icon: 'help' },
] as const;

export type ProfileRoutes = typeof routes[number]['route'];
