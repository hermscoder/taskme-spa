import { Media } from './Media';

export class UserDTO {
  id: number;
  givenName: string;
  familyName: string;
  username: string;
  contact: string;
  address: string;
  birthDate: number;
  createdOn: Date;
  profilePhoto: Media;
  numberOfTasksCreated: number;
  rateAvg: number;
  description: string;
}
