import { useState } from 'react';
import axios from 'axios';
import FlashMessage from 'react-flash-message';
import { useHistory } from 'react-router-dom';

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
        axios.post('http://localhost:5000/resetPwd', {
            pwd: pwd,
            newPwd: newPwd,
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                localStorage.removeItem('question');
                history.push('/categories');
            })
            .catch((e) => {
                console.log("error in client", e)
                setError(true);
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
                            <img src="https://images.unsplash.com/photo-1514369118554-e20d93546b30?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                                alt="" class="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">
                                    Reset Password
                                </h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label" for="username">New Password</label>
                                        <input className="form-control" type="password" id="username" name="username" placeholder="enter username" required autoFocus
                                            value={pwd}
                                            onChange={(event) => setPwd(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" for="password">Confirm Password</label>
                                        <input className="form-control" type="password" id="password" name="password" placeholder="enter password" required
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