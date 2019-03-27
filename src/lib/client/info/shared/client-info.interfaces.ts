export interface ClientInfoApiConfig {
  get: string;
  link: string;
}

export interface ClientInfo {
  numero: string;
  nom: string;
  adresseCor: string;
  adresseExp: string;
  adressePro: string;
}

export interface ClientInfoGetResponse {
  data: ClientInfoGetResponseData;
}

export interface ClientInfoGetResponseData {
  numeroClient: string;
  nomClient: string;
  adresseCorrespondance: string;
  suiteAdresseCorrespondance?: string;
  municipaliteAdresseCorrespondance: string;
  provinceAdresseCorrespondance: ClientInfoGetResponseProvince;
  paysAdresseCorrespondance: ClientInfoGetResponsePays;
  codePostalAdresseCorrespondance: string;
}

export interface ClientInfoGetResponseProvince {
  province: string;
  codeProvince: string;
}

export interface ClientInfoGetResponsePays {
  pays: string;
  codePays: string;
}
