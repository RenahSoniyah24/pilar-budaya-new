import React from 'react';

function Table(props) {
  const datas     = props.data
  const loading   = props.loading

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
          </tr>
        </thead>
        <tbody>
          {
            loading ? 
            <tr>
              <td colSpan={6}>Loading . . .</td>
            </tr>
            :
              Array.isArray(datas) ? 
                datas.map((data,index)=>{
                  return (
                    <tr key={index}>
                      <td>{data.id}</td>
                      <td>{data.name}</td>
                      <td>{data.username}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                      <td>{data.website}</td>
                    </tr>
                  )
                })
              :
                <tr>
                  <td>{datas.id}</td>
                  <td>{datas.name}</td>
                  <td>{datas.username}</td>
                  <td>{datas.email}</td>
                  <td>{datas.phone}</td>
                  <td>{datas.website}</td>
                </tr>
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;