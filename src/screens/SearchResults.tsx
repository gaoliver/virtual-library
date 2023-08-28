import {Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';
import {Box, FlatList, HStack, Icon} from 'native-base';
import {BookCard, SearchBar} from '@/components';
import {spaces} from '@/constants/spaces';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BookProps} from '@/@types/models';

const data = [
  {
    id: '1',
    author: 'C. S. Lewis',
    cover:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTNSyStf1DLYehyOLwoKXYpkqdKYVllekKBx9ZvBwY7mq7BAxIo-5Y4tMRiCOW_xCWX58&usqp=CAU',
    isFavourite: false,
    isOnReadingList: false,
    publishYear: 1960,
    title: 'As Crônicas de Nárnia',
  },
  {
    id: '2',
    author: 'C. S. Lewis',
    cover:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTNSyStf1DLYehyOLwoKXYpkqdKYVllekKBx9ZvBwY7mq7BAxIo-5Y4tMRiCOW_xCWX58&usqp=CAU',
    isFavourite: false,
    isOnReadingList: false,
    publishYear: 1960,
    title: 'As Crônicas de Nárnia',
  },
  {
    id: '3',
    author: 'C. S. Lewis',
    cover:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTNSyStf1DLYehyOLwoKXYpkqdKYVllekKBx9ZvBwY7mq7BAxIo-5Y4tMRiCOW_xCWX58&usqp=CAU',
    isFavourite: false,
    isOnReadingList: false,
    publishYear: 1960,
    title: 'As Crônicas de Nárnia',
  },
  {
    id: '4',
    author: 'C. S. Lewis',
    cover:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTNSyStf1DLYehyOLwoKXYpkqdKYVllekKBx9ZvBwY7mq7BAxIo-5Y4tMRiCOW_xCWX58&usqp=CAU',
    isFavourite: false,
    isOnReadingList: false,
    publishYear: 1960,
    title: 'As Crônicas de Nárnia',
  },
];

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

  const handlePressCard = (book: BookProps) => {
    navigation.navigate('BookDetails', {book});
  };

  useEffect(() => {
    setSearchQuery(query);
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
        />
      </HStack>

      <FlatList
        pt={'1'}
        px={spaces.screenWidth}
        data={data}
        renderItem={({item}) => (
          <BookCard
            my={'1'}
            key={item.id}
            cover={item.cover}
            title={item.title}
            author={item.author}
            publishYear={item.publishYear}
            isOnReadingList={item.isOnReadingList}
            isFavourite={item.isFavourite}
            onPress={() => handlePressCard({id: item.id})}
          />
        )}
      />
    </Box>
  );
};
