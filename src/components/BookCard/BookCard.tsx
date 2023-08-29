import {
  Button,
  HStack,
  IPressableProps,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {IconButton} from '../IconButton/IconButton';
import {colors} from '@/theme/colors';
import {BookProps} from '@/@types/models';

export type BookCardProps = BookProps & IPressableProps;

export const BookCard: React.FC<BookCardProps> = ({
  author,
  cover,
  isFavourite,
  isOnReadingList,
  publishYear,
  title,
  ...props
}) => {
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
              onPress={() => {}}
            />
          </HStack>
          <Text>{author}</Text>
          <Text>{publishYear}</Text>

          <Button
            mt={'auto'}
            py={'2'}
            w="100%"
            bgColor="secondary"
            _pressed={{style: {transform: [{scale: 0.98}]}}}
            leftIcon={
              <Icon
                size={'5'}
                as={
                  <MaterialIcons
                    name={
                      !isOnReadingList
                        ? 'file-document-outline'
                        : 'file-document'
                    }
                  />
                }
              />
            }>
            <Text color={'white'}>{`${
              isOnReadingList ? 'Remove from' : 'Add to'
            } Reading List`}</Text>
          </Button>
        </VStack>
      </HStack>
    </Pressable>
  );
};
