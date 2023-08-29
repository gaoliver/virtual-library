import {
  HStack,
  IPressableProps,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {colors} from '@/theme/colors';
import {BookProps} from '@/@types/models';
import {useDispatch} from 'react-redux';
import {actions} from '@/Redux/slices';
import {IconButton} from '@/components/atoms';
import {AddRemoveList} from '@/components/featured/AddRemoveList/AddRemoveList';
import {store} from '@/Redux/store';

export type BookCardProps = {
  book: BookProps;
} & IPressableProps;

export const BookCard: React.FC<BookCardProps> = ({book, ...props}) => {
  const {author, cover, publishYear, title} = book;
  const {favourites, readingList} = store.getState();

  const dispatch = useDispatch();

  const isFavourite = !!favourites?.find(item => item.key === book.key);
  const isOnReadingList = !!readingList?.find(item => item.key === book.key);

  const handleSaveFavourite = () => {
    dispatch(actions.saveFavourite(book));
  };

  const handleSaveReadlingList = () => {
    dispatch(actions.saveToReadingList(book));
  };

  return (
    <Pressable shadow="2" bgColor={'white'} borderRadius={10} {...props}>
      <HStack
        w="100%"
        bgColor={'white'}
        borderRadius={'10'}
        overflow={'hidden'}>
        <Image
          w={'100px'}
          h={'150px'}
          src={cover}
          alt={`${title} - book cover`}
        />

        <VStack p="3" flex={1}>
          <HStack alignItems={'center'}>
            <Text
              fontSize={'lg'}
              fontWeight={'semibold'}
              noOfLines={1}
              flex={1}>
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
            onPress={handleSaveReadlingList}
            mt={'auto'}
          />
        </VStack>
      </HStack>
    </Pressable>
  );
};
