import { Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { isDesktop } from 'react-device-detect';
import Body from 'components/layout/body';
import Header from 'organisms/header';
import MainPage from './mainPage';
import Footer from 'organisms/footer';
import UploadPage from './uploadPage';
import Common from 'organisms/common';
import VerificationPage from './verificationPage';
import SideBar from 'organisms/sidebar';
import DimProgress from 'components/progress/dimProgress';
import useModal from 'store/useModal';
import './routes.css';

const PagesRoutes = () => {
    const { loadingProgress } = useModal();
    const PageMain = <MainPage />;
    const PageUpload = <UploadPage />;
    const PageVerification = <VerificationPage />;

    const location = useLocation();

    return (
        <Body>
            <Header />
            <Common>
                <TransitionGroup style={{ width: '100%', height: '100%' }}>
                    <CSSTransition key={location.pathname} timeout={500} classNames="frame">
                        <Routes location={location}>
                            <Route path="/" element={PageMain} />
                            <Route path="/upload" element={PageUpload} />
                            <Route path="/verification/:id" element={PageVerification} />
                            <Route path="/verification" element={PageVerification} />
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
                {<SideBar />}
            </Common>
            {loadingProgress.loading && <DimProgress />}
            {isDesktop && <Footer />}
        </Body>
    );
};

export default PagesRoutes;
