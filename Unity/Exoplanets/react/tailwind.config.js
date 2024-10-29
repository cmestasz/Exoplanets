module.exports = {
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/styles/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
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
  plugins: [],
};
