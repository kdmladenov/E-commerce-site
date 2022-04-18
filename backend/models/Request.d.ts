declare namespace Express {
  export interface Request {
    user: {
      userId: number;
      email: string;
      role: string;
    };
    file: { [key: string]: string };
  }
}
