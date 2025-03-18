export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
}
export interface SignupModel {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface UpdateUserModel {
  id: number | null;
  name: string;
  email: string;
  phone?: string;
}
