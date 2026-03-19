export interface AuthPayload {
  fullname: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    fullname: string;
    email: string;
  };
}