import React from 'react'

// Enums
import operationStatus from '@/app/enum/operationStatus'

const toast = ({ type, message }: { type: operationStatus, message: string }) => {
  return (
    <div className="toast toast-top toast-center">
      {type === operationStatus.SUCCESS && <div className="alert alert-success"> {message} </div>}
      {type === operationStatus.ERROR && <div className="alert alert-error"> {message} </div>}
    </div>
  )
}

export default toast