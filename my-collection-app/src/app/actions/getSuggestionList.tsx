'use server'

// Models
import { Suggestion, SuggestionList } from "../models/suggestionModel"

const getSuggestionList = async () => {
  try {
    const suggestions: Suggestion[] = await fetch(`${process.env.BASE_URL}/api/suggestions`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data: SuggestionList = await res.json()
        return data.suggestions
      })
      .catch((err) => {
        throw Error(err)
      })

    return suggestions

  } catch (error) {
    console.error(error)
    return []
  }
}

export default getSuggestionList