declare namespace Express {
  export interface Request {
    user: {
      userId: number;
      email: string;
      role: string;
    };
    file: {
      path: string;
    };
  }
}
