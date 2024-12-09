import React, { useEffect, useRef, useState } from 'react';
import "../assets/style.css"
import { toPng } from 'html-to-image';
import Swal from 'sweetalert2'

const Certificate = () => {
    const [search, setSearch] = useState(false)
    const [showCountdown, setshowCountdown] = useState(true)
    const [namaPeserta, setnamaPeserta] = useState("");
    const [title, settitle] = useState("Download Sertifikat")
    const [loadingCert, setloadingCert] = useState(false)
    const [showCertificate, setshowCertificate] = useState(false)
    return(
        <Main search={search} namaPeserta={namaPeserta} loadingCert={loadingCert} showCertificate={showCertificate}>
            <Header title={title}/>
            { 
                showCountdown === false ? <FormSearchEmail setSearch={setSearch} setnamaPeserta={setnamaPeserta} settitle={settitle} setloadingCert={setloadingCert} setshowCertificate={setshowCertificate} /> : ""
            }
            {
                showCountdown && <CountDown setshowCountdown={setshowCountdown} />
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

const CountDown = ({setshowCountdown}) => {
    const [countdown,setcountdown] = useState("")
    const [info,setinfo] = useState("")
    const targetDate = new Date("2024-12-22T20:00:00") // Target date in ISO format

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date(); // Current date and time
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                
                setshowCountdown(true)
                setcountdown(<p>{days} Days, {hours} Hours, {minutes} Minutes, {seconds} Seconds</p>)
                setinfo(<><p>Sertifikat akan dapat di akses pada tanggal 22 Desember 2024 20:00 WIB</p><p>Terimakasih</p></>)
            } else {
                setinfo("")
                setshowCountdown(false)
                setcountdown("")
                clearInterval(timer)
            }
        };

        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, []);

    return(
        <>
            <h4>{countdown}</h4>
            <h5>{info}</h5>
        </>
    )
}

const FormSearchEmail = ({setSearch,setnamaPeserta,settitle,setloadingCert,setshowCertificate}) => {
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
            settitle("Creating Certificate...");
            const API_URL = process.env.REACT_APP_API_URL
            const result = await fetch(`${API_URL}/certificateParticipant`,{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({
                    email:email,
                })
            })
            const data = await result.json();
            if(result.ok){
                if(data.data.length > 0){
                    const namaLengkap = data.data[0].namalengkap ? data.data[0].namalengkap : "-";
                    setnamaPeserta(namaLengkap)
                    setTimeout(() => {
                        settitle("Almost Done...")
                    }, 2000);

                    setTimeout(() => {
                        setshowCertificate(true)
                        setloadingCert(false)
                        setSearch(true)
                        settitle("Your Certificate Finished");
                    }, 4000);
                }else{
                    setloadingCert(false)
                    Swal.fire({
                        title:"Error",
                        html:"Email anda tidak terdaftar",
                        icon:"error",
                    })
                }
            }else{
                setloadingCert(false)
                setSearch(false)
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

    const handleDownload = () => {
        if (certificateRef.current) {
            toPng(certificateRef.current, { quality: 1.0 }) // Use toPng for PNG output
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'certificate.png'; // Save as PNG
                    link.href = dataUrl;
                    link.click();
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
                    <i className="fas fa-download me-2"></i>Download
                </button>
            </div>
        </div>
    )
}

export default Certificate;