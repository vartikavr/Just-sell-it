import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import axios from 'axios';
import config from '../../config';
//const loginImg = require('../../images/login.jpg')

const Login = () => {

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //setIsPending(true);
        setError(false);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${config.SERVER_URI}/login`, {
            username: username,
            password: pwd,
        }, axiosConfig)
            .then((res) => {
                setError(false);
                localStorage.setItem('isLoggedIn', true);
                if (res.data.role === "admin") {
                    localStorage.setItem('isAuthorized', true);
                }
                console.log(localStorage.getItem('isLoggedIn'), "login done");
                history.push('/categories');
                //setIsPending(false);
            })
            .catch((res, e) => {
                setError(true);
                setPwd('');
                console.log(res.error, "error in client ...", e)
            })
    }

    const [isError, setError] = useState(false);
    const history = useHistory();

    return (
        <div className="login">
            <div className="container mb-5 mt-5">
                <div className="col-md-8 offset-md-2">
                    <div className="card shadow">
                        <div className="row g-0">
                            {isError && (
                                <FlashMessage duration={5000}>
                                    <div className="flash">
                                        <p>Invalid username or password. Please try again!</p>
                                    </div>
                                </FlashMessage>
                            )}
                            <div className="card-image col-md-7">
                                <img src={`${process.env.PUBLIC_URL}/login.png`}
                                    alt="" className="card-img-top" />
                            </div>
                            <div className="card-body-cover col-md-4 me-2">
                                <div className="card-body">
                                    <h5 className="card-title text-center mt-4" style={{ fontSize: 40, color: "#94618E" }}>
                                        Login
                                </h5>
                                    <form onSubmit={handleSubmit} className="mt-4">
                                        <div className="mb-3">
                                            <label className="form-label" for="username">Username</label>
                                            <input className="form-control" type="text" id="username" name="username" placeholder="enter username" required autoFocus
                                                value={username}
                                                onChange={(event) => setUsername(event.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" for="password">Password</label>
                                            <input className="form-control" type="password" id="password" name="password" placeholder="enter password" required
                                                value={pwd}
                                                onChange={(event) => setPwd(event.target.value)}
                                            />
                                        </div>
                                        <div className="d-grid">
                                            <button className="btn btn-success btn-block mt-4">Login</button>
                                            <a className="text-center mt-3" href="/forgotPwd">
                                                Forgot Password?
                                        </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;