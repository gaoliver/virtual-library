/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppNavigationProp, RootStackParamList} from 'App';
import {Box, FlatList} from 'native-base';
import {BookCard, Header, SearchBar, Spinner, showToast} from '@/components';
import {spaces} from '@/constants/spaces';
import {BookProps, SearchResultsApi} from '@/@types/models';
import {api} from '@/Api';

type SearchResultsStackProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchResults'
>;

type SearchResultProps = SearchResultsStackProps & {
  navigation: AppNavigationProp;
};

const Loading = ({isLoading}: {isLoading: boolean}) => {
  if (isLoading) {
    return <Spinner my={4} testID="loading-spinner" />;
  }

  return null;
};

export const SearchResults: React.FC<SearchResultProps> = ({
  route,
  navigation,
}) => {
  const {query} = route.params;

  const [searchQuery, setSearchQuery] = useState(query);
  const [data, setData] = useState<BookProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const handlePressCard = (book: BookProps) => {
    navigation.navigate('BookDetails', {book});
  };

  const mapResponse = (response: SearchResultsApi['docs']): BookProps[] => {
    return response.map(book => ({
      key: book.key,
      title: book.title,
      author: book.author_name?.[0] || 'Unknown Author',
      cover: `${process.env.BOOK_COVER_URL}${book.cover_i}.jpg`,
      publishYear: book.first_publish_year || 'N/A',
    }));
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await api.get(
        `search.json?q=${encodeURIComponent(
          searchQuery,
        )}&limit=10&offset=${offset}`,
      );
      const result: SearchResultsApi = response.data;

      await new Promise(resolve => setTimeout(resolve, 1000));

      setData(prevData => [...prevData, ...mapResponse(result?.docs)]);
      setIsLoading(false);
    } catch (error) {
      showToast('A network error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  const handleNewSearch = () => {
    setData([]);
    setOffset(0);
  };

  return (
    <Box flex={1}>
      <Header hasGoBack testID="header">
        <SearchBar
          w={300}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onBlur={handleNewSearch}
          testID="search-bar"
        />
      </Header>

      <FlatList
        pt={1}
        px={spaces.screenWidth}
        data={data}
        onEndReached={() => {
          if (!isLoading && data.length) {
            setOffset(offset + 10);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<Loading isLoading={isLoading} />}
        renderItem={({item}) => (
          <BookCard
            my={1}
            book={item}
            onPress={() => handlePressCard(item)}
            testID={item.key}
          />
        )}
      />
    </Box>
  );
};
