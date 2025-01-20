import {  
  formatDate,
  formatRupiah
} from '../../src/Formatter/Text';
import { FaRegCheckCircle, FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

export const coloumn_pengguna = [
  {
    title: 'Nama',
    dataIndex: 'name',
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Tanggal Upload',
    dataIndex: 'registered',
    render: (registered) => `${formatDate(registered.date)}`,
    width: '20%',
  },
  {
    title: 'Status',
    dataIndex: 'gender',
    width: '20%',
    align: 'center',
    render: (gender) => gender == 'female' ? <span className="badge bg-success">Success</span> : <span className="badge bg-danger">Gagal</span>,
    filters: [
      {
        text: 'Sukses',
        value: 'female',
      },
      {
        text: 'Gagal',
        value: 'male',
      },
    ],
    onFilter: (value, record) => record.gender === value,
  },
];

export const coloumn_pendaftar = (handleDataModal) => [
  {
    title: 'Nama Lengkap',
    dataIndex: 'fullName',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Nomor Telpon',
    dataIndex: 'phoneNumber',
    width: '20%',
  },
  {
    title: 'Tanggal Daftar',
    dataIndex: 'birthDate',
    render: (birthDate) => `${formatDate(birthDate)}`,
    width: '20%',
  },
  {
    title: 'Verifikasi',
    dataIndex: 'isActive',
    width: '20%',
    align: 'center',
    render: (isActive) => isActive ? <FaRegCheckCircle size={15} color="green"/> : <FaCircleXmark size={15} color="red"/>,
    filters: [
      {
        text: 'Terverifikasi',
        value: true,
      },
      {
        text: 'Belum Verifikasi',
        value: false,
      },
    ],
    onFilter: (value, record) => record.isActive === value,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    align: "center",
    render: (text, record) => <button type="button" className="btn btn-sm btn-info px-1" data-bs-toggle="modal"  data-bs-target="#detail" style={{paddingTop: "0.01rem", paddingBottom: "0.1rem"}} onClick={() => handleDataModal(record)}><FaEye size={15} color="white"/></button>,
  },
];

export const coloumn_iuran = [
  {
    title: 'Nama Lengkap',
    dataIndex: 'fullName',
    sorter: true,
    width: '40%',
  },
  {
    title: 'Nomor Telpon',
    dataIndex: 'phoneNumber',
    width: '20%',
  },
  {
    title: 'Verifikasi',
    dataIndex: 'isActive',
    width: '20%',
    align: 'center',
    render: (isActive) => isActive ? <FaRegCheckCircle size={15} color="green"/> : <FaCircleXmark size={15} color="red"/>,
    filters: [
      {
        text: 'Terverifikasi',
        value: true,
      },
      {
        text: 'Belum Verifikasi',
        value: false,
      },
    ],
    onFilter: (value, record) => record.isActive === value,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: '20%',
    align: "center",
    render: (text, record) => <NavLink to={`/iuran/${record.id}`} className="btn btn-sm btn-info px-1 text-decoration-none" style={{paddingTop: "0.01rem", paddingBottom: "0.1rem"}}><FaEye size={15} color="white"/></NavLink>,
  },
];

export const coloumn_detail_iuran = (handleDataModal) => [
  {
    title: 'Bulan Pembayaran',
    dataIndex: 'paymentPeriod',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Tanggal Bayar',
    dataIndex: 'uploadDate',
    render: (uploadDate) => `${formatDate(uploadDate)}`,
    width: '20%',
  },
  {
    title: 'Bukti',
    dataIndex: 'fileId',
    fixed: 'right',
    width: 100,
    align: "center",
    render: (text, record) => <button type="button" className="btn btn-sm btn-info px-1" data-bs-toggle="modal"  data-bs-target="#detail" style={{paddingTop: "0.01rem", paddingBottom: "0.1rem"}} onClick={() => handleDataModal(record)}>Gambar</button>,
  },
  {
    title: 'Status',
    dataIndex: 'paymentStatus',
    width: '20%',
    align: 'center',
    render: (paymentStatus) => paymentStatus == 'Pending' ? <span className="badge bg-info">Pending</span> : <span className="badge bg-success">Success</span> ,
    filters: [
      {
        text: 'Berhasil',
        value: 'Succes',
      },
      {
        text: 'Pending',
        value: 'Pending',
      },
    ],
    onFilter: (value, record) => record.paymentStatus === value,
  },
  // {
  //   title: 'Verifikasi',
  //   dataIndex: 'gender',
  //   width: '20%',
  //   align: 'center',
  //   render: (gender) => gender == 'female' ? <FaRegCheckCircle size={15} color="green"/> : <FaCircleXmark size={15} color="red"/>,
  //   filters: [
  //     {
  //       text: 'Sukses',
  //       value: 'female',
  //     },
  //     {
  //       text: 'Gagal',
  //       value: 'male',
  //     },
  //   ],
  //   onFilter: (value, record) => record.gender === value,
  // },
];

export const coloumn_post = (handleDataModal, handleDeleteConfirmation) => [
  {
    title: 'Nama Konten',
    dataIndex: 'contentName',
    sorter: true,
    width: '20%',
  },
  {
      title: 'Cover / Banner',
      dataIndex: 'imageUrl',
      fixed: 'right',
      width: 100,
      align: "center",
      render: (text, record) => <a href="a" data-bs-toggle="modal"  data-bs-target="#detail" onClick={() => handleDataModal(record)}>Preview Content</a>,
  },
  {
    title: 'Halaman',
    dataIndex: 'page',
    width: '20%',
    align: 'center',
    render: (page) => page == '1' ? <span className="badge bg-info">Profil Pelatih</span> : <span className="badge bg-info">Gallery</span> ,
    filters: [
      {
        text: 'Profil Pelatih',
        value: '1',
      },
      {
        text: 'Gallery',
        value: '2',
      },
    ],
    onFilter: (value, record) => record.page === value,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    align: "center",
    render: (text, record) => {
      return <>
        <button
          onClick={() => handleDeleteConfirmation(record.id)}
          className="btn btn-sm btn-danger px-1 mx-1 text-decoration-none"
          style={{paddingTop: "0.01rem", paddingBottom: "0.1rem"}}
        >
          <FaTrash size={15} color="white"/>
        </button>
      </>
    },
  },
];

export const coloumn_status_pembayaran = [
  {
    title: 'Bulan Pembayaran',
    dataIndex: 'paymentPeriod',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Tanggal Upload',
    dataIndex: 'uploadDate',
    render: (uploadDate) => `${formatDate(uploadDate)}`,
    width: '20%',
  },
  {
    title: 'Pembayaran',
    dataIndex: 'amount',
    render: (amount) => `${formatRupiah(amount)}`,
    sorter: true,
    width: '20%',
  },
  {
    title: 'Status Pembayaran',
    dataIndex: 'paymentStatus',
    width: '20%',
    align: 'center',
    render: (paymentStatus) => paymentStatus == 'Pending' ? <span className="badge bg-info">Pending</span> : <span className="badge bg-success">Success</span> ,
    filters: [
      {
        text: 'Berhasil',
        value: 'Succes',
      },
      {
        text: 'Pending',
        value: 'Pending',
      },
    ],
    onFilter: (value, record) => record.paymentStatus === value,
  },
];