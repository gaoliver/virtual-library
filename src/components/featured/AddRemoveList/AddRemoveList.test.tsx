import React from 'react';
import renderer from 'react-test-renderer';
import {AddRemoveList} from './AddRemoveList';
import {NativeBaseProvider} from 'native-base';

it('AddRemoveList renders correctly', () => {
  const tree = renderer
    .create(
      <NativeBaseProvider>
        <AddRemoveList
          onPress={() => {}}
          isOnReadingList={true}
          testID="addRemoveButton"
        />
      </NativeBaseProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
