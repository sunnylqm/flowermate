import { User } from 'types/types';

import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export { screenHeight, screenWidth };

// export const host = __DEV__
//   ? 'http://localhost:9999'
//   : 'http://118.24.22.67:9999';
export const host = 'http://118.24.22.67:9999';
export const apiEndpoint = `${host}/api`;

export const getImageUrl = (imageId: number) =>
  `${apiEndpoint}/file/${imageId}`;

export const defaultAvatar =
  'https://tb2.bdstatic.com/tb/static-pb/img/head_80.jpg';
export const getUserAvatar = (user: User) => ({
  uri: user.avatar ? getImageUrl(user.avatar) : defaultAvatar,
});
