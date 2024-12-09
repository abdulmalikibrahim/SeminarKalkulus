import React from 'react';
import { Link } from 'react-router-dom';

const PeraturanSeminar = () => {
    return(
        <Main>
            <Peraturan />
        </Main>
    )
}

const Main = ({children}) => {
    return (
        <>
        <div className="bg-page-image ps-2 pe-3 mt-5" style={{paddingBottom:"8rem", backgroundSize:"cover",minHeight:"100vh", height:"100%"}}>
            <div className="row justify-content-center">
                <div className='col-12 text-center mt-5'>
                    <h2 className='mb-3' style={{fontFamily:"Josefin Sans", fontSize:"4rem"}}>Peraturan Seminar</h2>
                </div>
                <div className="col-lg-8 col-11 text-center">
                    {children}
                    <div className="bee-block bee-block-7 bee-spacer">
                        <div className="spacer" style={{ height: 45 }} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

const Peraturan = () => {
    return(
        <ul className='text-start'>
            <li>Mohon sudah stand by di website ini setidak nya 10 menit sebelum di mulai</li>
            <li>Tidak menggunakan link yang di share oleh siapapun karena saat anda mendapatkan link dari orang lain anda akan di anggap tidak hadir</li>
            <li>Mohon untuk bisa <i className='fas fa-video'></i> ONCAM</li>
            <li>Mohon menggunakan kata-kata yang sopan saat bertanya.</li>
            <li>Anda bisa bertanya mengajukan pertanyaan saat pemateri berjalan melalui halaman <Link style={{textDecoration:"none"}} to="/linkzoom">Link Zoom</Link>, namun pertanyaan akan kami bacakan setelah pembahasan materi.</li>
        </ul>
    )
}

export default PeraturanSeminar;