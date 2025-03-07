import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../Header';

describe('Header Component', () => {
  let onPressPointsMock;
  let getByText;

  beforeEach(() => {
    onPressPointsMock = jest.fn();
    ({ getByText } = render(
      <Header points={10} onPressPoints={onPressPointsMock} />
    ));
  });

  test('should render the points correctly', () => {
    expect(getByText('10')).toBeTruthy();
  });

  test('should call onPressPoints when the tap area is pressed', () => {
    fireEvent.press(getByText('10'));
    expect(onPressPointsMock).toHaveBeenCalledTimes(1);
  });
});
