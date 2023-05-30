export type Inputs = {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
};
export type login = {
  nameOrEmail: string;
  password: string;
};

export type forgotPassword = {
  email: string;
};

export type Recovery = {
  password: string;
  repeatPassword: string;
};


export type avatar = {
  name: string
  avatar: string;
  moviestitle: string[]
  token:string
};
