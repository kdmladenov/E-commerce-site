export interface User {
  userId: number;
  password: string;
  reenteredPassword: string;
  email: string;
  fullName: string;
  phone: string;
  avatar: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  role: RolesType;
  isDeleted: number;
}
export default User;
