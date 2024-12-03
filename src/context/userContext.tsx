import   * as React from 'react';
import { UserDetails } from '../models/user';

type UserData = [
  UserDetails | undefined,
  (user: UserDetails | undefined) => void
];

const UserContext = React.createContext<UserData>([undefined, () => ({})]);

export default UserContext;
