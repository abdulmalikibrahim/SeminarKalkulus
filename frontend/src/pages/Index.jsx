import React from 'react';
import Header from '../component/Index/Header';
import Content from '../component/Index/Content';
import Panitia from '../component/Index/Panitia';
import FormRegister from '../component/Index/FormRegister';

const Index = ({...props}) => {
    return (
        <>
            <div className="bee-page-container mt-5">
                <Header 
                    seminar={props.seminar} 
                    title={props.title} 
                    tagLine={props.tagLine}
                    tanggalSeminar={props.tanggalSeminar}
                    imageNarsum={props.imageNarsum}
                />
                <Content/>
                <Panitia/>
                <FormRegister tanggalSeminar={props.tanggalSeminar} seminar={props.seminar} />
            </div>
        </>
    )
}

export default Index;