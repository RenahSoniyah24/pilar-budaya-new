import React, { useEffect, useState } from 'react';
import { FaWallet, FaCheck } from "react-icons/fa";
import { getUserService } from '../../../../Services/ServicesAPI';

import 'antd/dist/reset.css';
import { Table } from 'antd';
import qs from 'qs';
import {  
  coloumn_iuran,
} from '../../../../Constant/DataColoumn';
import {  
  formatName
} from '../../../../Formatter/Text';

import Admin from '../../Index';

function Detail(props) {
  const [dataTable, setDataTable]     = useState([]);
  const [loading, setLoading]         = useState(false);
  const [dataModal, setDataModal]     = useState({});
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // fetch server side
  const fetchData = async () => {
    setLoading(true);
    
    let response = await getUserService(tableParams.pagination.current, tableParams.pagination.pageSize);

    if (response) {
      setDataTable(response.data);
      setLoading(false);
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          total: response.total,
        },
      });
    } else {
      setDataTable([]);
      setLoading(false);
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          total: 0,
        },
      });
    }
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

  // fetch data on pagination change, sort change, or filter change
  useEffect(async() => {
    await fetchData();
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
            <FaWallet size={20} className="mx-2" />List Iuran Pengguna
          </div>
        </div>

        <div className="table-responsive bg-light text-center rounded p-4">
          <Table
            columns={coloumn_iuran}
            rowKey={(record) => record.id}
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

              <div className="d-flex flex-column flex-md-row">
                {/* Bagian Kiri */}
                <div
                  className="d-flex flex-column align-items-center bg-gradient bg-warning text-white p-4 rounded-start"
                  style={{ minWidth: "250px" }}
                >
                  <img
                    src="assets/images/icon-dance.webp"
                    alt="icon"
                    className="rounded-circle mb-3"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <h5 className="mb-1 text-center" style={{ fontWeight: "bold" }}>
                    { formatName(dataModal?.name?.first) ?? ''}
                  </h5>
                  <p className="text-center mb-3" style={{ fontSize: "14px" }}>
                    Pendaftar
                  </p>
                  <button className="btn btn-success btn-sm">
                    <FaCheck size={20} className="mx-2" /> Verifikasi
                  </button>
                </div>

                {/* Bagian Kanan */}
                <div className="flex-grow-1 p-4">
                  <h6 className="text-secondary border-bottom pb-2">Information</h6>
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
                  <h6 className="text-secondary border-bottom pt-4">Bukti Pembayaran</h6>
                  <div className="d-flex justify-content-between mt-3">
                    <img src={dataModal?.picture?.medium} className="img-fluid" alt="..."/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Admin>
    </>
  );
}

export default Detail;