import {IPressableProps, Icon, Pressable} from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IconButtonProps = {
  icon: string;
  iconColor?: string;
  onPress: () => void;
} & IPressableProps;

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconColor,
  onPress,
  ...props
}) => {
  return (
    <Pressable
      onPress={onPress}
      _pressed={{style: {transform: [{scale: 0.9}]}}}
      {...props}>
      <Icon size="5" color={iconColor} as={<MaterialIcons name={icon} />} />
    </Pressable>
  );
};
