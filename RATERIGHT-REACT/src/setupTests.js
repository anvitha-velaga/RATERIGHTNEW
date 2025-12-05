import '@testing-library/jest-dom';

const _originalConsoleError = console.error;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    try {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('Network error')) {
        return;
      }
    } catch (e) {
    }
    _originalConsoleError(...args);
  });
});

afterAll(() => {
  if (console.error && console.error.mockRestore) console.error.mockRestore();
});
