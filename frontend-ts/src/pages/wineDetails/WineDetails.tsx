import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "../../Hooks/useGlobalState";
import axios from "axios";
import { goBack } from "../../routes/Coordinator";
import { useEffect } from "react";

export const WineDetails = (props:any) => {

    const navigate = useNavigate();
    const { id } = useParams();
    const BASE_URL = "https://confrariadequinta.herokuapp.com/";

    return (
        <div>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <button onClick={() => goBack(navigate)}>Go Back</button>
        </div>
    );
}