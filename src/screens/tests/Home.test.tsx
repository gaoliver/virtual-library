import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Home} from '../Home';
import {NativeBaseProvider} from 'native-base';

const navigation = {
  navigate: jest.fn(),
};

const inset = {
  frame: {x: 0, y: 0, width: 0, height: 0},
  insets: {top: 0, left: 0, right: 0, bottom: 0},
};

describe('Home Screen', () => {
  it('renders correctly', () => {
    const {toJSON} = render(
      <NativeBaseProvider>
        <Home navigation={navigation} />
      </NativeBaseProvider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('navigates to SearchResults on search', () => {
    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Home navigation={navigation} />
      </NativeBaseProvider>,
    );
    const searchInput = getByTestId('searchbar');
    fireEvent.changeText(searchInput, 'Search Query');
    fireEvent(searchInput, 'blur');

    expect(navigation.navigate).toHaveBeenCalledWith('SearchResults', {
      query: 'Search Query',
    });
  });
});
