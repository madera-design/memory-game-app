module.exports = {
    testEnvironment: 'jsdom', // Para pruebas en un entorno de navegador simulado
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Extiende expect con métodos de testing-library
    moduleNameMapper: {
      '\\.(css|jpg|png)$': 'identity-obj-proxy', // Mocks para archivos CSS e imágenes
    },
  };