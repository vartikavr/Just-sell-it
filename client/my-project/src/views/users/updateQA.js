import { useState } from 'react';
import axios from 'axios';
import FlashMessage from 'react-flash-message';
import ResetQA from './resetQA';

const UpdateQA = () => {

    const [pwd, setPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [isError, setError] = useState(false);
    const [isNext, setIsNext] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${process.env.REACT_APP_URI}/checkPwd`, {
            pwd: pwd,
            newPwd: newPwd,
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                setIsNext(true);
            })
            .catch((e) => {
                setIsNext(false);
                console.log("error in client", e)
                setError(true);
                setPwd('');
                setNewPwd('');
            })
    }


    return (
        <div className="UpdateQA">
            {!isNext &&
                <div className="container d-flex justify-content-center align-items-center mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                            {isError && (
                                <div className="flash">
                                    <FlashMessage duration={5000}>
                                        <p>Invalid entry. Please try again!</p>
                                    </FlashMessage>
                                </div>
                            )}
                            <div className="card shadow">
                                <img src={`${process.env.PUBLIC_URL}/securityQA1.png`}
                                    alt="" class="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title" style={{ fontSize: 30, color: "#94618E" }}>
                                        Verify User
                                </h5>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label" for="username">Enter Password</label>
                                            <input className="form-control" type="password" id="username" name="username" placeholder="enter existing pasword" required autoFocus
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
                                            <button className="btn btn-success btn-block">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isNext &&
                <ResetQA />
            }
        </div>
    );
}

export default UpdateQA;