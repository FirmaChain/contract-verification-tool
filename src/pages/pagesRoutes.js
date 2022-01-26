import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition, } from "react-transition-group";
import Body from "components/layout/body";
import Header from "organisms/header";
import MainPage from "./mainPage";
import Footer from "organisms/footer";
import UploadPage from "./uploadPage";
import './routes.css'
import Common from "organisms/common";
import VerificationPage from "./verificationPage";
import { isDesktop } from "react-device-detect";
import { Box } from "components/styles";

const PagesRoutes = () => {
    const PageMain = <MainPage />;
    const PageUpload = <UploadPage />;
    const PageVerification = <VerificationPage />;

    const location = useLocation();

    return (
        <Body>
            <Header />
            <Common>
                <TransitionGroup style={{width: "100%", height: "100%"}}>
                    <CSSTransition key={location.pathname} timeout={500} classNames="frame">
                        <Routes location={location}>
                            <Route path="/" element={PageMain} />
                            <Route path="/upload" element={PageUpload} />
                            <Route path="/verification" element={PageVerification} />
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
            </Common>
            <Footer />
        </Body>
    )
}

export default PagesRoutes;