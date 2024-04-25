'use client'
import { useState, useEffect } from "react"

// Third Party
import { toast } from "sonner"

// Server Actions
import getNewsList from '@/app/actions/getNewsList'

// Models
import { News } from '@/app/models/newsModel'

const NewsTable = () => {
  const [news, setNews] = useState<News[]>([])
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  useEffect(() => {
    getNewsList().then((news) => {
      setNews(news)
    }).finally(() => {
      toast.success('News loaded successfully')
    })
  }, [isRefreshing])

  return (
    <div className="w-full h-full flex flex-col drop-shadow-2xl gap-3 p-2">
      <div className="flex flex-row justify-between p-3">
        <h1 className="text-2xl">News:</h1>
        <button onClick={() => setIsRefreshing(!isRefreshing)} className="hover:bg-current/10 hover:bg-white/20 w-8 h-8 flex justify-center items-center rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>
      <table className="table table-fixed bg-neutral rounded-box">
        <thead>
          <tr>
            <th className="w-[150px]">Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {news.map((newsItem) => (
            <tr key={newsItem.id}>
              <td>{newsItem.date}</td>
              <td className="truncate"><a href={newsItem.url} target="_blank" className="hover:underline hover:underline-offset-1">{newsItem.title}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NewsTable