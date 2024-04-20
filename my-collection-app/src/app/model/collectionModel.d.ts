interface Collection {
  id: string,
  image?: string | null,
  imageType?: string | null,
  name: string,
  numberOfItems: number,
  creationDate: string,
  lastUpdated: string,
}

export default Collection