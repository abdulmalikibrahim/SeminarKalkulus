import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "bootstrap";

const Navbar = ({ pathName }) => {
    const navbarRef = useRef(null);
    const collapseRef = useRef(null);

    // Toggle navbar manually
    const toggleNavbar = () => {
        const navbar = navbarRef.current;
        const collapseInstance = collapseRef.current;

        if (navbar.classList.contains("show")) {
            collapseInstance.hide();
        } else {
            collapseInstance.show();
        }
    };

    // Close navbar when clicking outside
    const handleClickOutside = (event) => {
        if (
            navbarRef.current &&
            !navbarRef.current.contains(event.target) &&
            collapseRef.current &&
            navbarRef.current.classList.contains("show")
        ) {
            collapseRef.current.hide();
        }
    };

    useEffect(() => {
        // Initialize Collapse instance
        if (navbarRef.current) {
            collapseRef.current = new Collapse(navbarRef.current, { toggle: false });
        }

        // Add event listener for clicks
        document.addEventListener("click", handleClickOutside);

        return () => {
            // Clean up event listener
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <nav
            className="navbar navbar-expand-lg fixed-top"
            style={{ backgroundColor: "#ffece1" }}
        >
            <div className="container-fluid">
                <img
                    src="https://assets.nsd.co.id/images/kampus/logo/LOGO_UNIVERSITAS_PELITA_BANGSA.png"
                    alt="UNIVERSITAS PELITA BANGSA"
                    width="10%"
                    className="d-block d-lg-none"
                />
                <a className="navbar-brand m-0" style={{ fontFamily: "poppins" }}>
                    SEMINAR KALKULUS
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={toggleNavbar}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" ref={navbarRef}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item ms-lg-3">
                            <Link
                                to="/"
                                className={pathName === "/" ? "nav-link active" : "nav-link"}
                                aria-current="page"
                            >
                                <i className="me-lg-1 me-2 fas fa-home"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <Link
                                to="/rundown"
                                className={pathName === "/rundown" ? "nav-link active" : "nav-link"}
                                aria-label="Rundown"
                            >
                                <i className="me-lg-1 me-2 fas fa-calendar-alt"></i> Rundown
                            </Link>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <Link
                                to="/certificate"
                                className={pathName === "/certificate" ? "nav-link active" : "nav-link"}
                                aria-label="Sertifikat"
                            >
                                <i className="me-lg-1 me-2 fas fa-certificate"></i> Sertifikat
                            </Link>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <Link
                                to="/audience"
                                className={pathName === "/audience" ? "nav-link active" : "nav-link"}
                                aria-label="Link Zoom"
                            >
                                <i className="me-lg-1 me-2 fas fa-users"></i> Daftar Peserta
                            </Link>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <Link
                                to="/peraturanSeminar"
                                className={
                                    pathName === "/peraturanSeminar"
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                                aria-label="Syarat dan Ketentuan"
                            >
                                <i className="me-lg-1 me-2 fas fa-file-contract"></i> Peraturan
                            </Link>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <Link
                                to="/linkzoom"
                                className={pathName === "/linkzoom" ? "nav-link active" : "nav-link"}
                                aria-label="Link Zoom"
                            >
                                <i className="me-lg-1 me-2 fas fa-video"></i> Link Zoom
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
