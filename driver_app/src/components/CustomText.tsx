import React from 'react';
import {Text, TextProps} from 'react-native';

const CustomText: React.FC<TextProps> = props => {
  // Merge the provided props with allowFontScaling set to false
  const mergedProps: TextProps = {
    ...props,
    allowFontScaling: false,
  };

  return <Text {...mergedProps} />;
};

export default CustomText;
