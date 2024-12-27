import React from 'react';

const Panitia = ({...props}) => {
    const imageMC = `url('/${props.props.imageMC}')`;
    const imageModerator = `url('/${props.props.imageModerator}')`;
    const imageNarsum2 = `url('/${props.props.imageNarsum2}')`;
    return (
        <>
        <div className="bee-row bee-row-9">
            <div className="bee-row-content">
                <div className="bee-col bee-col-1 bee-col-w12">
                    <div className="bee-block bee-block-1 bee-spacer">
                        <div className="spacer" style={{ height: 50 }} />
                    </div>
                    <div className="bee-block bee-block-2 bee-heading">
                        <h3 style={{
                            color: "#ffffff",
                            direction: "ltr",
                            fontFamily:
                                "Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif",
                            fontSize: 18,
                            fontWeight: 400,
                            letterSpacing: "normal",
                            lineHeight: "120%",
                            textAlign: "center",
                            marginTop: 0,
                            marginBottom: 0
                            }}>
                            <span className="tinyMce-placeholder">SPEAKERS</span>{" "}
                        </h3>
                    </div>
                    <div className="bee-block bee-block-3 bee-heading">
                        <h2 style={{
                            color: "#ffffff",
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
                            <span className="tinyMce-placeholder">Learn From The Best</span>{" "}
                        </h2>
                    </div>
                    <div className="bee-block bee-block-4 bee-spacer">
                        <div className="spacer" style={{ height: 40 }} />
                    </div>
                </div>
            </div>
        </div>
        <div className="bee-row bee-row-10">
            <div className="bee-row-content reverse">
                <div className="bee-col bee-col-1 bee-col-w4">
                    <div className="bee-block bee-block-1 bee-image">
                        <div className="bee-center bee-autowidth" style={{backgroundImage:`${imageMC}`, width: 180, height: 180, backgroundSize:"cover", borderRadius:"50%"}}></div>
                    </div>
                    <div className="bee-block bee-block-2 bee-heading">
                        <h3 style={{
                            color: "#ffffff",
                            direction: "ltr",
                            fontFamily:
                                "Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif",
                            fontSize: 18,
                            fontWeight: 400,
                            letterSpacing: "normal",
                            lineHeight: "120%",
                            textAlign: "center",
                            marginTop: 0,
                            marginBottom: 0
                            }}>
                            <span className="tinyMce-placeholder">{props.props.nameMC}</span>{" "}
                        </h3>
                    </div>
                    <div className="bee-block bee-block-3 bee-paragraph">
                        <p>
                            <em>Master of Ceremony </em>
                        </p>
                    </div>
                </div>
                <div className="bee-col bee-col-2 bee-col-w4">
                    <div className="bee-block bee-block-1 bee-image">
                        <div className="bee-center bee-autowidth" style={{backgroundImage:`${imageNarsum2}`, width: 180, height: 180, backgroundSize:"cover", borderRadius:"50%"}}></div>
                    </div>
                    <div className="bee-block bee-block-2 bee-heading">
                        <h3 style={{
                            color: "#ffffff",
                            direction: "ltr",
                            fontFamily:
                                "Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif",
                            fontSize: 18,
                            fontWeight: 400,
                            letterSpacing: "normal",
                            lineHeight: "120%",
                            textAlign: "center",
                            marginTop: 0,
                            marginBottom: 0
                            }}>
                            <span className="tinyMce-placeholder">{props.props.nameNarsum}</span>{" "}
                        </h3>
                    </div>
                    <div className="bee-block bee-block-3 bee-paragraph">
                        <p>
                            <em> Narasumber </em>
                        </p>
                    </div>
                </div>
                <div className="bee-col bee-col-3 bee-col-w4">
                    <div className="bee-block bee-block-1 bee-image">
                        <div className="bee-center bee-autowidth" style={{backgroundImage:`${imageModerator}`, width: 180, height: 180, backgroundSize:"cover", borderRadius:"50%"}}></div>
                    </div>
                    <div className="bee-block bee-block-2 bee-heading">
                        <h3 style={{
                            color: "#ffffff",
                            direction: "ltr",
                            fontFamily:
                                "Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif",
                            fontSize: 18,
                            fontWeight: 400,
                            letterSpacing: "normal",
                            lineHeight: "120%",
                            textAlign: "center",
                            marginTop: 0,
                            marginBottom: 0
                            }}>
                            <span className="tinyMce-placeholder">{props.props.nameModerator}</span>{" "}
                        </h3>
                    </div>
                    <div className="bee-block bee-block-3 bee-paragraph">
                        <p>
                            <em> Moderator <br />
                            </em>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="bee-row bee-row-11">
            <div className="bee-row-content">
                <div className="bee-col bee-col-1 bee-col-w12">
                    <div className="bee-block bee-block-1 bee-spacer">
                        <div className="spacer" style={{ height: 40 }} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Panitia;