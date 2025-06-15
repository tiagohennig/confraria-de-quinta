import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/loginPage/Login';
import { HomePage } from '../pages/homePage/HomePage';
import { WinesPage } from '../pages/winesPage/WinesPage';
import { MeetingDetails } from '../pages/meetingDetails/MeetingDetails';
import { AddWine } from '../pages/addWinePage/AddWine';
import { AddMeetingPage } from '../pages/addMeetingPage/AddMeetingPage';
import { AddUserPage } from '../pages/addUserPage/AddUserPage';


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/vinhos" element={<WinesPage />} />
                <Route path="/reuniao/:id" element={<MeetingDetails />} />
                <Route path="/adicionarvinho" element={<AddWine />} />
                <Route path="/adicionar-reuniao" element={<AddMeetingPage />} />
                <Route path="/adicionar-usuario" element={<AddUserPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;