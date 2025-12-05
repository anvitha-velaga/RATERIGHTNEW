const mockNavigate = jest.fn();
const useNavigate = jest.fn(() => mockNavigate);

module.exports = {
  useNavigate,
  Link: ({ children }) => children,
  __mockNavigate: mockNavigate,
};
