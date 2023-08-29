/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  ScrollView,
  Spinner,
  StatusBar,
  Text,
} from 'native-base';
import {Header, IconButton} from '@/components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList} from 'App';
import {spaces} from '@/constants/spaces';
import LinearGradient from 'react-native-linear-gradient';
import {BookPropsApi} from '@/@types/models';
import {colors} from '@/theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {AppState, actions} from '@/Redux/slices';
import {AddRemoveList} from '@/components/featured/AddRemoveList';

type BookDetailsProps = NativeStackScreenProps<
  RootMainStackParamList,
  'BookDetails'
>;

export const BookDetails: React.FC<BookDetailsProps> = ({route}) => {
  const {book} = route.params;
  const {favourites, readingList} = useSelector((state: AppState) => state);

  const [bookDescription, setBookDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const isFavourite = !!favourites?.find(item => item.key === book.key);
  const isOnReadingList = !!readingList?.find(item => item.key === book.key);

  const handleSaveFavourite = () => {
    dispatch(actions.saveFavourite(book));
  };

  const handleSaveReadlingList = () => {
    dispatch(actions.saveToReadingList(book));
  };

  useMemo(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`https://openlibrary.org${book.key}.json`);
      const result: BookPropsApi = await response.json();

      if (result.description) {
        setBookDescription(result.description);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }, [book]);

  if (isLoading) {
    return (
      <Center flex={1} safeArea>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box flex={1}>
      <StatusBar barStyle={'light-content'} />
      <Header hasGoBack bgColor={'transparent'}>
        <HStack>
          <IconButton
            icon={isFavourite ? 'heart' : 'heart-outline'}
            iconColor={isFavourite ? colors.warning : colors.black}
            onPress={handleSaveFavourite}
          />
        </HStack>
      </Header>

      <Box w="100%" h="auto" position={'absolute'} zIndex={-1}>
        <Image
          src={book.cover}
          w={'100%'}
          h="450px"
          alt={`${book.title} - cover image`}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </Box>

      <ScrollView bounces={false}>
        <Box
          mt="320px"
          bgColor={'white'}
          w="100%"
          minH={'700px'}
          px={spaces.screenWidth}
          pt={'4'}
          borderTopRadius={'10'}
          flex={1}>
          <Text fontSize={'2xl'} fontWeight={'semibold'}>
            {book.title}
          </Text>

          <HStack mt={'4'}>
            <Text flex={1} fontSize={'md'}>
              {book.author}
            </Text>
            <Text flex={1} fontSize={'md'}>
              {book.publishYear}
            </Text>
          </HStack>

          <Text fontSize={'lg'} fontWeight={'semibold'} mt="12">
            Book summary
          </Text>
          <Text mt="4">{bookDescription}</Text>

          <AddRemoveList
            isOnReadingList={isOnReadingList}
            onPress={handleSaveReadlingList}
            mt={'12'}
          />
        </Box>
      </ScrollView>
    </Box>
  );
};
