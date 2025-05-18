import { TokenData } from "./token-data.model";

export interface AuthData {
  access_token: TokenData;
  refresh_token: TokenData;
  redirect_url?: string;
}
