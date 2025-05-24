import { NavigateFunction } from 'react-router-dom';

export const goToLoginPage = (navigate: NavigateFunction) => {
    navigate('/login')
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

export const goToAddWinePage = (navigate: NavigateFunction) => {
    navigate("/adicionarvinho");
};

export const goToWineDetails = (navigate: NavigateFunction, id: string) => {
    navigate(`/vinhos/${id}`)
}

export const goToAddMeetingPage = (navigate: NavigateFunction) => {
    navigate("/adicionar-reuniao");
};

export const goToAddUserPage = (navigate: NavigateFunction) => {
    navigate("/adicionar-usuario");
};

export const goToMeetingDetails = (navigate: NavigateFunction, id: string) => {
    navigate(`/reuniao/${id}`);
};