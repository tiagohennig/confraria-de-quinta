import { NavigateFunction } from 'react-router-dom';

export const goToLoginPage = (navigate: NavigateFunction) => {
    navigate('/login')
}

export const goToRegister = (navigate: NavigateFunction) => {
    navigate('/register')
}

export const goBack = (navigate: NavigateFunction) =>{
    navigate(-1)
}

export const goToHomePage = (navigate: NavigateFunction) => {
    navigate('/home')
}