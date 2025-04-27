import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/loginPage/Login';
import { HomePage } from '../pages/homePage/HomePage';
import { WinesPage } from '../pages/winesPage/WinesPage';
import { MeetingDetails } from '../pages/meetingDetails/MeetingDetails';


const Router = () => {
    console.log('Router')
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/vinhos" element={<WinesPage />} />
                <Route path="/proximoencontro" element={<MeetingDetails />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;