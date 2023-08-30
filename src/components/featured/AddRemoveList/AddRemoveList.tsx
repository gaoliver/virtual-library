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
  const iconName = isOnReadingList ? 'bookmark' : 'bookmark-outline';
  const actionText = isOnReadingList ? 'Remove from' : 'Add to';

  return (
    <Button
      {...props}
      py={2}
      w="100%"
      bgColor="secondary"
      onPress={onPress}
      _pressed={{style: {transform: [{scale: 0.98}]}}}
      leftIcon={<Icon size={5} as={<MaterialIcons name={iconName} />} />}>
      <Text color="white">{`${actionText} Reading List`}</Text>
    </Button>
  );
};
