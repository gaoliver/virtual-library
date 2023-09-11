/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useState} from 'react';
import {Box, HStack, StatusBar, Text, ScrollView} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {showToast, Header, IconButton, Spinner} from '@/components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainStackParamList} from 'App';
import {spaces} from '@/constants/spaces';
import LinearGradient from 'react-native-linear-gradient';
import {BookPropsApi} from '@/@types/models';
import {colors} from '@/theme/colors';
import {AppState, actions} from '@/Redux/slices';
import {api} from '@/Api';
import {AddRemoveList} from '@/components/featured/AddRemoveList';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';

type BookDetailsProps = NativeStackScreenProps<
  RootMainStackParamList,
  'BookDetails'
>;

export const BookDetails: React.FC<BookDetailsProps> = ({route}) => {
  const {book} = route.params;
  const {bottom} = useSafeAreaInsets();
  const dispatch = useDispatch();

  const favourites = useSelector((state: AppState) => state.favourites);
  const readingList = useSelector((state: AppState) => state.readingList);

  const [bookDescription, setBookDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isFavourite = favourites?.some(item => item.key === book.key);
  const isOnReadingList = readingList?.some(item => item.key === book.key);

  const handleSaveFavourite = () => {
    dispatch(actions.saveFavourite(book));
  };

  const handleSaveReadingList = () => {
    dispatch(actions.saveToReadingList(book));
  };

  const fetchBook = async () => {
    setIsLoading(true);

    try {
      const response = await api.get(`${book.key}.json`);
      const result: BookPropsApi = response.data;

      if (typeof result.description === 'string' && !!result.description) {
        setBookDescription(result.description);
      } else if ((result.description as any)?.value) {
        setBookDescription((result.description as any).value);
      }

      setIsLoading(false);
    } catch (error) {
      showToast('An error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  useMemo(() => {
    fetchBook();
  }, [book]);

  if (isLoading) {
    return <Spinner testID="loading-spinner" />;
  }

  return (
    <Box flex={1}>
      <StatusBar barStyle="light-content" />
      <Header hasGoBack bgColor="transparent">
        <HStack>
          <IconButton
            icon={isFavourite ? 'heart' : 'heart-outline'}
            iconColor={isFavourite ? colors.warning : colors.black}
            onPress={handleSaveFavourite}
          />
        </HStack>
      </Header>

      <Box w="100%" h="auto" position="absolute" zIndex={-1}>
        <FastImage source={{uri: book.cover}} style={styles.image} />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.gradient}
        />
      </Box>

      <ScrollView bounces={false}>
        <Box
          mt={320}
          bgColor="white"
          w="100%"
          minH={700}
          px={spaces.screenWidth}
          pt={4}
          borderTopRadius={10}
          flex={1}>
          <Text fontSize="2xl" fontWeight="semibold">
            {book.title}
          </Text>

          <HStack mt={4}>
            <Text flex={1} fontSize="md">
              {book.author}
            </Text>
            <Text flex={1} fontSize="md">
              {book.publishYear}
            </Text>
          </HStack>

          <Text fontSize="lg" fontWeight="semibold" mt={12}>
            Book summary
          </Text>
          <Text mt={4}>{bookDescription}</Text>

          <AddRemoveList
            isOnReadingList={isOnReadingList}
            onPress={handleSaveReadingList}
            mt={12}
            mb={bottom}
            _android={{
              mb: 4,
            }}
          />
        </Box>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 450,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
