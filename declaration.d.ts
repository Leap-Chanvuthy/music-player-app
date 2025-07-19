declare module 'react-native-vector-icons/Ionicons' {
  import React from 'react';
    import { Icon } from 'react-native-vector-icons/Icon';

  type IconProps = React.ComponentProps<typeof Icon>;

  export default class Ionicons extends React.Component<IconProps> {}
}
