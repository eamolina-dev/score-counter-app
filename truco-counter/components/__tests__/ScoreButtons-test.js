import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ScoreButtons from '../ScoreButtons';

describe('ScoreButtons Component', () => {
  let onPressPlusMock, onPressMinusMock, getByTestId;

  beforeEach(() => {
    onPressPlusMock = jest.fn();
    onPressMinusMock = jest.fn();
    ({ getByTestId } = render(
      <ScoreButtons onPressPlus={onPressPlusMock} onPressMinus={onPressMinusMock} />
    ));
  });

  test('should render two buttons with plus and minus icons', () => {
    const plusButton = getByTestId('plus-button');
    const minusButton = getByTestId('minus-button');
    
    // Check if the buttons exist
    expect(plusButton).toBeTruthy();
    expect(minusButton).toBeTruthy();
  });

  test('should call onPressPlus when the plus button is pressed', () => {
    const plusButton = getByTestId('plus-button');
    fireEvent.press(plusButton);
    expect(onPressPlusMock).toHaveBeenCalledTimes(1);
  });

  test('should call onPressMinus when the minus button is pressed', () => {
    const minusButton = getByTestId('minus-button');
    fireEvent.press(minusButton);
    expect(onPressMinusMock).toHaveBeenCalledTimes(1);
  });
});
