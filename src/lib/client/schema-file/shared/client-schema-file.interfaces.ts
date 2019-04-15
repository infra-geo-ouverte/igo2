export interface ClientSchemaFileApiConfig  {
  list: string;
  download: string;
  create: string;
  delete: string;
}

// Property have been renamed because this might become a common interface/module
export interface ClientSchemaFile {
  id: string;
  name: string;
  address: string;
  timbreMaj: {
    date: string;
  };
  size?: number;
  type?: string;
}

export interface ClientSchemaFileListResponse {
  data?: ClientSchemaFileListResponseItem[];
}

export interface ClientSchemaFileListResponseItem {
  idDocumentSchema: string;
  nomPhysiqueDocument: string;
  addresseDocument: string;
  tailleDocument: number;
  typeDocument: string;
  timbreMaj: {
    date: string;
  };
}

export interface ClientSchemaFileCreateData {
  p_fichier: File;
}

export interface ClientSchemaFileCreateResponse {
  data: ClientSchemaFileListResponseItem;
}
