import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import config from './config';

const ConfirmEmail = () => {

    const [isPending, setPending] = useState(true);
    const [token, setToken] = useState('');
    const [isMount, setIsMount] = useState(false);

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        verifyEmail();
    }, [isMount]);

    const getToken = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`${config.SERVER_URI}/confirmation`, {
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                setToken(res.data.token);
                setIsMount(true);
            })
            .catch((e) => {
                setIsMount(false);
                console.log("error in client ...", e)
            })
    }

    const verifyEmail = () => {
        if (isMount) {
            console.log("...........")
            setPending(true);
            const axiosConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.get(`${config.SERVER_URI}/confirmation/${token}`, {
            }, axiosConfig)
                .then((res) => {
                    setPending(false);
                    console.log("heyyyyyy")
                    history.push('/categories');
                })
                .catch((e) => {
                    setPending(true);
                    console.log("error in client ...", e)
                })
        }
    }
    const history = useHistory();

    return (
        <div className="confirmEmail">
            {isPending && (
                <div><h4>Confirming Email id ...</h4></div>)
            }
            {!isPending && (
                <div className="main">
                    <Redirect to="/categories" />
                </div>
            )}
        </div>
    );
}

export default ConfirmEmail;