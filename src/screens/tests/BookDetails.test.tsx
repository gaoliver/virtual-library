import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {BookDetails} from '../BookDetails';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {store} from '@/Redux/store';
import {api} from '@/Api';

// Mock the useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

// Mock the navigation hook
jest.mock('@react-navigation/native-stack', () => ({
  ...jest.requireActual('@react-navigation/native-stack'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock the api module
jest.mock('@/Api');
const mockedApi = api as jest.Mocked<typeof api>;

const inset = {
  frame: {x: 0, y: 0, width: 0, height: 0},
  insets: {top: 0, left: 0, right: 0, bottom: 0},
};

describe('BookDetails screen', () => {
  const mockApiResponse = {
    data: {
      key: '1',
      title: 'Mock Book',
      author: 'Mock Author',
      cover: 'cover_url',
      publishYear: 2023,
      description: 'Mock description',
    },
  };

  it('Renders loading spinner while fetching book details', async () => {
    mockedApi.get.mockResolvedValue(mockApiResponse);

    const {findByTestId} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <BookDetails route={{params: {book: {key: '1'}}}} />
        </Provider>
      </NativeBaseProvider>,
    );

    const spinner = await findByTestId('loading-spinner');
    expect(spinner).toBeTruthy();
  });

  it('Renders book details after fetching', async () => {
    mockedApi.get.mockResolvedValue(mockApiResponse);

    const {findByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <BookDetails
            route={{
              params: {book: {...mockApiResponse.data, description: undefined}},
            }}
          />
        </Provider>
      </NativeBaseProvider>,
    );

    const bookTitle = await findByText('Mock Book');
    const authorName = await findByText('Mock Author');
    const publishYear = await findByText('2023');
    const description = await findByText('Mock description');

    expect(bookTitle).toBeTruthy();
    expect(authorName).toBeTruthy();
    expect(publishYear).toBeTruthy();
    expect(description).toBeTruthy();
  });

  it('Renders error message on API failure', async () => {
    mockedApi.get.mockRejectedValue(new Error('API Error'));

    const {findByText} = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Provider store={store}>
          <BookDetails route={{params: {book: {key: '1'}}}} />
        </Provider>
      </NativeBaseProvider>,
    );

    const errorMessage = await findByText(
      'An error occurred. Please try again later.',
    );
    expect(errorMessage).toBeTruthy();
  });
});