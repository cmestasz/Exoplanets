const path = require('path');

module.exports = (env, originalConfig) => ({
  ...originalConfig,
  resolve: {
    ...originalConfig.resolve,
    alias: {
      ...(originalConfig.resolve.alias || {}),
      '@i18n': path.resolve(__dirname, 'src/i18n'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@mytypes': path.resolve(__dirname, 'src/types'),
      '@public': path.resolve(__dirname, 'public'),
    },
  },
});
