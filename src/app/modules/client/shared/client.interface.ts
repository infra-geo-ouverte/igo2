export interface ClientApiConfig {
  info: string;
}

export interface ClientInfo {
  numero: string;
  nom: string;
  adresseCor: string;
  adresseExp: string;
  adressePro: string;
}

export interface Client extends ClientInfo {
  schemas: ClientSchema[];
}

export interface ClientInfoListResponse {
  donnees?: ClientInfoListResult[];
}

export interface ClientInfoListResult {
  numeroClient: string;
  nomClient: string;
  adresseCorrespondance: string;
  suiteAdresseCorrespondance?: string;
  municipaliteAdresseCorrespondance: string;
  provinceAdresseCorrespondance: ClientInfoListResultProvince;
  paysAdresseCorrespondance: ClientInfoListResultPays;
  codePostalAdresseCorrespondance: string;
}

export interface ClientInfoListResultProvince {
  province: string;
  codeProvince: string;
}

export interface ClientInfoListResultPays {
  pays: string;
  codePays: string;
}

export interface ClientSchema {
  id: string;
  numeroClient: string;
  type: string;
  description: string;
  annee: string;
  etat: string;
}

export interface ClientSchemaListResponse {
  donnees?: ClientSchemaListResult[];
}

export interface ClientSchemaListResult extends ClientSchema {}
