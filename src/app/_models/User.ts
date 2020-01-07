import { Media } from './Media';

export interface User {
  id: number;
  givenName: string;
  familyName: string;
  username: string;
  contact: string;
  address: string;
  birthDate: number;
  createdOn: Date;
  profilePhoto: Media;
}
