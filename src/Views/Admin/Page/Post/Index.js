import React, { useEffect, useState } from 'react';
import { FaRegUser, FaCheck } from "react-icons/fa";
import Swal from 'sweetalert2';

import 'antd/dist/reset.css';
import { Table } from 'antd';
import {  
  coloumn_post,
} from '../../../../Constant/DataColoumn';
import { NavLink } from 'react-router-dom';
import {  
  getFileIdFromDriveUrl
} from '../../../../Formatter/Text';
import Notification from '../../../../Components/Notification';
import { getAllContentService, deleteContentService } from '../../../../Services/ServicesAPI';

import Admin from '../../Index';

function Post(props) {
  const [mode, setMode]               = useState('Pengguna');
  const [dataTable, setDataTable]     = useState([]);
  const [isLoading, setIsLoading]     = useState(true);
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
    
    let response = await getAllContentService();

    if (response?.content) {
      setDataTable(response?.content);
      setLoading(false);
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          total: response?.content.length,
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

  const onDelete = async (id) => {
    setLoading(true);
    let response = await deleteContentService(id);

    if (response) {
      Notification.success('Berhasil, ', 'Delete Content Berhasil');
    } else {
      Notification.warning('Gagal, ', 'Delete content Gagal');
    }
    setLoading(false);
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
    setDataModal({
      ...val,
      imageUrl: getFileIdFromDriveUrl(val.imageUrl)
    })
  };

  const handleDeleteConfirmation = (postId) => {
    Swal.fire({
      title: 'Apakah Yakin menghapus post?',
      text: 'Apakah Anda benar-benar ingin menghapus Post ini? Tindakan ini tidak dapat dibatalkan',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yap, Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(postId);
        Swal.fire('Terhapus!', 'Post Kamu telah di hapus.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Post Kamu batal di hapus.', 'info');
      }
    });
  };

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
            columns={coloumn_post(handleDataModal, handleDeleteConfirmation)}
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
                src={`https://drive.google.com/thumbnail?id=${dataModal?.imageUrl}`} 
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

export default Post;