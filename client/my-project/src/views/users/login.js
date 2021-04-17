import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import axios from 'axios';

const Login = () => {

    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');


    // const refreshPage = () => {
    //window.location = window.location.reload(true);
    //   window.location.href = "http://localhost:3000/login";
    //}


    const handleSubmit = (e) => {
        e.preventDefault();
        //setIsPending(true);
        setError(false);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('http://localhost:5000/login', {
            username: username,
            password: pwd,
        }, axiosConfig)
            .then((res) => {
                setError(false);
                //currentUser = res.currentUser;
                console.log(res.data.currentUser);
                sessionStorage.setItem('currentUser', res.data.currentUser);
                console.log(sessionStorage.getItem('currentUser'), "login done");
                history.push('/categories');
                //setIsPending(false);
            })
            .catch((res, e) => {
                //refreshPage();
                setError(true);
                setPwd('');
                console.log(res.error, "error in client ...", e)
            })
    }
    //const [isPending, setIsPending] = useState(false);
    const [isError, setError] = useState(false);
    const history = useHistory();

    return (
        <div className="login">
            <div className="container d-flex justify-content-center align-items-center mb-5 mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        {isError && (
                            <div className="flash">
                                <FlashMessage duration={5000}>
                                    <p>Invalid username or password. Please try again!</p>
                                </FlashMessage>
                            </div>
                        )}
                        <div className="card shadow">
                            <img src="https://images.unsplash.com/photo-1514369118554-e20d93546b30?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                                alt="" class="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">
                                    Login
                                </h5>
                                <form onSubmit={handleSubmit}>
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
                                    <div className="d-grid ">
                                        <button className="btn btn-success btn-block">Login</button>
                                        <a className="text-center" href="/forgotPwd">
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
    );
}

export default Login;