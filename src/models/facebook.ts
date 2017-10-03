import { FacebookLoginResponse } from '@ionic-native/facebook';

export interface FbLoginResponse extends FacebookLoginResponse {
  header?: any;
  picture?: string;
  picture64?: string;
}

export interface UserPicture {
  data: {
    url: string;
    width?: number;
    is_silhouette: boolean;
    height?: number;
  };
}

export interface PermissionsUser {
  [key: string]: string;
}
