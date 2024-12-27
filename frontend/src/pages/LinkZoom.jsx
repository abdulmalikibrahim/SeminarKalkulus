import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import CountDown from '../component/CountDown';

const LinkZoom = ({seminar,timeStart}) => {
    const [urlZoom,seturlZoom] = useState(false)
    const [form,setform] = useState(false)
    return(
        <Main>
            <Header />
            { form && <FormLink seturlZoom={seturlZoom} seminar={seminar} /> }
            <Content urlZoom={urlZoom} seturlZoom={seturlZoom} setform={setform} timeStart={timeStart} />
        </Main>
    )
}

const Main = ({children}) => {
    return (
        <>
        <div className="bee-page-container mt-5 bg-page-image" style={{paddingBottom:"8rem", minHeight:"100vh", height:"100%"}}>
            <div className="row d-flex justify-content-center" style={{width:"100%"}}>
                <div className="col-lg-5 col-10 mt-5 text-center">
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

const Header = () => {
    return(
        <>
            <div className='mb-4'><h1><i className='fas fa-video pe-2'></i>Link Zoom</h1></div>
        </>
    )
}

const Content = ({urlZoom,setform,timeStart}) => {
    const [info,setinfo] = useState("")
    const now = new Date(); // Current date and time
    const targetDate = new Date(timeStart); // Target date in ISO format
    const [showCountDown,setshowCountDown] = useState(false)

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
            setform(true)
            setshowCountDown(false)
        }else{
            setshowCountDown(true)
            setform(false)
            setinfo(<><p style={{fontFamily:"Poppins"}}>Link zoom akan dapat di akses pada tanggal<br/>{formatDate(targetDate).replace("at","")} WIB</p><p className='mt-3'>Mohon jangan gunakan link zoom yang di share oleh siapapun karena akan mempengaruhi absen anda untuk cetak sertifikat.</p><p style={{fontFamily:"Poppins"}}>Terimakasih</p></>)
        }
    }, []);

    return(
        <>
            {showCountDown && <CountDown targetDate={targetDate} />}
            <div className="card border-0" style={{background:"rgba(0,0,0,0)"}}>
                <div className="card-body p-2">
                    {
                        urlZoom && 
                        <>
                            <h5 className='mt-3'>Silahkan klik tombol di bawah ini</h5>
                            <a className='btn btn-info mt-2' href='https://us06web.zoom.us/j/82635874391?pwd=TKb5m6hm1rDTZULKpXXbRIwS3ooUvb.1' target='_blank'><i className="fas fa-video pe-2"></i>Open Zoom</a>
                        </>
                    }
                </div>
                {
                    info && <h4>{info}</h4>
                }
            </div>
        </>
    )
}

const FormLink = ({seturlZoom,seminar}) => {
    let session = localStorage.getItem("seminarKalkulus")
    let emailSave = ""
    if(session){
        session = JSON.parse(session)
        emailSave = session.email ? session.email : ""
    }
    const defaultLabelButton = <><i className='fas fa-search me-2'></i>Dapatkan Link</>
    const [buttonLabel, setbuttonLabel] = useState(defaultLabelButton)
    const [email, setEmail] = useState(emailSave);
    const getLink = async () => {
        seturlZoom(false)
        try {
            setbuttonLabel(<><i className='fas fa-spinner fa-spin m-0'></i>&nbsp;&nbsp;Mencatat Absen Anda...</>)
            const API_URL = process.env.REACT_APP_API_URL
            const result = await fetch(`${API_URL}/attendanceParticipant`,{
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
                    setTimeout(() => {
                        setbuttonLabel(<><i className='fas fa-spinner fa-spin m-0'></i>&nbsp;&nbsp;Absen Berhasil.</>)
                    }, 1000);
                    setTimeout(() => {
                        seturlZoom(true)
                        setbuttonLabel(defaultLabelButton)
                    }, 2000);
                }else{
                    Swal.fire({
                        title:"Error",
                        html:"Email anda tidak terdaftar",
                        icon:"error",
                    })
                }
            }else{
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
            <button className='btn btn-info' onClick={() => getLink()}>{buttonLabel}</button>
        </>
    )
}

export default LinkZoom;