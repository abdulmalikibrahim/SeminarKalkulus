import React, { useState } from 'react';
import Confetti from '../Confetti';
import '../../assets/style.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

const FormRegister = () => {
    const [confetti, setConfetti] = useState(false)

    return (
        <>
        <div style={{position:"fixed", top:"35%", right:"50%",zIndex:1000}}>
            {confetti && <Confetti confetti={true}/>}
        </div>
        <Main>
            <Header />
            <Form setConfetti={setConfetti} />
        </Main>
        </>
    )
}

const Main = ({children}) => {
    return (
        <>
        <div className="bee-row bee-row-12" id="registrasi">
            <div className="bee-row-content">
                <div className="bee-col bee-col-1 bee-col-w12">
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
    return (
        <>
        <div className="bee-block bee-block-1 bee-spacer">
            <div className="spacer" style={{ height: 45 }} />
        </div>
        <div className="bee-block bee-block-2 bee-heading">
            <h2 style={{
                color: "#000000",
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
                <span className="tinyMce-placeholder"> Jangan lewatkan kesempatan </span>{" "}
            </h2>
        </div>
        <div className="bee-block bee-block-3 bee-paragraph">
            <p> March, 20 <sup>th</sup> 2024 | 3:00 p.m. EST </p>
        </div>
        <div className="bee-block bee-block-4 bee-spacer">
            <div className="spacer" style={{ height: 15 }} />
        </div>
        <div className="bee-block bee-block-5 bee-paragraph">
            <p>Lengkapi form dan daftar untuk webinar</p>
        </div>
        </>
    )
}

const Form = ({setConfetti}) => {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    const [otherUniversity, setotherUniversity] = useState("")
    const [nim, setnim] = useState("")
    const [kelas, setkelas] = useState("")
    const [namaLengkap, setnamaLengkap] = useState("")
    const [nomorHP, setnomorHP] = useState("")
    const [email, setemail] = useState("")
    const [dataError, setdataError] = useState({
        universitas:"",
        otherUniversity:"",
        nim:"",
        kelas:"",
        namaLengkap:"",
        nomorHP:"",
        email:""
    })
    const [showOtherUniv, setShowOtherUniv] = useState(false)
    const [showNIM, setShowNIM] = useState(true)
    const [showKelas, setShowKelas] = useState(true)
    const [universitas, setuniversitas] = useState("Universitas Pelita Bangsa")
    const [labelRegister, setLabelRegister] = useState('Register Now')
    
    const handleChangeUniv = (e) => {
        const value = e.target.value;
        setuniversitas(value)
        if(value === "Other"){
            setShowOtherUniv(true);
            setShowNIM(false)
            setShowKelas(false)
        }else{
            setShowOtherUniv(false);
            setShowNIM(true)
            setShowKelas(true)
        }
    }

    const API_URL = `${window.location.protocol}//${window.location.hostname}:5000/api`
    const handleRegister = async () => {
        setLabelRegister(<><i className='fas fa-spinner fa-spin'></i>&nbsp;&nbsp;Registering...</>)
        try {
            const dataInput = {
                universitas:universitas,
                otherUniversity:otherUniversity,
                nim:nim,
                kelas:kelas,
                namaLengkap:namaLengkap,
                nomorHP:nomorHP,
                email:email
            }
            const insertData = await fetch(`${API_URL}/addParticipant`,{
                method:"POST",
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify(dataInput)
            })
            const result = await insertData.json()

            if(insertData.ok){
                setConfetti(true);
                localStorage.setItem("seminarKalkulus",JSON.stringify(dataInput))
                const successMessage = (
                    <>
                        <h1 style={{fontFamily:"Pacifico", fontSize:"3rem"}} className='mb-3'>Terimakasih</h1>
                        <p className='m-0 mt-2' style={{fontFamily:"Poppins"}}>
                            Selalu ingat tanggal seminar yah.<br/>
                            Silahkan klik tombol "Peraturan Seminar" dan mohon untuk bisa membaca dan mengikutinya.
                        </p>
                    </>
                )
                MySwal.fire({
                    html: successMessage,
                    showConfirmButton:true,
                    confirmButtonText:"Peraturan Seminar",
                    allowOutsideClick: false,
                    customClass:{
                        popup:"bg-transparent",
                        container:"bg-container-swal"
                    }
                }).then((result) => {
                    if(result.isConfirmed){
                        navigate('/peraturanSeminar')
                        setLabelRegister('Register Now')
                    }
                })
            }else{
                const errors = result.errors
                if(!Array.isArray(errors)){
                    return MySwal.fire({
                        title:"Error",
                        html:result.errors,
                        icon:"error"
                    })
                    console.log(errors)
                }
                
                const jsonErrors = errors.reduce((acc, error) => {
                    if (acc[error.path]) {
                        acc[error.path].push(error.msg);
                    } else {
                        acc[error.path] = [error.msg];
                    }
                    return acc;
                }, {});

                if(jsonErrors){
                    setdataError({
                        universitas: jsonErrors.universitas ? jsonErrors.universitas.join("\n") : "",
                        otherUniversity: jsonErrors.otherUniversity ? jsonErrors.otherUniversity.join("\n") : "",
                        nim: jsonErrors.nim ? jsonErrors.nim.join("\n") : "",
                        kelas: jsonErrors.kelas ? jsonErrors.kelas.join("\n") : "",
                        namaLengkap: jsonErrors.namaLengkap ? jsonErrors.namaLengkap.join("\n") : "",
                        nomorHP: jsonErrors.nomorHP ? jsonErrors.nomorHP.join("\n") : "",
                        email: jsonErrors.email ? jsonErrors.email.join("\n") : "",
                    });
                }
            }
        } catch (error) {
            MySwal.fire({
                title:"Error",
                html:error.message,
                icon:"error"
            })
        } finally {
            setLabelRegister('Register Now')
            setTimeout(() => {
                setConfetti(false)
            }, 2000);
        }
    }

    return (
        <>
        <div className="bee-block bee-block-6 bee-form">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-5">
                    <div className="bee-form-row">
                        <div className="bee-field bee-field-universitas">
                            <label htmlFor="universitas">Asal Universitas</label>
                            <select name="universitas" id="universitas" onChange={(e) => handleChangeUniv(e)} className='form-control'>
                                <option>Universitas Pelita Bangsa</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <p className="text-danger m-0 fw-bold">{dataError.universitas}</p>
                    </div>
                    {
                        showOtherUniv && 
                        <div className="bee-form-row">
                            <div className="bee-field bee-field-otherUniversity">
                                <label htmlFor="otherUniversity">Nama Universitas</label>
                                <input id="otherUniversity" name="otherUniversity" required="" type="text" onKeyUp={(e) => setotherUniversity(e.target.value)} />
                                <p className="text-danger m-0 mt-1" style={{fontSize:"9pt"}}>*Tuliskan Umum jika anda peserta umum</p>
                            </div>
                            <p className="text-danger m-0 fw-bold">{dataError.otherUniversity}</p>
                        </div>
                    }
                    {
                        showNIM &&
                        <div className="bee-form-row">
                            <div className="bee-field bee-field-nim">
                                <label htmlFor="nim">NIM</label>
                                <input id="nim" name="nim" maxLength={11} required="" type="number" onKeyUp={(e) => setnim(e.target.value)} />
                            </div>
                            <p className="text-danger m-0 fw-bold">{dataError.nim}</p>
                        </div>
                    }
                    {
                        showKelas && 
                        <div className="bee-form-row">
                            <div className="bee-field bee-field-kelas">
                                <label htmlFor="kelas">Kelas</label>
                                <input id="kelas" name="kelas" maxLength={20} required="" type="text" onKeyUp={(e) => setkelas(e.target.value)} />
                            </div>
                            <p className="text-danger m-0 fw-bold">{dataError.kelas}</p>
                        </div>
                    }
                    <div className="bee-form-row">
                        <div className="bee-field bee-field-namaLengkap">
                            <label htmlFor="namaLengkap">Nama Lengkap <span className='text-danger' style={{fontSize:"9pt"}}>(Max. 25 Karakter)</span></label>
                            <input id="namaLengkap" maxLength={25} name="namaLengkap" required="" type="text" onKeyUp={(e) => setnamaLengkap(e.target.value)} />
                        </div>
                        <p className="text-danger m-0 fw-bold">{dataError.namaLengkap}</p>
                    </div>
                    <div className="bee-form-row">
                        <div className="bee-field bee-field-nomorHP">
                            <label htmlFor="nomorHP">No HP</label>
                            <input id="nomorHP" name="nomorHP" maxLength={14} required="" type="number" onKeyUp={(e) => setnomorHP(e.target.value)} />
                        </div>
                        <p className="text-danger m-0 fw-bold">{dataError.nomorHP}</p>
                    </div>
                    <div className="bee-form-row">
                        <div className="bee-field bee-field-email">
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" placeholder="" required="" type="text" onKeyUp={(e) => setemail(e.target.value)} />
                        </div>
                        <p className="text-danger m-0 fw-bold">{dataError.email}</p>
                    </div>
                    <div className="bee-form-row mt-2">
                        <div className="bee-field bee-field-r11c0m5i11">
                            <div className="bee-button-container">
                                <button onClick={handleRegister} id="r11c0m5i11" name="submit" type="submit" value="Register Now"> {labelRegister} </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default FormRegister;