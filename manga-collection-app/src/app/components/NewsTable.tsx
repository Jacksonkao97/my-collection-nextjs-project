import React from 'react'

interface tableData {
  date: string,
  title: string,
  url?: string
}

interface FetchNewsResponse {
  data: tableData[]
}

const NewsTable = async () => {
  const tableData: tableData[] = await fetch(`${process.env.BASE_URL}/api/news`, { cache: 'no-cache' })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} and message: ${response.statusText}`)
      }
      const data: FetchNewsResponse = await response.json()
      return data.data
    })
    .catch(error => {
      console.error(error.message)
      throw new Error('Error in fetching news')
    })

  return (
    <div className='bg-base-300'>
      <table className="table table-md sm:table-sm table-fixed table-pin-rows">
        {/* head */}
        <thead className='sticky top-0'>
          <tr>
            <th className='w-3/12 bg-neutral'>Date</th>
            <th className='w-9/12 bg-neutral'>Title</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index} className='hover'>
              <td>{data.date}</td>
              <td className='truncate'><a className='cursor-pointer hover:underline' href={data.url} target="_blank">{data.title}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NewsTable