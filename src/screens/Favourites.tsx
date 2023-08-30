import React from 'react';
import {Box, Center, FlatList, Text} from 'native-base';
import {BookCard, Header} from '@/components';
import {spaces} from '@/constants/spaces';
import {BookProps} from '@/@types/models';
import {useSelector} from 'react-redux';
import {AppState} from '@/Redux/slices';
import {AppNavigationProp} from 'App';

interface FavouritesProps {
  navigation: AppNavigationProp;
}

export const Favourites: React.FC<FavouritesProps> = ({navigation}) => {
  const favourites = useSelector((state: AppState) => state.favourites);

  const handlePressCard = (book: BookProps) => {
    navigation.navigate('BookDetails', {book});
  };

  return (
    <Box flex={1}>
      <Header title="Favourites" />

      {!favourites.length ? (
        <Center pt={4}>
          <Text>No favourite yet.</Text>
        </Center>
      ) : (
        <FlatList
          pt={1}
          px={spaces.screenWidth}
          data={favourites}
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
