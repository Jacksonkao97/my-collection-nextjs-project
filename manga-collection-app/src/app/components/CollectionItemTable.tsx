import React from 'react'
import CollectionItem from '../model/collectionItemModel'

interface CollectionItemTableProps {
  collectionTable: CollectionItem[]
}

const CollectionItemTable = (props: CollectionItemTableProps) => {
  console.log(props.collectionTable)
  return (
    <>
      {props.collectionTable.length === 0 ? <p>No items in collection</p> :
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Creation Date</th>
                <th>Last Update</th>
              </tr>
            </thead>
            <tbody>
              {props.collectionTable.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.creationDate}</td>
                    <td>{item.lastUpdated}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>}
    </>
  )
}

export default CollectionItemTable