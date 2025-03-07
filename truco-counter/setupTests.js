import { jest } from '@jest/globals';

// Mocking FontAwesome and the Font module
jest.mock('@expo/vector-icons/FontAwesome', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => null),
  };
});

jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true, {}]),
}));
