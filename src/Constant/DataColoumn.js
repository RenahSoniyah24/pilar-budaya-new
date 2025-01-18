import {  
  formatDate
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
    dataIndex: 'name',
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Nomor Telpon',
    dataIndex: 'phone',
    width: '20%',
  },
  {
    title: 'Tanggal Daftar',
    dataIndex: 'registered',
    render: (registered) => `${formatDate(registered.date)}`,
    width: '20%',
  },
  {
    title: 'Verifikasi',
    dataIndex: 'gender',
    width: '20%',
    align: 'center',
    render: (gender) => gender == 'female' ? <FaRegCheckCircle size={15} color="green"/> : <FaCircleXmark size={15} color="red"/>,
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
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    align: "center",
    render: (text, record) => <button type="button" className="btn btn-sm btn-info px-1" data-bs-toggle="modal"  data-bs-target="#detail" style={{paddingTop: "0.01rem", paddingBottom: "0.1rem"}} onClick={() => handleDataModal(record)}><FaEye size={15} color="white"/></button>,
  },
];

export const coloumn_iuran = (handleDataModal) => [
  {
    title: 'Nama Lengkap',
    dataIndex: 'name',
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Nomor Telpon',
    dataIndex: 'phone',
    width: '20%',
  },
  {
    title: 'Kelas',
    dataIndex: 'gender',
    width: '20%',
    align: 'center',
    render: (gender) => gender == 'female' ? <span className="badge bg-info">Success</span> : <span className="badge bg-pink">Gagal</span>,
    filters: [
      {
        text: 'Dewasa',
        value: 'female',
      },
      {
        text: 'Anak',
        value: 'male',
      },
    ],
    onFilter: (value, record) => record.gender === value,
  },
  {
    title: 'Verifikasi',
    dataIndex: 'gender',
    width: '20%',
    align: 'center',
    render: (gender) => gender == 'female' ? <FaRegCheckCircle size={15} color="green"/> : <FaCircleXmark size={15} color="red"/>,
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
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    align: "center",
    render: (text, record) => <NavLink to={`/iuran/${record.dob.age}`} className="btn btn-sm btn-info px-1 text-decoration-none" style={{paddingTop: "0.01rem", paddingBottom: "0.1rem"}}><FaEye size={15} color="white"/></NavLink>,
  },
];

export const coloumn_detail_iuran = (handleDataModal) => [
  {
    title: 'Bulan',
    dataIndex: 'name',
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Tanggal Bayar',
    dataIndex: 'registered',
    render: (registered) => `${formatDate(registered.date)}`,
    width: '20%',
  },
  {
    title: 'Bukti',
    dataIndex: 'registered',
    render: (registered) => `${formatDate(registered.date)}`,
    width: '20%',
  },
  {
    title: 'Bukti',
    dataIndex: 'registered',
    fixed: 'right',
    width: 100,
    align: "center",
    render: (text, record) => <button type="button" className="btn btn-sm btn-info px-1" data-bs-toggle="modal"  data-bs-target="#detail" style={{paddingTop: "0.01rem", paddingBottom: "0.1rem"}} onClick={() => handleDataModal(record)}>Gambar</button>,
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
  {
    title: 'Verifikasi',
    dataIndex: 'gender',
    width: '20%',
    align: 'center',
    render: (gender) => gender == 'female' ? <FaRegCheckCircle size={15} color="green"/> : <FaCircleXmark size={15} color="red"/>,
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

export const coloumn_post = (handleDataModal) => [
  {
    title: 'Nama Konten',
    dataIndex: 'name',
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
      title: 'Cover / Banner',
      dataIndex: 'registered',
      fixed: 'right',
      width: 100,
      align: "center",
      render: (text, record) => <a href="a" data-bs-toggle="modal"  data-bs-target="#detail" onClick={() => handleDataModal(record)}>{record.name.first}</a>,
    },
  {
    title: 'Halaman',
    dataIndex: 'name',
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    align: "center",
    render: (text, record) => {
      return <>
        <NavLink to={`/post/form/${record.dob.age}`} className="btn btn-sm btn-warning px-1 mx-1 text-decoration-none" style={{paddingTop: "0.01rem", paddingBottom: "0.1rem"}}><FaPencilAlt size={15} color="white"/></NavLink>
        <NavLink to={`/post/form/${record.dob.age}`} className="btn btn-sm btn-danger px-1 mx-1 text-decoration-none" style={{paddingTop: "0.01rem", paddingBottom: "0.1rem"}}><FaTrash size={15} color="white"/></NavLink>
      </>
    },
  },
];