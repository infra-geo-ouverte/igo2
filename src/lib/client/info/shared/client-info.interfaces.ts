export interface ClientInfoApiConfig {
  get: string;
  link: string;
  addresses: string;
}

export interface ClientInfoAddresses {
  adresseCor: string;
  adresseExp: string;
  adressePro: string;
}

export interface ClientInfo extends ClientInfoAddresses {
  numero: string;
  nom: string;
}

export interface ClientInfoGetResponse {
  data: ClientInfoGetResponseData;
}

export interface ClientInfoGetResponseData {
  numeroClient: string;
  nomClient: string;
}

export interface ClientInfoAddressesResponse {
  data: ClientInfoAddressData[];
}

export interface ClientInfoAddressData {
  typeAdresse: 'COR' | 'EXP' | 'PRO';
  adresse: string;
  suiteAdresse?: string;
  municipaliteAdresse: string;
  provincePaysAdresse: string;
  provinceAdresse?: string;
  codePostalAdresse: string;
}
