import React from 'react';
import {Box, Center, FlatList, Text} from 'native-base';
import {BookCard, Header} from '@/components';
import {spaces} from '@/constants/spaces';
import {BookProps} from '@/@types/models';
import {useSelector} from 'react-redux';
import {AppState} from '@/Redux/slices';
import {AppNavigationProp} from 'App';

export const ReadingList = ({navigation}: {navigation: AppNavigationProp}) => {
  const readingList = useSelector((state: AppState) => state.readingList);

  const handlePressCard = (book: BookProps) => {
    navigation.navigate('BookDetails', {book});
  };

  return (
    <Box flex={1}>
      <Header title="Reading List" />

      {!readingList.length ? (
        <Center pt={4}>
          <Text>No book saved yet.</Text>
        </Center>
      ) : (
        <FlatList
          pt={'1'}
          px={spaces.screenWidth}
          data={readingList}
          renderItem={({item}) => (
            <BookCard
              my={'1'}
              book={item}
              onPress={() => handlePressCard(item)}
              testID={item.key}
            />
          )}
        />
      )}
    </Box>
  );
};
