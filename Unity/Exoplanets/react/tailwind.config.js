const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/styles/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    translate: {
      0: '0',
      1: '1',
      2: '2',
      4: '4',
      8: '8',
      10: '10',
    },
    stateDuration: {
      0: '0s',
      100: '0.1s',
      300: '0.3s',
      500: '0.5s',
      700: '0.7s',
      800: '0.8s',
      900: '0.9s',
      1000: '1s',
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        red: {
          DEFAULT: 'var(--red)',
          dark: 'var(--dark-red)',
        },
        green: {
          DEFAULT: 'var(--green)',
          dark: 'var(--dark-green)',
        },
      },
      animation: {
        'alert-in': 'alert-in .5s ease-in',
        'alert-out': 'alert-out .5s ease-out',
      },
      fontFamily: {
        orbitron: 'var(--font-orbitron)',
        audiowide: 'var(--font-audiowide)',
        exo: 'var(--font-exo)',
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'trans-x': (value) => ({
            '--trans-val-x': `${value}px`,
            translate: 'var(--trans-val-x) var(--trans-val-y)',
          }),
          'trans-y': (value) => ({
            '--trans-val-y': `${value}px`,
            translate: 'var(--trans-val-x) var(--trans-val-y)',
          }),
          trans: (value) => ({
            '--trans-val-x': `${value}px`,
            '--trans-val-y': `${value}px`,
            translate: 'var(--trans-val-x) var(--trans-val-y)',
          }),
        },
        {
          values: theme('translate'),
          supportsNegativeValues: true,
        },
      );
      matchUtilities(
        {
          'state-duration': (value) => ({
            'state-duration': value,
          }),
        },
        {
          values: theme('stateDuration'),
        },
      );
    }),
  ],
};
