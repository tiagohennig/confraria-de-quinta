import { useNavigate, useParams } from "react-router-dom";
import { goBack } from "../../routes/Coordinator";

export const MeetingDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const BASE_URL = "https://confrariadequinta.herokuapp.com/";

    return (
        <div>
            <h1>Meeting Details</h1>
            <p>Details for meeting ID: {id}</p>
            <button onClick={() => goBack(navigate)}>Go Back</button>
        </div>
    );
}