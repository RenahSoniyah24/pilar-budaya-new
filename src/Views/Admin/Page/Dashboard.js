import React, { useEffect, useState } from 'react';
import Admin from '../Index';
import { Bar } from 'react-chartjs-2';
import { getGraphService } from '../../../Services/ServicesAPI';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import {  
  formatRupiah
} from '../../../../src/Formatter/Text';

function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataGraph, setDataGraph] = useState({
    labels: [],
    datasets: [],
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Report Bulanan',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis from zero
      },
    },
  };

  const processChartData = (response) => {
    if (response?.data) {
      const validMonths = [
        "Januari", "Februari", "Maret", "April", "Mei", 
        "Juni", "Juli", "Agustus", "September", "Oktober", 
        "November", "Desember"
      ];

      const sortedData = response.data
        .filter((item) => validMonths.includes(item.bulan))
        .sort((a, b) => validMonths.indexOf(a.bulan) - validMonths.indexOf(b.bulan));

      const labels = sortedData.map((item) => item.bulan);
      const totalPayments = sortedData.map((item) => item.totalPembayaranIuran);
      const totalVerifiedPayments = sortedData.map((item) => item.totalPembayaranIuranTerverifikasi);

      return {
        labels,
        datasets: [
          {
            label: "Total Payments",
            data: totalPayments,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Verified Payments",
            data: totalVerifiedPayments,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };
    }
    return {
      labels: [],
      datasets: [],
    };
  };

  const handleData = async () => {
    setLoading(true);
    const response = await getGraphService();
    if (response) {
      setData(response);
      const processedGraphData = processChartData(response);
      setDataGraph(processedGraphData);
    } else {
      setData({});
      setDataGraph({
        labels: [],
        datasets: [],
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      <Admin>
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-4">
              <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-line fa-3x text-primary" />
                <div className="ms-3">
                  <p className="mb-2">Total Pendaftar</p>
                  <h6 className="mb-0 text-right">
                    {loading ? <Skeleton width={80} /> : `${data?.totalAkun ?? '0'} orang`}
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-xl-4">
              <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-area fa-3x text-primary" />
                <div className="ms-3">
                  <p className="mb-2">Total Pendaftar Aktif</p>
                  <h6 className="mb-0 text-right">
                    {loading ? <Skeleton width={80} /> : `${data?.totalAkunAktif ?? '0'} orang`}
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-xl-4">
              <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-bar fa-3x text-primary" />
                <div className="ms-3">
                  <p className="mb-2">Biaya Daftar</p>
                  <h6 className="mb-0 text-right">
                    {loading ? <Skeleton width={100} /> : `${formatRupiah(data?.totalBiayaPendaftar ?? 0)}`}
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-xl-6">
              <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-pie fa-3x text-primary" />
                <div className="ms-3">
                  <p className="mb-2">Total Biaya Pendaftar Terverifikasi</p>
                  <h6 className="mb-0 text-right">
                    {loading ? <Skeleton width={100} /> : formatRupiah(data?.totalBiayaPendaftarTerverifikasi ?? 0)}
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-xl-6">
              <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-pie fa-3x text-primary" />
                <div className="ms-3">
                  <p className="mb-2">Total Biaya Belum Terverifikasi</p>
                  <h6 className="mb-0 text-right">
                    {loading ? <Skeleton width={100} /> : formatRupiah(data?.totalBiayaPendaftarBelumTerverifikasi ?? 0)}
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-xl-12">
              {loading ? (
                <Skeleton height={400} />
              ) : (
                <Bar data={dataGraph} options={options} />
              )}
            </div>
          </div>
        </div>
      </Admin>
    </>
  );
}

export default Dashboard;
