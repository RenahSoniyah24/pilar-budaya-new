import React, { useEffect, useState } from 'react';
import { FaWallet, FaCheck } from "react-icons/fa";
import { getUserDetailService } from '../../../../Services/ServicesAPI';
import { useParams } from 'react-router-dom';

import 'antd/dist/reset.css';
import { Table } from 'antd';
import qs from 'qs';
import {  
  coloumn_detail_iuran,
} from '../../../../Constant/DataColoumn';
import {  
  formatDate,
  calculateAge
} from '../../../../../src/Formatter/Text';

import Admin from '../../Index';

function IuranDetail(props) {
  const {identifier}                  = useParams()
  const [data, setData]               = useState({});
  const [dataTable, setDataTable]     = useState([]);
  const [loading, setLoading]         = useState(false);
  const [isLoading, setIsLoading]     = useState(true);
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

    let response = await getUserDetailService(identifier);

    if (response) {
      let data = response.data
      let formatBirth = formatDate(data.birthDate)
      let age = calculateAge(data.birthDate)

      setData({
        ...data,
        birthDate: formatBirth,
        age: `${age} Tahun`
      });
      setDataTable(response.data.payments);
      setLoading(false);
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          total: response.data.payments.length,
        },
      });
    } else {
      setData({});
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
          <div className="col-md-3 col-sm-12 px-2 py-2 w-10">
            <img src={`${process.env.PUBLIC_URL}/assets/icon/user.webp`} className="img-fluid" alt="..."/>
          </div>
          <div className="col-md-9 col-sm-12">
            <div className="flex-grow-1 p-4">
              <div>
                <strong>Nama Lengkap:</strong> <span>{data?.fullName ?? ''}</span>
              </div>
              <div>
                <strong>Tanggal Lahir:</strong> <span>{data?.birthDate ?? ''}</span>
              </div>
              <div>
                <strong>Umur:</strong> <span>{data?.age ?? ''}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <Table
            columns={coloumn_detail_iuran(handleDataModal)}
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
              
              {isLoading && <div className="spinner">Loading...</div>}
              <img 
                src={`https://drive.google.com/thumbnail?id=${dataModal?.fileId}&sz=s4000`} 
                className="img-fluid w-100" 
                alt="Payment Proof"
                onLoad={() => setIsLoading(false)}
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = 'assets/images/default-image-payment.webp'; 
                  setIsLoading(false);
                }}
              />
            </div>
          </div>
        </div>
      </Admin>
    </>
  );
}

export default IuranDetail;