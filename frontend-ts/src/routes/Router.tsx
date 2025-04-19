import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/loginPage/Login';


const Router = () => {
    console.log('Router')
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;