import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {SearchResults} from '../SearchResults';
import {NativeBaseProvider} from 'native-base';
import {api} from '@/Api';

const inset = {
  frame: {x: 0, y: 0, width: 0, height: 0},
  insets: {top: 0, left: 0, right: 0, bottom: 0},
};

// Mock the api module
jest.mock('@/Api');
const mockedApi = api as jest.Mocked<typeof api>;

const mockApiResponse = {
  data: {
    docs: [
      {
        key: '1',
        title: 'Book 1',
        author_name: ['Author 1'],
        cover_i: 1,
        first_publish_year: 1998,
      },
      {
        key: '2',
        title: 'Book 2',
        author_name: ['Author 2'],
        cover_i: 2,
        first_publish_year: 2002,
      },
    ],
  },
};

describe('SearchResults', () => {
  it('Renders error', async () => {
    const {findByText, findByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <SearchResults
          route={{params: {query: 'example'}}}
          navigation={{navigate: jest.fn()}}
        />
      </NativeBaseProvider>,
    );

    const searchBar = await findByTestId('search-bar');
    fireEvent.changeText(searchBar, 'example');

    fireEvent(searchBar, 'blur');

    expect(mockedApi.get).toHaveBeenCalledWith(
      'search.json?q=example&limit=10&offset=0',
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
          navigation={{navigate: jest.fn()}}
        />
      </NativeBaseProvider>,
    );

    const searchBar = await findByTestId('search-bar');
    fireEvent.changeText(searchBar, 'example');

    fireEvent(searchBar, 'blur');

    expect(mockedApi.get).toHaveBeenCalledWith(
      'search.json?q=example&limit=10&offset=0',
    );

    expect(await findByTestId('loading-spinner')).toBeTruthy();
  });
  it('Renders result', async () => {
    mockedApi.get.mockResolvedValue(mockApiResponse);

    const {findByText, findByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <SearchResults
          route={{params: {query: 'Book'}}}
          navigation={{navigate: jest.fn()}}
        />
      </NativeBaseProvider>,
    );

    const searchBar = await findByTestId('search-bar');
    fireEvent.changeText(searchBar, 'Book');

    fireEvent(searchBar, 'blur');

    expect(mockedApi.get).toHaveBeenCalledWith(
      'search.json?q=Book&limit=10&offset=0',
    );

    await waitFor(
      async () => {
        expect(await findByText('Book 1')).toBeTruthy();
        expect(await findByText('Book 2')).toBeTruthy();
      },
      {timeout: 2000},
    );
  });
});
