import React from 'react';
import {Box, Text, Toast} from 'native-base';

interface ToastWarningProps {
  description: string;
}

const ToastModel: React.FC<ToastWarningProps> = ({description}) => (
  <Box w="100%" p="4" bgColor="warning" borderRadius={10}>
    <Text color="white" fontWeight={'semibold'}>
      {description}
    </Text>
  </Box>
);

export const showToast = (message: string) => {
  return Toast.show({
    duration: 5000,
    render: () => <ToastModel description={message} />,
  });
};
