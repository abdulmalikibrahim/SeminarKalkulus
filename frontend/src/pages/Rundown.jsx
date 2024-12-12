import React from 'react';
import '../assets/style.css'

const Rundown = () => {
    return(
        <div className="bee-page-container mt-5">
            <Index/>
        </div>
    )
}

const Index = () => {
    let nomor = 1;
    return(
        <div className='bg-page-image ps-3 pe-3'>
            <div className="bee-row bee-row-4" style={{backgroundColor:"rgba(0,0,0,0)"}}>
                <div className="bee-row-content" style={{backgroundColor:"rgba(0,0,0,0)"}}>
                    <div className="bee-col bee-col-1 bee-col-w12">
                        <div className="bee-block bee-block-1 bee-spacer">
                            <div className="spacer" style={{ height: 55 }} />
                        </div>
                        <div className="bee-block bee-block-3 bee-heading">
                            <h2 style={{
                                color: "#2b2b2b",
                                direction: "ltr",
                                fontFamily:
                                    "Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif",
                                fontSize: 30,
                                fontWeight: 700,
                                letterSpacing: "normal",
                                lineHeight: "120%",
                                textAlign: "center",
                                marginTop: 0,
                                marginBottom: 0
                                }}>
                                <span className="tinyMce-placeholder"> Rundown Acara : </span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row d-flex justify-content-center' style={{width:"100%"}}>
                <div className='col-lg-9'>
                    <table className='table table-sm table-borderless table-hover'>
                        <thead className='thead-light'>
                            <tr className='text-center' style={{fontSize:"9pt"}}>
                                <th className='pt-3 pb-3 align-middle bg-orange text-light'>No</th>
                                <th className='pt-3 pb-3 align-middle bg-orange text-light'>Jam</th>
                                <th className='pt-3 pb-3 align-middle bg-orange text-light' style={{minWidth:"100px"}}>Durasi</th>
                                <th className='pt-3 pb-3 align-middle bg-orange text-light'>Isi Acara</th>
                                <th className='pt-3 pb-3 align-middle bg-orange text-light'>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{fontSize:"9pt"}} className='align-middle table-light text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>30 Menit</td>
                                <td className='bg-orange-soft text-start'>Persiapan Acara</td>
                                <td className='bg-orange-soft align-middle' rowSpan={2}>Panitia</td>
                            </tr>
                            <tr style={{fontSize:"9pt"}} className='align-middle text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>20 Menit</td>
                                <td className='bg-orange-soft text-start'>Peserta memasuki Zoom Meet</td>
                            </tr>
                            <tr style={{fontSize:"9pt"}} className='align-middle table-light text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>5 Menit</td>
                                <td className='bg-orange-soft text-start'>Pembukaan</td>
                                <td className='bg-orange-soft align-middle' rowSpan={2}>MC</td>
                            </tr>
                            <tr style={{fontSize:"9pt"}} className='align-middle table-light text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>5 Menit</td>
                                <td className='bg-orange-soft text-start'>Pembukaan Ayat Suci Al-Quran dan Pembacaan Do'a</td>
                            </tr>
                            <tr style={{fontSize:"9pt"}} className='align-middle table-light text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>5 Menit</td>
                                <td className='bg-orange-soft text-start'>Menyanyikan lagu Indonesia Raya dan Mars UPB</td>
                                <td className='bg-orange-soft'>Panitia</td>
                            </tr>
                            <tr style={{fontSize:"9pt"}} className='align-middle table-light text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>5 Menit</td>
                                <td className='bg-orange-soft text-start'>Sambutan Ketua Pelaksana</td>
                                <td className='bg-orange-soft'>Zaxwan</td>
                            </tr>
                            <tr style={{fontSize:"9pt"}} className='align-middle table-light text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>10 Menit</td>
                                <td className='bg-orange-soft text-start'>Sambutan Dosen Kalkulus</td>
                                <td className='bg-orange-soft'>Pak Darmanto</td>
                            </tr>
                            <tr style={{fontSize:"9pt"}} className='align-middle table-light text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>5 Menit</td>
                                <td className='bg-orange-soft text-start'>Pembukaan CV Moderator</td>
                                <td className='bg-orange-soft'>MC</td>
                            </tr>
                            <tr style={{fontSize:"9pt"}} className='align-middle table-light text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>5 Menit</td>
                                <td className='bg-orange-soft text-start'>Pembukaan Moderator dan Pembacaan CV Pemateri</td>
                                <td className='bg-orange-soft'>Moderator</td>
                            </tr>
                            <tr style={{fontSize:"9pt"}} className='align-middle table-light text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>50 Menit</td>
                                <td className='bg-orange-soft text-start'>Pemaparan Materi</td>
                                <td className='bg-orange-soft'>Pemateri</td>
                            </tr>
                            <tr style={{fontSize:"9pt"}} className='align-middle table-light text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>10 Menit</td>
                                <td className='bg-orange-soft text-start'>Sesi QnA</td>
                                <td className='bg-orange-soft'>Moderator, Pemateri & Peserta</td>
                            </tr>
                            <tr style={{fontSize:"9pt"}} className='align-middle table-light text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>5 Menit</td>
                                <td className='bg-orange-soft text-start'>Penutupan dan penyerahan sertifikat secara simbolis kepada pemateri oleh moderator sekaligus dokumentasi</td>
                                <td className='bg-orange-soft'>Moderator & Pemateri</td>
                            </tr>
                            <tr style={{fontSize:"9pt"}} className='align-middle table-light text-center'>
                                <td className='bg-orange-soft'>{nomor++}</td>
                                <td className='bg-orange-soft'></td>
                                <td className='bg-orange-soft'>5 Menit</td>
                                <td className='bg-orange-soft text-start'>Penutupan, Sesi Dokumentasi dan Presensi Peserta</td>
                                <td className='bg-orange-soft'>Seluruh Panitia & Peserta</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Rundown;