import { useState } from 'react';
import axios from 'axios';
import FlashMessage from 'react-flash-message';
import { useHistory } from 'react-router-dom';
import SecurityPwd from './securityPwd';
const ForgotPwd = () => {

    const [username, setUsername] = useState('');
    const [isError, setError] = useState(false);
    const [moveToNext, setNext] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();

        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('http://localhost:5000/forgotPwd', {
            username: username,
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                setNext(true);
                localStorage.setItem('question', res.data.question);
                history.push('/security');
            })
            .catch((e) => {
                console.log("error in client", e)
                setError(true);
            })
    }
    const history = useHistory();
    return (
        <div className="login">
            {!moveToNext && (
                <div className="container d-flex justify-content-center align-items-center mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                            {isError && (
                                <div className="flash">
                                    <FlashMessage duration={5000}>
                                        <p>Invalid username. Please try again!</p>
                                    </FlashMessage>
                                </div>
                            )}
                            <div className="card shadow">
                                <img src="https://images.unsplash.com/photo-1514369118554-e20d93546b30?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                                    alt="" class="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">Forgot Password</h5>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label" for="username">Enter Username</label>
                                            <input className="form-control" type="text" id="username" name="username" placeholder="enter username" required autoFocus
                                                value={username}
                                                onChange={(event) => setUsername(event.target.value)}
                                            />
                                        </div>
                                        <div className="d-grid ">
                                            <button className="btn btn-success btn-block">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {moveToNext && (
                <SecurityPwd />
            )}
        </div>
    );
}

export default ForgotPwd;