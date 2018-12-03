export interface ClientInfoApiConfig {
  get: string;
}

export interface ClientInfo {
  numero: string;
  nom: string;
  adresseCor: string;
  adresseExp: string;
  adressePro: string;
}

export interface ClientInfoListResponse {
  donnees?: ClientInfoListResponseItem[];
}

export interface ClientInfoListResponseItem {
  numeroClient: string;
  nomClient: string;
  adresseCorrespondance: string;
  suiteAdresseCorrespondance?: string;
  municipaliteAdresseCorrespondance: string;
  provinceAdresseCorrespondance: ClientInfoListResponseItemProvince;
  paysAdresseCorrespondance: ClientInfoListResponseItemPays;
  codePostalAdresseCorrespondance: string;
}

export interface ClientInfoListResponseItemProvince {
  province: string;
  codeProvince: string;
}

export interface ClientInfoListResponseItemPays {
  pays: string;
  codePays: string;
}
