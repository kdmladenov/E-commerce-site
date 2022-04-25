interface UserType {
  user: {
    userId: number;
    fullName: string;
    role: string;
    avatar: string;
    address: string;
    address2: string;
    city: string;
    zip: string;
    state: string;
    country: string;
    email: string;
    phone: string;
    isDeleted: number | boolean;
    password: string;
    token: string;
    totalDBItems: number;
  };
}

export default UserType;
