import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/loginPage/Login';
import { HomePage } from '../pages/homePage/HomePage';


const Router = () => {
    console.log('Router')
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;