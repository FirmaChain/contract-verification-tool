import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Body from "components/layout/body";
import Header from "organisms/header";
import MainPage from "./mainPage";
import Footer from "organisms/footer";
import UploadPage from "./uploadPage";
import './routes.css'
import Common from "organisms/common";
import VerificationPage from "./verificationPage";

const PagesRoutes = () => {
    const PageMain = <MainPage />;
    const PageUpload = <UploadPage />;
    const PageVerification = <VerificationPage />;

    const location = useLocation();

    return (
        <Body>
            <Header />
            <Common>
                <Routes location={location}>
                    <Route path="/" element={PageMain} />
                    <Route path="/upload" element={PageUpload} />
                    <Route path="/verification" element={PageVerification} />
                </Routes>
            </Common>
            <Footer />
        </Body>
    )
}

export default PagesRoutes;