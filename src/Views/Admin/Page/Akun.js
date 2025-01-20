import React, { useEffect, useState } from 'react';
import { FaRegUser, FaCheck } from "react-icons/fa";
import Notification from '../../../Components/Notification';
import { getUserService, getUserDetailService, verifikasiService } from '../../../Services/ServicesAPI';
import { formatDateToIndonesian, getLatestPayment } from '../../../Formatter/Text';
import {  
  calculateAge
} from '../../../../src/Formatter/Text';

import 'antd/dist/reset.css';
import { Table } from 'antd';
import {  
  coloumn_pengguna,
  coloumn_pendaftar
} from '../../../Constant/DataColoumn';
import {  
  formatName
} from '../../../Formatter/Text';

import Admin from '../Index';

function Akun(props) {
  const [mode, setMode]               = useState('Pendaftar');
  const [dataTable, setDataTable]     = useState([]);
  const [loading, setLoading]         = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
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

  // handle mode
  // const handleModeChange = async (val) => {
  //   setMode(val)
  //   await fetchData()
  // };

  // handle data modal
  const handleDataModal= async(val) => {
    setLoadingModal(true)
    let response = await getUserDetailService(val.id);

    if (response) {
      let res = {
        ...val,
        ...response.data,
        latestPayment: getLatestPayment(response.data.payments)
      }
      setDataModal(res)
    } else {
      setDataModal({})
    }
    setLoadingModal(false)
  };

  const handleVerifikasi= async(val) => {
    setLoadingModal(true)
    let response = await verifikasiService(val);

    if (response) {
      Notification.success('Berhasil, ', 'Verifikasi Pembayaran Berhasil');
      const modalElement = document.getElementById("detail");
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      modalElement.setAttribute("aria-hidden", "true");

      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }

      await fetchData();
    } else {
      Notification.warning('Upps, ', 'Verifikasi Pembayaran Gagal');
    }
    setLoadingModal(false)
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
            <FaRegUser size={20} className="mx-2" />List {mode}
          </div>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              {/* <button type="button" className={`btn btn-sm btn-outline-secondary px-1 py-0 ${mode === "Pendaftar" ? "active" : ""}`} onClick={() =>  handleModeChange("Pendaftar")}>Pengguna</button>
              <button type="button" className={`btn btn-sm btn-outline-secondary px-1 py-0 ${mode === "Pendaftar" ? "active" : ""}`} onClick={()  =>  handleModeChange("Pendaftar")}>Pendaftar</button> */}
            </div>
          </div>
        </div>

        <div className="table-responsive bg-light text-center rounded p-4">
          <Table
            columns={mode === "Pengguna" ? coloumn_pengguna : coloumn_pendaftar(handleDataModal)}
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
                    { formatName(dataModal?.fullName) ?? ''}
                  </h5>
                  <p className="text-center mb-3" style={{ fontSize: "14px" }}>
                    Pendaftar
                  </p>
                  <button className="btn btn-success btn-sm" disabled={dataModal?.isActive || loadingModal} onClick={() =>  handleVerifikasi(dataModal?.id)}>
                    {
                      loadingModal ? (
                        <span>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Loading...
                        </span>
                      ) : <>
                        <FaCheck size={20} className="mx-2" /> {dataModal?.isActive ? 'Terverifikasi' : 'Verifikasi'}
                      </>
                    }
                  </button>
                </div>

                {/* Bagian Kanan */}
                <div className="flex-grow-1 p-4">
                  <h6 className="text-secondary border-bottom pb-2">Information</h6>
                  <div>
                    <strong>Tanggal Lahir:</strong> <span>{loadingModal ? '-' : (formatDateToIndonesian(dataModal?.birthDate) ?? '-')}</span>
                  </div>
                  <div>
                    <strong>Email:</strong> <span>{dataModal?.email ?? '-'}</span>
                  </div>
                  <div>
                    <strong>Umur:</strong> <span>{dataModal?.birthDate ? calculateAge(dataModal?.birthDate) : '-'} Tahun</span>
                  </div>
                  <div>
                    <strong>Tanggal Daftar:</strong> <span>{loadingModal ? '-' : (formatDateToIndonesian(dataModal?.birthDate) ?? '-')}</span>
                  </div>
                  <h6 className="text-secondary border-bottom pt-4">Bukti Pembayaran</h6>
                  <div className="d-flex justify-content-between mt-3">
                    {
                      !loadingModal ? 
                        <>
                          <img 
                            src={`https://drive.google.com/thumbnail?id=${dataModal?.latestPayment?.fileId}&sz=s4000`} 
                            className="img-fluid" 
                            alt="Payment Proof"
                            onError={(e) => { 
                              e.target.onerror = null; 
                              e.target.src = 'assets/images/default-image-payment.webp';
                            }}
                          />
                        </>
                        :
                        <> Sedang Memuat</>
                    }
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

export default Akun;