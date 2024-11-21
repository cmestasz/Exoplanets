export const routes = [
  { route: 'account', icon: 'person', auth: true },
  { route: 'constellations', icon: 'star', auth: true },
  { route: 'options', icon: 'settings', auth: false },
  { route: 'about', icon: 'info', auth: false },
  { route: 'help', icon: 'help', auth: false },
] as const;

export type ProfileRoutes = typeof routes[number]['route'];
