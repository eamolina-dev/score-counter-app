import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Team from '../Team';

describe('Team Component', () => {
  test('should display the correct team name', () => {
    const { getByText } = render(
      <Team name="Team A" onChangeName={() => {}} />
    );
    
    // Check if the correct team name is displayed
    expect(getByText('Team A')).toBeTruthy();
  });

  test('should call onChangeName when tapped', () => {
    const mockOnChangeName = jest.fn();
    const { getByText } = render(
      <Team name="Team A" onChangeName={mockOnChangeName} />
    );
    
    // Simulate a press on the component
    fireEvent.press(getByText('Team A'));
    
    // Ensure the onChangeName function is called
    expect(mockOnChangeName).toHaveBeenCalledTimes(1);
  });
});
