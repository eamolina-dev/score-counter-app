import React from 'react';
import { Text, TextInput } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import TapToModal from '../TapToModal';

describe('TapToModal Component', () => {
  let setIsVisibleMock;
  let onChangeTextMock;
  let onPressMock;
  let getByText;
  let getByPlaceholderText;
  let queryByText;

  beforeEach(() => {
    setIsVisibleMock = jest.fn();
    onChangeTextMock = jest.fn();
    onPressMock = jest.fn();

    ({ getByText, getByPlaceholderText, queryByText } = render(
      <TapToModal
        isVisible={false}
        setIsVisible={setIsVisibleMock}
        title="Enter Name"
        value=""
        onChangeText={onChangeTextMock}
        onPress={onPressMock}
      >
        <Text testID="open-modal-trigger">Open Modal</Text>
      </TapToModal>
    ));
  });

  test('should open the modal when TapArea is pressed', () => {
    fireEvent.press(getByText('Open Modal'));
    expect(setIsVisibleMock).toHaveBeenCalledWith(true);
  });

  test('should render the modal with title when visible', () => {
    const { queryByText } = render(
      <TapToModal isVisible={true} setIsVisible={setIsVisibleMock} title="Enter Name" />
    );

    expect(queryByText('Enter Name')).toBeTruthy();
  });

  test('should close the modal when tapping the backdrop', () => {
    const { getByText } = render(
      <TapToModal isVisible={true} setIsVisible={setIsVisibleMock} title="Enter Name" />
    );

    fireEvent.press(getByText('Enter Name').parent);
    expect(setIsVisibleMock).toHaveBeenCalledWith(false);
  });

  test('should call onChangeText when typing', () => {
    const { getByPlaceholderText } = render(
      <TapToModal isVisible={true} setIsVisible={setIsVisibleMock} onChangeText={onChangeTextMock} />
    );

    fireEvent.changeText(getByPlaceholderText(''), 'John Doe');
    expect(onChangeTextMock).toHaveBeenCalledWith('John Doe');
  });

  test('should call onPress when the confirm button is pressed', () => {
    const { getByText } = render(
      <TapToModal isVisible={true} setIsVisible={setIsVisibleMock} onPress={onPressMock} />
    );

    fireEvent.press(getByText('Confirm'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
