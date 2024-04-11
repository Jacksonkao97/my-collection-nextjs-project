import React from 'react'

// Models
import CollectionItem from '../model/collectionItemModel'

// Components
import EditItemButton from './EditItemButton'
import DeleteItemButton from './DeleteItemButton'

interface CollectionItemTableProps {
  collectionTable: CollectionItem[]
}

const CollectionItemTable = (props: CollectionItemTableProps) => {
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
                <th>Description</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {props.collectionTable.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.creationDate}</td>
                    <td>{item.lastUpdated}</td>
                    <td>{item.description}</td>
                    <td>
                      <EditItemButton itemId={item.id} />
                    </td>
                    <td>
                      <DeleteItemButton itemId={item.id} />
                    </td>
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