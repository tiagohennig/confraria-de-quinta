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

export const goToWinesPage = (navigate: NavigateFunction) => {
    navigate('/vinhos')
}

export const goToWineDetails = (navigate: NavigateFunction, id: string) => {
    navigate(`/vinhos/${id}`)
}
export const goToMeetingDetails = (navigate: NavigateFunction, id: string) => {
    navigate(`/encontro/${id}`)
}