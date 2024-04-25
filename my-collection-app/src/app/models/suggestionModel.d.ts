export interface SuggestionList {
  suggestions: Suggestion[]
}

export interface Suggestion {
  id: string,
  image: string,
  title: string,
  url: string,
  date: string,
}