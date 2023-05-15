const path = require('path');

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Login', // Página que você deseja definir como tela inicial
        permanent: true,
      },
    ];
  },
};
