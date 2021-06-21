import { useState } from 'react';
import axios from 'axios';
import FlashMessage from 'react-flash-message';
import { useHistory } from 'react-router-dom';
import SecurityPwd from './securityPwd';

const ForgotPwd = () => {

    const [username, setUsername] = useState('');
    const [isError, setError] = useState(false);
    const [moveToNext, setNext] = useState(false);
    const [question, setQuestion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${process.env.REACT_APP_URI}/forgotPwd`, {
            username: username,
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                setQuestion(res.data.question);
                //localStorage.setItem('question', res.data.question);
                setNext(true);
            })
            .catch((e) => {
                setNext(false);
                console.log("error in client", e)
                setError(true);
            })
    }
    const history = useHistory();
    return (
        <div className="forgotPwd">
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
                                <img src={`${process.env.PUBLIC_URL}/forgotPwd.png`}
                                    alt="" class="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title" style={{ fontSize: 30, color: "#94618E" }}>Forgot Password</h5>
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
                <SecurityPwd question={question} />
            )}
        </div>
    );
}

export default ForgotPwd;