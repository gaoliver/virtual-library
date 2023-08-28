import {Icon, Pressable} from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconButtonProps {
  icon: string;
  onPress: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({icon, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      _pressed={{style: {transform: [{scale: 0.9}]}}}>
      <Icon size="5" as={<MaterialIcons name={icon} />} />
    </Pressable>
  );
};
