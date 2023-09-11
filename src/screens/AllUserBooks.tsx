import React from 'react';
import {Box, Center, FlatList, Text} from 'native-base';
import {BookCard, Header} from '@/components';
import {spaces} from '@/constants/spaces';
import {BookProps} from '@/@types/models';
import {useSelector} from 'react-redux';
import {AppState} from '@/Redux/slices';
import {AppNavigationProp} from 'App';

interface AllUserBooksProps {
  navigation: AppNavigationProp;
}

export const AllUserBooks: React.FC<AllUserBooksProps> = ({navigation}) => {
  const favouriteBooks = useSelector((state: AppState) => state.favourites);
  const readingListBooks = useSelector((state: AppState) => state.readingList);

  const userBooks = [...favouriteBooks, ...readingListBooks];

  const userBookList = userBooks.reduce(
    (_prev, curr) => {
      if (!_prev.find(item => item.key === curr.key)) {
        _prev.push(curr);
      }

      return _prev;
    },
    [userBooks[0]],
  );

  const handlePressCard = (book: BookProps) => {
    navigation.navigate('BookDetails', {book});
  };

  return (
    <Box flex={1}>
      <Header title="My Books" />

      {!userBooks.length ? (
        <Center pt={4}>
          <Text>No book saved yet.</Text>
        </Center>
      ) : (
        <FlatList
          pt={1}
          px={spaces.screenWidth}
          data={userBookList}
          renderItem={({item}) => (
            <BookCard
              my={1}
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
