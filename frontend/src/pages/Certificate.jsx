import React, { useEffect, useRef, useState } from 'react';
import "../assets/style.css"
import { toPng } from 'html-to-image';
import Swal from 'sweetalert2'
import CountDown from '../component/CountDown';

const Certificate = ({seminar,timeStart}) => {
    const [search, setSearch] = useState(false)
    const [showCountDown, setshowCountDown] = useState(false)
    const [namaPeserta, setnamaPeserta] = useState("");
    const [title, settitle] = useState("Download Sertifikat")
    const [loadingCert, setloadingCert] = useState(false)
    const [showCertificate, setshowCertificate] = useState(false)
    const [info,setinfo] = useState("")
    const now = new Date() // Target date in ISO format
    const targetDate = new Date(timeStart) // Target date in ISO format

    useEffect(() => {
        const formatDate = (date) => {
            const options = {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            };
            return date.toLocaleString('en-GB', options).replace(',', '');
        };

        if(now >= targetDate){
            setinfo("")
            setshowCountDown(false)
        }else{
            setinfo(<><p style={{fontFamily:"Poppins"}}>Sertifikat akan dapat di akses pada tanggal<br/>{formatDate(targetDate).replace("at","")} WIB</p><p style={{fontFamily:"Poppins"}}>Terimakasih</p></>)
            setshowCountDown(true)
        }
    }, []);

    return(
        <Main search={search} namaPeserta={namaPeserta} loadingCert={loadingCert} showCertificate={showCertificate}>
            <Header title={title}/>
            { 
                showCountDown === false ? 
                <FormSearchEmail setSearch={setSearch} setnamaPeserta={setnamaPeserta} settitle={settitle} setloadingCert={setloadingCert} setshowCertificate={setshowCertificate} seminar={seminar} /> 
                :
                <>
                <CountDown targetDate={targetDate} />
                <h4>{info}</h4>
                </>
            }
        </Main>
    )
}

const Main = ({namaPeserta,loadingCert,showCertificate,children}) => {
    return (
        <>
        <div className="bee-page-container mt-5 bg-page-image" style={{paddingBottom:"8rem", minHeight:"100vh", height:"100%"}}>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-5 col-10 mt-5 text-center">
                    {children}
                    <div className="bee-block bee-block-7 bee-spacer">
                        <div className="spacer" style={{ height: 45 }} />
                    </div>
                </div>
            </div>
            {
                showCertificate && <ImageCertificate namaPeserta={namaPeserta} /> 
            }
            {
                loadingCert && <LoadingCertificate />
            }
        </div>
        </>
    )
}

const LoadingCertificate = () => {
    return(
        <div className='row d-flex justify-content-center'>
            <div className="col-lg-7 col-11">
                <div class="card-loading is-loading m-0 mt-3">
                    <div class="image"></div>
                </div>
            </div>
        </div>
    )
}

const Header = ({title}) => {
    return(
        <>
            <h1 className='mb-3' style={{fontFamily:"Pacifico", fontSize:"2rem"}}>{title}</h1>
        </>
    )
}

const FormSearchEmail = ({setSearch,setnamaPeserta,settitle,setloadingCert,setshowCertificate,seminar}) => {
    const session = localStorage.getItem("seminarKalkulus")
    let emailSave = ""
    if(session){
        const sessionData = JSON.parse(session)
        emailSave = sessionData.email ? sessionData.email : ""
    }
    const [email, setEmail] = useState(emailSave);

    const handleSearch = async () => {
        try {
            setshowCertificate(false)
            setloadingCert(true)
            settitle("Membuat Sertifikat...");
            const API_URL = process.env.REACT_APP_API_URL
            const result = await fetch(`${API_URL}/certificateParticipant`,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({
                    email:email,
                    seminar:seminar
                })
            })
            const data = await result.json();
            if(result.ok){
                if(data.data.length > 0){
                    const namaLengkap = data.data[0].namalengkap ? data.data[0].namalengkap : "-";
                    setnamaPeserta(namaLengkap)
                    setTimeout(() => {
                        settitle("Hampir Selesai...")
                    }, 2000);

                    setTimeout(() => {
                        setshowCertificate(true)
                        setloadingCert(false)
                        setSearch(true)
                        settitle("Sertifikat Berhasil Dibuat");
                    }, 4000);
                }else{
                    settitle("Download Sertifikat")
                    setloadingCert(false)
                    Swal.fire({
                        title:"Error",
                        html:data.errors,
                        icon:"error",
                    })
                }
            }else{
                setloadingCert(false)
                setSearch(false)
                settitle("Download Sertifikat")
                Swal.fire({
                    title:"Error",
                    html:data.errors,
                    icon:"error",
                })
            }
        } catch (error) {
            Swal.fire({
                title:"Error",
                html:error.message,
                icon:"error",
            })
        }
    }
    return(
        <>
            <input type="email" name='email' id='email' className="form-control mb-2" onChange={(e) => setEmail(e.target.value)} placeholder='Masukkan Email Anda' value={email} />
            <button className='btn btn-info' onClick={() => handleSearch()}><i className='fas fa-search me-2'></i>Cari</button>
        </>
    )
}

const ImageCertificate = ({namaPeserta}) => {
    const certificateRef = useRef(null)
    const defaultLabelDownload = <><i className="fas fa-download me-2"></i>Download</>
    const [labelDownload,setlabelDownload] = useState(defaultLabelDownload)

    const handleDownload = () => {
        if (certificateRef.current) {
            setlabelDownload(<><i className='fas fa-spinner fa-spin'></i><span className='ms-1'>Downloading...</span></>)
            toPng(certificateRef.current, { quality: 1.0 }) // Use toPng for PNG output
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `Sertifikat Kalkulus ${namaPeserta}.png`; // Save as PNG
                link.href = dataUrl;
                link.click();
                setlabelDownload(defaultLabelDownload)
            })
            .catch((err) => {
                console.error('Failed to generate image', err);
            });
        }
    };
    return(
        <div className='row d-flex justify-content-center'>
            <div className="col-lg-7 col-11" style={{position:"relative"}} ref={certificateRef}>
                <h2 className='name-participant'>{namaPeserta.toUpperCase()}</h2>
                <img src="/images/TTDKETUA.png" className='signature-ketua' />
                <img src="/images/TTDREKTOR.png" className='signature-rektor' />
                <img src="/images/SERTIFIKAT.jpg" width={"100%"} />
            </div>
            <div className="col-12 text-center mt-4">
                <button className="btn btn-info" onClick={handleDownload}>
                    {labelDownload}
                </button>
            </div>
        </div>
    )
}

export default Certificate;