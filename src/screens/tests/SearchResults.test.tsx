import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {SearchResults} from '../SearchResults';
import {NativeBaseProvider} from 'native-base';
import {api} from '@/Api';
import {mockBookList, mockBookListApi} from './@mocks/mockBookList';
import {useNavigation} from '@react-navigation/native';

const inset = {
  frame: {x: 0, y: 0, width: 0, height: 0},
  insets: {top: 0, left: 0, right: 0, bottom: 0},
};

jest.mock('@/Api');
const mockedApi = api as jest.Mocked<typeof api>;

const mockApiResponse = {
  data: {
    docs: mockBookListApi,
  },
};

const navigation = useNavigation();

describe('SearchResults screen', () => {
  it('Renders error', async () => {
    const {findByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <SearchResults
          route={{params: {query: 'example'}}}
          navigation={navigation}
        />
      </NativeBaseProvider>,
    );

    expect(
      await findByText('A network error occurred. Please try again later.'),
    ).toBeTruthy();
  });
  it('Loading', async () => {
    mockedApi.get.mockResolvedValue(mockApiResponse);

    const {findByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <SearchResults
          route={{params: {query: 'example'}}}
          navigation={navigation}
        />
      </NativeBaseProvider>,
    );

    expect(await findByTestId('loading-spinner')).toBeTruthy();
  });
  it('Renders searchbar', async () => {
    mockedApi.get.mockResolvedValue(mockApiResponse);

    const {findByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <SearchResults
          route={{params: {query: 'Book'}}}
          navigation={navigation}
        />
      </NativeBaseProvider>,
    );

    const searchBar = await findByTestId('search-bar');
    fireEvent.changeText(searchBar, 'Book');
    fireEvent(searchBar, 'blur');

    expect(mockedApi.get).toHaveBeenCalledWith(
      'search.json?q=Book&limit=10&offset=0',
    );
  });
  it('Renders results', async () => {
    mockedApi.get.mockResolvedValue(mockApiResponse);

    const {getByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <SearchResults
          route={{params: {query: 'Book'}}}
          navigation={navigation}
        />
      </NativeBaseProvider>,
    );

    await waitFor(
      async () => {
        const book1 = getByText('Book 1');
        const book2 = getByText('Book 2');

        expect(book1).toBeTruthy();
        expect(book2).toBeTruthy();
      },
      {timeout: 2000},
    );
  });
  it('Navigates to BookDetails when book card is clicked', async () => {
    mockedApi.get.mockResolvedValue(mockApiResponse);

    const {getByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <SearchResults
          route={{params: {query: 'Book'}}}
          navigation={navigation}
        />
      </NativeBaseProvider>,
    );

    await waitFor(
      async () => {
        const book1 = getByTestId(mockBookList[0].key);
        fireEvent.press(book1);
      },
      {timeout: 2000},
    );

    expect(navigation.navigate).toBeCalledWith('BookDetails', {
      book: mockBookList[0],
    });
  });
});
