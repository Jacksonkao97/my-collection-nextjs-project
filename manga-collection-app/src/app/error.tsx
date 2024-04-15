'use client'
import { useEffect } from "react"


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  return (
    <div className='flex flex-1 w-full h-full justify-center content-center'>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Something went wrong!</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => reset()}>Try Again</button>
          </div>
        </div>
      </div>
    </div>
  )
}