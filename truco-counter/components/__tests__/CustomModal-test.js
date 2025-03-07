import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import CustomModal from '../CustomModal';

describe('CustomModal Component', () => {
  let setIsVisibleMock;
  let getByText;
  let queryByTestId;

  beforeEach(() => {
    // Mock the setIsVisible function before each test
    setIsVisibleMock = jest.fn();
    ({ getByText, queryByTestId } = render(
      <CustomModal isVisible={true} setIsVisible={setIsVisibleMock}>
        <Text testID="modal-content">Modal Content</Text>
      </CustomModal>
    ));
  });

  test('should render when isVisible is true', () => {
    // Check if the modal content is rendered when isVisible is true
    expect(queryByTestId('modal-content')).toBeTruthy();
  });

  test('should not render when isVisible is false', () => {
    // Render the modal with isVisible set to false and check that the content is not rendered
    const { queryByTestId } = render(
      <CustomModal isVisible={false} setIsVisible={setIsVisibleMock}>
        <Text testID="modal-content">Modal Content</Text>
      </CustomModal>
    );

    expect(queryByTestId('modal-content')).toBeNull();
  });

  test('should close the modal when the backdrop is pressed (onBackdropPress)', () => {
    // Simulate a press on the backdrop and check if setIsVisible is called with false
    fireEvent.press(getByText('Modal Content').parent);
    expect(setIsVisibleMock).toHaveBeenCalledWith(false);
  });
});
