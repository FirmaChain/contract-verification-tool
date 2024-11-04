import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import PagesRoutes from 'pages/pagesRoutes';
import { FirmaSDKProvider } from 'context/firmaSDKContext';
import './styles/font.css';

function App() {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            style={{ zIndex: 10 }}
        >
            <Router>
                <FirmaSDKProvider>
                    <PagesRoutes />
                </FirmaSDKProvider>
            </Router>
        </SnackbarProvider>
    );
}

export default App;
