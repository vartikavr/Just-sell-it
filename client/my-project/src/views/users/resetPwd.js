import { useState } from 'react';
import axios from 'axios';
import FlashMessage from 'react-flash-message';
import { useHistory } from 'react-router-dom';
import config from '../../config';

const ResetPwd = () => {
    const [pwd, setPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [isError, setError] = useState(false);
    localStorage.removeItem('question');
    const handleSubmit = (e) => {
        e.preventDefault();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${config.SERVER_URI}/resetPwd`, {
            pwd: pwd,
            newPwd: newPwd,
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                localStorage.removeItem('question');
                history.push('/login');
            })
            .catch((e) => {
                console.log("error in client", e)
                setError(true);
                setPwd('');
                setNewPwd('');
            })
    }

    const history = useHistory();

    return (
        <div className="resetPwd">
            <div className="container d-flex justify-content-center align-items-center mb-5 mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        {isError && (
                            <div className="flash">
                                <FlashMessage duration={5000}>
                                    <p>Passwords not matching. Please try again!</p>
                                </FlashMessage>
                            </div>
                        )}
                        <div className="card shadow">
                            <img src={`${process.env.PUBLIC_URL}/forgotPwd.png`}
                                alt="" class="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title" style={{ fontSize: 30, color: "#94618E" }}>
                                    Reset Password
                                </h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label" for="username">New Password</label>
                                        <input className="form-control" type="password" id="username" name="username" placeholder="enter new pasword" required autoFocus
                                            value={pwd}
                                            onChange={(event) => setPwd(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" for="password">Confirm Password</label>
                                        <input className="form-control" type="password" id="password" name="password" placeholder="confirm password" required
                                            value={newPwd}
                                            onChange={(event) => setNewPwd(event.target.value)}
                                        />
                                    </div>
                                    <div className="d-grid ">
                                        <button className="btn btn-success btn-block">Reset</button>
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

export default ResetPwd;