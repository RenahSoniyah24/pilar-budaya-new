import React, { useEffect, useState } from 'react';
import { FaRegUser, FaCheck } from "react-icons/fa";

import 'antd/dist/reset.css';
import { Table } from 'antd';
import qs from 'qs';
import {  
  coloumn_post,
} from '../../../../Constant/DataColoumn';
import { NavLink } from 'react-router-dom';
import {  
  formatName
} from '../../../../Formatter/Text';

import Admin from '../../Index';

function Post(props) {
  const [mode, setMode]               = useState('Pengguna');
  const [dataTable, setDataTable]     = useState([]);
  const [loading, setLoading]         = useState(false);
  const [dataModal, setDataModal]     = useState({});
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // ---- dummy request for data
  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  // -----

  // fetch server side
  const fetchData = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setDataTable(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
          },
        });
      });
  };

  // handle table
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setDataTable([]);
    }
  };

  // handle data modal
  const handleDataModal= (val) => {
    setDataModal(val)
  };

  // fetch data on pagination change, sort change, or filter change
  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  return (
    <>
      <Admin>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div className="h4 d-flex align-items-center">
            <FaRegUser size={20} className="mx-2" />List Post
          </div>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <NavLink to={`/post/form`} className={`btn btn-sm btn-success px-1 py-0`}>Tambah</NavLink>
            </div>
          </div>
        </div>

        <div className="table-responsive bg-light text-center rounded p-4">
          <Table
            columns={coloumn_post(handleDataModal)}
            rowKey={(record) => record.login.uuid}
            dataSource={dataTable}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </div>

        <div
          className="modal fade"
          id="detail"
          tabIndex="-1"
          aria-labelledby="detailLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 position-relative" style={{overflow: "visible",}}>
              {/* Tombol Close Bulat */}
              <button
                type="button"
                className="btn position-absolute d-flex align-items-center justify-content-center"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{
                  width: "20px",
                  padding: "15px",
                  height: "14px",
                  top: "-7px",
                  right: "-10px",
                  borderRadius: "50%",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#ffc83e",
                }}
              >x</button>
              
              <img src={dataModal?.picture?.large} className="img-fluid w-100" alt="..."/>
            </div>
          </div>
        </div>
      </Admin>
    </>
  );
}

export default Post;