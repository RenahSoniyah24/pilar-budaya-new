import React, { useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import '../../style/style.scss';

function Profil(props) {
  useEffect(()=>{
  },[])

  return (
    <>
      <Navbar/>

        <section className="hero">
          <img src="assets/images/Penari.png" alt="Penari" />
        </section>

        <section className="content-section">
          <div className="container">
            <h2>Sanggar Pilar Budaya</h2>
            <p style={{textAlign: "justify"}}>
              Sanggar Pilar Budaya didirikan pada tanggal 9 Januari 2022 sebagai
              sanggar yang mewadahi anak-anak, remaja, ataupun dewasa untuk belajar
              tradisi nusantara dengan menggunakan sistem berbasis pendidikan seni
              tari. Kehadiran sanggar ini bertujuan untuk membangkitkan semangat
              kebersamaan melalui seni dan budaya, menjadi wadah ekspresi sekaligus
              pelestarian nilai-nilai tradisi.
            </p>
            <p style={{textAlign: "justify"}}>
              Event pertama yang diadakan adalah Festival Seni dan Budaya Nusantara,
              yang mempertemukan berbagai komunitas untuk menampilkan keragaman
              budaya Indonesia melalui tari, musik, dan pameran kerajinan lokal.
            </p>
            <p style={{textAlign: "justify"}}>
              Dengan visi menjadi pilar pelestarian budaya Indonesia yang dinamis
              dan berkelanjutan, Sanggar Pilar Budaya mengusung slogan
              <em>“Menguatkan Pilar Budaya, Menghubungkan Nusantara”</em>. Sanggar
              ini memiliki misi untuk melestarikan tradisi melalui pelatihan dan
              workshop, membuka ruang kolaborasi antara para pelaku seni, serta
              mengembangkan kreativitas anak bangsa melalui pementasan seni yang
              berkelanjutan.
            </p>
          </div>
        </section>

      <Footer/>
    </>
  );
}

export default Profil;