import axios from 'axios';
import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

const Logout = () => {

    const [isPending, setPending] = useState(true);
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.get('http://localhost:5000/logout', {
    }, axiosConfig)
        .then((res) => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isAuthorized');
            console.log("log out")
            setPending(false);
            history.push('/');
        })
        .catch((e) => {
            setPending(true);
            console.log("error in client ...", e)
        })

    const history = useHistory();

    return (
        <div className="logout">
            {isPending && (
                <div><h4>Logging out ...</h4></div>)
            }
            {!isPending && (
                <div className="main-logout">
                    <Redirect to="/" />
                </div>
            )}
        </div>
    );
}

export default Logout;