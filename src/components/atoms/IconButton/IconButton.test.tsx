import React from 'react';
import renderer from 'react-test-renderer';
import {it, expect, jest} from '@jest/globals'; // Correct import order
import {IconButton} from './IconButton';
import {NativeBaseProvider} from 'native-base';

it('IconButton renders correctly', () => {
  jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

  const mockOnPress = jest.fn();
  const tree = renderer
    .create(
      <NativeBaseProvider>
        <IconButton
          icon="check-circle"
          iconColor="green"
          onPress={mockOnPress}
          testID="iconButton"
        />
      </NativeBaseProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
