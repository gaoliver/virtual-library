import {
  Button,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {IconButton} from '../IconButton/IconButton';

let isOnReadingList = false;

const cover =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTNSyStf1DLYehyOLwoKXYpkqdKYVllekKBx9ZvBwY7mq7BAxIo-5Y4tMRiCOW_xCWX58&usqp=CAU';

export const BookCard = () => {
  return (
    <Pressable shadow="2">
      <HStack
        w="100%"
        bgColor={'white'}
        borderRadius={'10'}
        overflow={'hidden'}>
        <Image w={'100px'} h={'150px'} src={cover} alt="book cover" />

        <VStack p="3" flex={1}>
          <HStack alignItems={'center'}>
            <Text
              fontSize={'lg'}
              fontWeight={'semibold'}
              noOfLines={1}
              flex={1}>
              Book Title
            </Text>
            <IconButton
              icon={isOnReadingList ? 'heart' : 'heart-outline'}
              onPress={() => {}}
            />
          </HStack>
          <Text>Author</Text>
          <Text>Publish year</Text>

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
