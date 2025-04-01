export type DataProps = {
  email: string;
  nome: string;
  token: string;
};

export type SignInProps = {
  email: string;
  senha: string;
};

export type CreateUserProps = {
  nome: string;
  email: string;
  senha: string;
};

export type EditUserProps = {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  date_nasc: string;
  uf: string;
  city: string;
  gender: string;
  office: string;
};

export type HandleNewChipProps = {
  place_of_purchase: string;
  phone: string;
  value: string;
  sms: string;
  zap: string;
  telegram: string;
  google: string;
  yahoo: string;
  outlook: string;
  obs: string;
  status: string;
  id: string;
};
