import React, { useEffect, useState } from 'react';
import { FaWallet, FaCheck } from "react-icons/fa";

import 'antd/dist/reset.css';
import { Table } from 'antd';
import qs from 'qs';
import {  
  coloumn_detail_iuran,
} from '../../../../Constant/DataColoumn';

import Admin from '../../Index';

function IuranDetail(props) {
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
        debugger
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
            <FaWallet size={20} className="mx-2" />Detail Iuran Pengguna
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 col-sm-12">
            <img src={dataModal?.picture?.large} className="img-fluid" alt="..."/>
          </div>
          <div className="col-md-9 col-sm-12">
            <div className="flex-grow-1 p-4">
              <div>
                <strong>Tanggal Lahir:</strong> <span>{dataModal?.name?.first ?? ''}</span>
              </div>
              <div>
                <strong>Umur:</strong> <span>{dataModal?.name?.first ?? ''} Tahun</span>
              </div>
              <div>
                <strong>Sekolah:</strong> <span>{dataModal?.name?.first ?? ''}</span>
              </div>
              <div>
                <strong>Tanggal Daftar:</strong> <span>{dataModal?.name?.first ?? ''}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <Table
            columns={coloumn_detail_iuran(handleDataModal)}
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

export default IuranDetail;