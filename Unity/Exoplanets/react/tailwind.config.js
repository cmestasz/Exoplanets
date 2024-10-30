const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/styles/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    translate: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
      10: '10px',
      full: '100%',
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
            '--trans-val-x': value,
            translate: 'var(--trans-val-x) var(--trans-val-y)',
          }),
          'trans-y': (value) => ({
            '--trans-val-y': value,
            translate: 'var(--trans-val-x) var(--trans-val-y)',
          }),
          trans: (value) => ({
            '--trans-val-x': value,
            '--trans-val-y': value,
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
    plugin(({ addVariant }) => {
      addVariant('enter', '&:enter');
      addVariant('leave', '&:leave');
    }),
  ],
};
