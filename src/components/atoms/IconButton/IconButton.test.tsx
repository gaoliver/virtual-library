import React from 'react';
import renderer from 'react-test-renderer';
import {it, jest, expect} from '@jest/globals';
import {IconButton} from './IconButton';

it('IconButton renders correctly', () => {
  const mockOnPress = jest.fn();
  const tree = renderer
    .create(
      <IconButton
        icon="check-circle"
        iconColor="green"
        onPress={mockOnPress}
        testID="iconButton"
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
