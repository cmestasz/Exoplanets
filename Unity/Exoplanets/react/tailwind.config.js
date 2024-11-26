const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/styles/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
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
    duration: {
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
      animation: {
        'spin-f': 'spin-fix 1.4s linear infinite',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        quaternary: 'var(--quaternary)',
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
      keyframes: {
        'spin-fix': {
          '0%': {
            rotate: '180deg',
          },
          '100%': {
            rotate: '-180deg',
          },
        },
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
          'm-duration': (value) => ({
            '--m-duration': value,
            motion: 'var(--m-duration) var(--m-delay) var(--m-timing-function)',
          }),
          'm-delay': (value) => ({
            '--m-delay': value,
            motion: 'var(--m-duration) var(--m-delay) var(--m-timing-function)',
          }),
        },
        {
          values: theme('duration'),
        },
      );
    }),
    plugin(({ addVariant }) => {
      addVariant('enter', '&:enter');
      addVariant('leave', '&:leave');
      addVariant('wsm', '@media (window-width >= 480)');
      addVariant('wmd', '@media (window-width >= 768)');
      addVariant('wlg', '@media (window-width >= 1024)');
      addVariant('wxl', '@media (window-width >= 1280)');
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.m-ease-out': {
          '--m-timing-function': 'ease-out',
          motion: 'var(--m-duration) var(--m-delay) var(--m-timing-function)',
        },
        '.m-ease-in': {
          '--m-timing-function': 'ease-in',
          motion: 'var(--m-duration) var(--m-delay) var(--m-timing-function)',
        },
        '.m-ease-in-out': {
          '--m-timing-function': 'ease-in-out',
          motion: 'var(--m-duration) var(--m-delay) var(--m-timing-function)',
        },
        ',m-ease-linear': {
          '--m-timing-function': 'linear',
          motion: 'var(--m-duration) var(--m-delay) var(--m-timing-function)',
        },
      });
    }),
  ],
};
