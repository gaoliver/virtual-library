/* eslint-disable react-hooks/exhaustive-deps */
import {Pressable} from 'react-native';
import React, {useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppNavigationProp, RootStackParamList} from 'App';
import {Box, FlatList, HStack, Icon, Spinner} from 'native-base';
import {BookCard, SearchBar} from '@/components';
import {spaces} from '@/constants/spaces';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BookProps, SearchResultsApi} from '@/@types/models';

type SearchResultsStackProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchResults'
>;

type SearchResultProps = SearchResultsStackProps & {
  navigation: AppNavigationProp;
};

const Loading = ({isLoading}: {isLoading: boolean}) => {
  if (isLoading) {
    return <Spinner my={4} />;
  }

  return <></>;
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
      author: book.author_name?.[0],
      cover: `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`,
      publishYear: book.first_publish_year,
      isFavourite: false,
      isOnReadingList: false,
    }));
  };

  useMemo(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          searchQuery,
        )}&limit=10&offset=${offset}`,
      );
      const result: SearchResultsApi = await response.json();

      await new Promise(resolve => setTimeout(resolve, 1000));

      setData(prevData => [...prevData, ...mapResponse(result?.docs)]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }, [offset]);

  const handleNewSearch = () => {
    setData([]);
    setOffset(0);
  };

  return (
    <Box flex={1}>
      <HStack
        safeAreaTop
        bgColor={'secondary'}
        pb={'2'}
        px={spaces.screenWidth}
        w="100%"
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Pressable>
          <Icon
            size={'6'}
            color="white"
            as={<MaterialIcons name="arrow-back" />}
          />
        </Pressable>
        <SearchBar
          w={'300px'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onBlur={handleNewSearch}
        />
      </HStack>

      <FlatList
        pt={'1'}
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
            my={'1'}
            book={item}
            onPress={() => handlePressCard(item)}
          />
        )}
      />
    </Box>
  );
};
