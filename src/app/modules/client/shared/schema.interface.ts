import { EntityObject } from '../../entity/shared/entity.interface';

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

export interface Client extends EntityObject, ClientInfo {
  schemas: ClientSchema[];
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

export interface ClientSchema extends EntityObject {
  id: string;
  numeroClient: string;
  type: string;
  description: string;
  annee: string;
  etat: string;
}

export interface ClientSchemaListResponse {
  donnees?: ClientSchemaListResponseItem[];
}

export interface ClientSchemaListResponseItem extends ClientSchema {}
