import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import TapArea from '../TapArea';

describe('TapArea Component', () => {
  let onPressMock;
  let getByText;

  beforeEach(() => {
    // Mock the onPress function before each test
    onPressMock = jest.fn();
    ({ getByText } = render(
      <TapArea onPress={onPressMock}>
        <Text>Test</Text>
      </TapArea>
    ));
  });

  test('should render correctly', () => {
    // Check if the text "Test" is rendered
    expect(getByText('Test')).toBeTruthy();
  });

  test('should call onPress when pressed', () => {
    // Simulate a press event and check if the mock function was called
    fireEvent.press(getByText('Test'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
