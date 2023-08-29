import {Button, IButtonProps, Icon, Text} from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type AddRemoveListProps = {
  onPress: () => void;
  isOnReadingList: boolean;
} & IButtonProps;

export const AddRemoveList: React.FC<AddRemoveListProps> = ({
  onPress,
  isOnReadingList,
  ...props
}) => {
  return (
    <Button
      {...props}
      py={'2'}
      w="100%"
      bgColor="secondary"
      onPress={onPress}
      _pressed={{style: {transform: [{scale: 0.98}]}}}
      leftIcon={
        <Icon
          size={'5'}
          as={
            <MaterialIcons
              name={
                !isOnReadingList ? 'bookmark-outline' : 'bookmark'
              }
            />
          }
        />
      }>
      <Text color={'white'}>{`${
        isOnReadingList ? 'Remove from' : 'Add to'
      } Reading List`}</Text>
    </Button>
  );
};
