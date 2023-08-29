import React from 'react';
import {RootBottomParamList} from 'App';
import {Box, Center, FlatList, Text} from 'native-base';
import {BookCard, Header} from '@/components';
import {spaces} from '@/constants/spaces';
import {BookProps} from '@/@types/models';
import {useSelector} from 'react-redux';
import {AppState} from '@/Redux/slices';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<
  RootBottomParamList,
  'Favourites'
>;

export const Favourites = ({navigation}: {navigation: NavigationProps}) => {
  const favourites = useSelector((state: AppState) => state.favourites);

  const handlePressCard = (book: BookProps) => {
    navigation.navigate('SearchNavigator', {
      screen: 'BookDetails',
      params: {book},
    });
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
          pt={'1'}
          px={spaces.screenWidth}
          data={favourites}
          renderItem={({item}) => (
            <BookCard
              my={'1'}
              book={item}
              onPress={() => handlePressCard(item)}
            />
          )}
        />
      )}
    </Box>
  );
};
