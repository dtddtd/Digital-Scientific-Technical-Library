export enum PublicationStatus {
  digital = "digital",
  taken = "taken",
  available = "available",
}

export type TPublication = {
  pubID: number;
  pubHeader: string;
  pubType: string;
  pubDate: string;
  authors: string;
  publisherID: number;
  language: string;
  status: PublicationStatus;
  redactors?: string;
  isTranslation?: boolean;
  volume?: number;
  series?: string;
  bibCipher?: string;
  doi?: string;
  isNew?: boolean;
  keywords?: string;
  webLink?: string;
  notes?: string;
};
