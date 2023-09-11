import {HStack, IPressableProps, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {colors} from '@/theme/colors';
import {BookProps} from '@/@types/models';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, actions} from '@/Redux/slices';
import {IconButton} from '@/components/atoms';
import {AddRemoveList} from '@/components/featured/AddRemoveList/AddRemoveList';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';

export type BookCardProps = {
  book: BookProps;
} & IPressableProps;

export const BookCard: React.FC<BookCardProps> = ({book, ...props}) => {
  const {author, cover, publishYear, title} = book;
  const favourites = useSelector((state: AppState) => state.favourites);
  const readingList = useSelector((state: AppState) => state.readingList);
  const dispatch = useDispatch();

  const isFavourite = favourites?.some(item => item.key === book.key);
  const isOnReadingList = readingList?.some(item => item.key === book.key);

  const handleSaveFavourite = () => {
    dispatch(actions.saveFavourite(book));
  };

  const handleSaveReadingList = () => {
    dispatch(actions.saveToReadingList(book));
  };

  return (
    <Pressable shadow={2} bgColor="white" borderRadius={10} {...props}>
      <HStack w="100%" bgColor="white" borderRadius={10} overflow="hidden">
        <FastImage source={{uri: cover}} style={styles.image} />

        <VStack p={3} flex={1}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontSize="lg" fontWeight="semibold" noOfLines={1} flex={1}>
              {title}
            </Text>
            <IconButton
              icon={isFavourite ? 'heart' : 'heart-outline'}
              iconColor={isFavourite ? colors.warning : colors.black}
              onPress={handleSaveFavourite}
            />
          </HStack>
          <Text>{author}</Text>
          <Text>{publishYear}</Text>

          <AddRemoveList
            isOnReadingList={isOnReadingList}
            onPress={handleSaveReadingList}
            mt="auto"
          />
        </VStack>
      </HStack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 150,
  },
});
