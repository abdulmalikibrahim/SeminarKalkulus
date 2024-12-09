import React from 'react';
import Header from '../component/Index/Header';
import Content from '../component/Index/Content';
import Panitia from '../component/Index/Panitia';
import FormRegister from '../component/Index/FormRegister';

const Index = () => {
    return (
        <>
            <div className="bee-page-container mt-5">
                <Header/>
                <Content/>
                <Panitia/>
                <FormRegister/>
            </div>
        </>
    )
}

export default Index;