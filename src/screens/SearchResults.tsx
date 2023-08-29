/* eslint-disable react-hooks/exhaustive-deps */
import {Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';
import {Box, FlatList, HStack, Icon} from 'native-base';
import {BookCard, SearchBar} from '@/components';
import {spaces} from '@/constants/spaces';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BookProps, SearchResultsApi} from '@/@types/models';

type SearchResultsProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchResults'
>;

export const SearchResults: React.FC<SearchResultsProps> = ({
  navigation,
  route,
}) => {
  const {query} = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<BookProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePressCard = (book: BookProps) => {
    navigation.navigate('BookDetails', {book});
  };

  const mapResponse = (response: SearchResultsApi['docs']) => {
    const mappedList: BookProps[] = response.map(book => ({
      key: book.key,
      title: book.title,
      author: book.author_name?.[0],
      cover: `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`,
      publishYear: book.first_publish_year,
      isFavourite: false,
      isOnReadingList: false,
    }));

    setData(mappedList);
    setIsLoading(false);
  };

  const fetchResults = () => {
    setIsLoading(true);

    fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(
        searchQuery,
      )}&limit=5`,
    )
      .then(response => response.json())
      .then(result => {
        mapResponse(result?.docs);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setSearchQuery(query);
    fetchResults();
  }, [query]);

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
          onBlur={fetchResults}
        />
      </HStack>

      {!isLoading && (
        <FlatList
          pt={'1'}
          px={spaces.screenWidth}
          data={data}
          renderItem={({item}) => (
            <BookCard
              my={'1'}
              key={item.key}
              cover={item.cover}
              title={item.title}
              author={item.author}
              publishYear={item.publishYear}
              isOnReadingList={item.isOnReadingList}
              isFavourite={item.isFavourite}
              onPress={() => handlePressCard(item)}
            />
          )}
        />
      )}
    </Box>
  );
};
