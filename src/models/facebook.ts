import { FacebookLoginResponse } from '@ionic-native/facebook';

export class FacebookAuthorize {
  email?: string;
  name?: string;
  picture?: string;
  picture64?: string;
  accessToken?: string;
  userIdFace: string;
}
export interface FbLoginResponse extends FacebookLoginResponse {
  header: any;
}
