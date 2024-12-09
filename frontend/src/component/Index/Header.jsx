import React from 'react';

const Header = () => {
    return (
        <>
            <div className="bee-row bee-row-2">
                <div className="row">
                    <div className="col-lg-3 pt-4 text-center">
                        <img src="https://assets.nsd.co.id/images/kampus/logo/LOGO_UNIVERSITAS_PELITA_BANGSA.png" alt="UNIVERSITAS PELITA BANGSA" width="35%" />
                    </div>
                    <div className="col-lg-9 d-flex justify-content-lg-start justify-content-center align-items-center mt-3 p-0">
                        <h3 className="m-0 d-lg-none d-block" style={{ fontFamily: "poppins" }}> UNIVERSITAS PELITA BANGSA </h3>
                        <h1 className="m-0 d-lg-block d-none" style={{ fontFamily: "poppins", fontSize: "3rem" }}> UNIVERSITAS PELITA BANGSA </h1>
                    </div>
                </div>
                <div className="bee-row-content">
                    <div className="bee-col bee-col-1 bee-col-w6 p-0">
                        <div className="bee-block bee-block-1 bee-spacer">
                            <div className="spacer" style={{ height: 50 }} />
                        </div>
                        <div className="bee-block bee-block-2 bee-spacer">
                            <div className="spacer" style={{ height: 50 }} />
                        </div>
                        <div className="bee-block bee-block-3 bee-image">
                            <img alt="" className="bee-autowidth" src="images/webinar-icon.png" style={{ maxWidth: 142 }} />
                        </div>
                        <div className="bee-block bee-block-4 bee-heading">
                            <h1 style={{
                    color: "#000000",
                    direction: "ltr",
                    fontFamily:
                        "Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif",
                    fontSize: 47,
                    fontWeight: 700,
                    letterSpacing: "normal",
                    lineHeight: "120%",
                    textAlign: "left",
                    marginTop: 0,
                    marginBottom: 0
                    }}> Webinar Kalkulus{" "} </h1>
                        </div>
                        <div className="bee-block bee-block-5 bee-paragraph">
                            <p> Penggunaan Dasar Matematika <br /> dalam pembuatan struktur pembangunan </p>
                        </div>
                        <div className="bee-block bee-block-6 bee-icons">
                            <div className="bee-icon bee-icon-last">
                                <div className="bee-content">
                                    <div className="bee-icon-label bee-icon-label-right"> Dec, 22th 2024 | 6:30 p.m. EST </div>
                                </div>
                            </div>
                        </div>
                        <div className="bee-block bee-block-7 bee-button">
                            <a className="bee-button-content" href="#registrasi" style={{
                    fontSize: 16,
                    backgroundColor: "#124e78",
                    borderBottom: "0px solid transparent",
                    borderLeft: "0px solid transparent",
                    borderRadius: 4,
                    borderRight: "0px solid transparent",
                    borderTop: "0px solid transparent",
                    color: "#ffffff",
                    direction: "ltr",
                    fontFamily: "inherit",
                    fontWeight: 400,
                    maxWidth: "100%",
                    paddingBottom: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 5,
                    width: "auto",
                    display: "inline-block"
                    }}>
                                <span style={{
                        wordBreak: "break-word",
                        fontSize: 16,
                        lineHeight: "200%"
                    }}> Register Now </span>
                            </a>
                        </div>
                        <div className="bee-block bee-block-9 bee-spacer">
                            <div className="spacer" style={{ height: 50 }} />
                        </div>
                    </div>
                    <div className="bee-col bee-col-2 bee-col-w6">
                        <div className="bee-block bee-block-1 bee-image" style={{position:"relative"}}>
                            <img alt="Portrait of a young man with glasses" className="bee-right bee-fixedwidth" src="images/web-hero-photo.png" style={{ maxWidth: 350 }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bee-row bee-row-3">
                <div className="bee-row-content">
                    <div className="bee-col bee-col-1 bee-col-w12">
                        <div className="bee-block bee-block-1 bee-spacer">
                            <div className="spacer" style={{ height: 45 }} />
                        </div>
                        <div className="bee-block bee-block-2 bee-heading">
                            <h3 style={{
                    color: "#ffffff",
                    direction: "ltr",
                    fontFamily:
                        "Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: "normal",
                    lineHeight: "150%",
                    textAlign: "center",
                    marginTop: 0,
                    marginBottom: 0
                    }}>
                                <span className="tinyMce-placeholder"> Implementasi Kalkulus, <br /> Dalam kehidupan sehari-hari.{" "} </span>{" "}
                            </h3>
                        </div>
                        <div className="bee-block bee-block-3 bee-spacer">
                            <div className="spacer" style={{ height: 45 }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;