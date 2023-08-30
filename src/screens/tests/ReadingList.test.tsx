/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider, useSelector} from 'react-redux';
import {store} from '@/Redux/store';
import {NativeBaseProvider} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {mockBookList} from './@mocks/mockBookList';
import {AppNavigationProp} from 'App';
import {ReadingList} from '../ReadingList';

const inset = {
  frame: {x: 0, y: 0, width: 0, height: 0},
  insets: {top: 0, left: 0, right: 0, bottom: 0},
};

const navigation = useNavigation<AppNavigationProp>();

describe('Reading List screen', () => {
  it('Renders empty state screen', () => {
    useSelector.mockReturnValue([]);

    const {findByText} = render(
      <Provider store={store}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <ReadingList navigation={navigation} />
        </NativeBaseProvider>
      </Provider>,
    );

    expect(findByText('No book saved yet.')).toBeTruthy();
  });

  it('Renders book cards when exist', () => {
    useSelector.mockReturnValue(mockBookList);

    const {getByText} = render(
      <Provider store={store}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <ReadingList navigation={navigation} />
        </NativeBaseProvider>
      </Provider>,
    );

    expect(getByText('Book 1')).toBeTruthy();
    expect(getByText('Book 2')).toBeTruthy();
  });

  it('Navigates to BookDetails screen when a book card is pressed', () => {
    useSelector.mockReturnValue(mockBookList);

    const {getByTestId} = render(
      <Provider store={store}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <ReadingList navigation={navigation} />
        </NativeBaseProvider>
      </Provider>,
    );

    const bookCard = getByTestId(mockBookList[0].key);
    fireEvent.press(bookCard);

    expect(navigation.navigate).toHaveBeenCalledWith('BookDetails', {
      book: mockBookList[0],
    });
  });
});
