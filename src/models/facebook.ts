import { FacebookLoginResponse } from '@ionic-native/facebook';

export interface FbLoginResponse extends FacebookLoginResponse {
  header?: any;
  picture?: string;
  picture64?: string;
}
