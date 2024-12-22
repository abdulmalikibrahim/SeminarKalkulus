import React, { useEffect, useState } from 'react';

const Audience = ({seminar}) => {
    return(
        <Main>
            <ListParticipant seminar={seminar}/>
        </Main>
    )
}

const Main = ({children}) => {
    return (
        <>
        <div className="bg-page-image ps-2 pe-3 mt-5" style={{paddingBottom:"8rem", backgroundSize:"cover",minHeight:"100vh", height:"100%"}}>
            <div className="row justify-content-center">
                <div className='col-12 text-center mt-5'>
                    <h1 className='mb-3' style={{fontFamily:"Josefin Sans", fontSize:"4rem"}}>List Peserta</h1>
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

const ListParticipant = ({seminar}) => {
    const API_URL = process.env.REACT_APP_API_URL
    const [dataParticipant, setdataParticipant] = useState("")
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetch(`${API_URL}/getParticipant`,{
                    method:"POST",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({
                        seminar:seminar
                    })
                })
                const result = await data.json()
                if(data.ok){
                    setdataParticipant(result.data)
                }else{
                    setdataParticipant(<div>{result.errors}</div>)
                }
            } catch (error) {
                setdataParticipant(<div>{error.message}</div>)
            }
        }

        getData()
    },[])

    return(
        <div style={{overflow:"auto"}}>
            <table className="table table-hover table-borderless">
                <thead className="thead-light">
                    <tr style={{fontSize:"9pt"}}>
                        <th className='align-middle bg-orange text-light'>No</th>
                        <th className='align-middle bg-orange text-light'>Universitas</th>
                        <th className='align-middle bg-orange text-light'>Nama Lengkap</th>
                        <th className='align-middle bg-orange text-light'>Kelas</th>
                        <th className='align-middle bg-orange text-light'>Status Kehadiran</th>
                        <th className='align-middle bg-orange text-light'>Cetak Sertifikat</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataParticipant ?
                        dataParticipant.map((element,index) => {
                            return(
                                <tr key={index} style={{fontSize:"9pt"}}>
                                    <td className='align-middle bg-orange-soft'>{(index+1)}</td>
                                    <td className='align-middle bg-orange-soft'>{element["universitas"]}</td>
                                    <td className='align-middle bg-orange-soft'>{element["namalengkap"]}</td>
                                    <td className='align-middle bg-orange-soft'>{element["kelas"]}</td>
                                    <td className='align-middle bg-orange-soft'>{element["status_kehadiran"] === "Belum" ? <span className="badge bg-danger">Belum</span> :  <span className="badge bg-success">Hadir</span>}</td>
                                    <td className='align-middle bg-orange-soft'>{element["status_cetak_sertifikat"] === "Belum" ? <span className="badge bg-danger">Belum</span> :  <span className="badge bg-success">Sudah Cetak</span>}</td>
                                </tr>
                            )
                        }) : 
                        <tr style={{fontSize:"9pt"}}>
                            <td colSpan={5} className='text-center'>{dataParticipant.errors}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Audience;