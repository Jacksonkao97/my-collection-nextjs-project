export interface Collection {
  id: string,
  title: string,
  numberOfRecords: number,
  creationDate: string,
  image: string,
  imageType: string,
  note: string,
}

export interface Record {
  id: string,
  title: string,
  creationDate: string,
  lastUpdated: string,
  episode?: number,
  season?: number,
  note?: string,
}

export interface Item {
  id: string,
  title: string,
  type: string,
  episode: number,
  season: number,
  image?: string,
  imageType?: string,
}