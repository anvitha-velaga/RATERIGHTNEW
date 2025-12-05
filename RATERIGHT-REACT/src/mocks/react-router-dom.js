const mockNavigate = jest.fn();

module.exports = {
  useNavigate: jest.fn(() => mockNavigate),
  __mockNavigate: mockNavigate,
};
