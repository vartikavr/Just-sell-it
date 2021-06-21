import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import axios from 'axios';

const AdminRegister = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [course, setCourse] = useState('');
    const [year, setYear] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [securityQ, setSecurityQ] = useState('');
    const [securityA, setSecurityA] = useState('');
    const [isError, setError] = useState(false);
    const [moveToNext, setMoveToNext] = useState(false);
    const [moveToLast, setMoveToLast] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`${process.env.REACT_APP_URI}/admin/register`, {
            name: name,
            email: email,
            username: username,
            password: password,
            course: course,
            year: year,
            phone: phone,
            address: address,
            securityQ: securityQ,
            securityA: securityA
        }, axiosConfig)
            .then((res) => {
                setError(false);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('isAuthorized', true);
                console.log(localStorage.getItem('isLoggedIn'), "login done");
                console.log("registration done");
                history.push('/categories');
                setIsPending(false);
            })
            .catch((res, e) => {
                setIsPending(false);
                setError(true);
                setMoveToNext(false);
                setMoveToLast(false);
                console.log("error in client", e)
            })
    }

    const handleNext = (e) => {
        e.preventDefault();
        setMoveToNext(true);
    }

    const handleMiddle = (e) => {
        e.preventDefault();
        setMoveToLast(true);
    }

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    return (
        <div className="adminRegister">
            {!moveToNext && (
                <div className="container d-flex justify-content-center align-items-center mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                            {isError && (
                                <div className="flash">
                                    <FlashMessage duration={5000}>
                                        <p>
                                            Invalid entry. Please try again!
                                </p>
                                    </FlashMessage>
                                </div>
                            )}
                            <div className="card shadow">
                                <img src={`${process.env.PUBLIC_URL}/adminRegister1.png`}
                                    alt="" class="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title text-center" style={{ fontSize: 30, color: "#94618E" }}>Register as Admin</h5>
                                    <form onSubmit={handleNext}>
                                        <div className="mb-2">
                                            <label className="form-label"><b>Name:</b></label>
                                            <input className="form-control" type="text" id="name" name="name" required autoFocus
                                                value={name}
                                                onChange={(event) => setName(event.target.value)}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label"><b>Username:</b></label>
                                            <input className="form-control" type="text" id="username" name="username" required
                                                value={username}
                                                onChange={(event) => setUsername(event.target.value)}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label"><b>Password:</b></label>
                                            <input className="form-control" type="password" id="password" name="password" required
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label"><b>College Email id:</b></label>
                                            <input className="form-control" type="email" id="email" name="email" required
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                            />
                                        </div>
                                        <div className="d-grid ">
                                            <button className="btn btn-success btn-block">Next</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {moveToNext && !moveToLast && (
                <div className="container d-flex justify-content-center align-items-center mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                            <div className="card shadow">
                                <img src={`${process.env.PUBLIC_URL}/register2.png`}
                                    alt="" class="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title text-center" style={{ fontSize: 30, color: "#94618E" }}>Register as Admin</h5>
                                    <form onSubmit={handleMiddle}>
                                        <div className="mb-2">
                                            <label className="form-label"><b>Course:</b></label>
                                            &nbsp;
                                            <select className="select" name="course"
                                                value={course}
                                                onChange={(event) => setCourse(event.target.value)}
                                            >
                                                <option value="" selected hidden>Select an option</option>
                                                <option value="BTech BT">BTech BioTechnology</option>
                                                <option value="BTech CE">BTech Chemical</option>
                                                <option value="BTech CS">BTech Computer Science</option>
                                                <option value="BTech EC">BTech Electronics and Communication</option>
                                                <option value="BTech EE">BTech Electrical and Electronics</option>
                                                <option value="BTech EI">BTech Electronics and Instrumentation</option>
                                                <option value="BTech IT">BTech Information Technology</option>
                                                <option value="BTech MT">BTech Mechatronics</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label"><b>Year:</b></label>
                                            &nbsp;
                                            <select className="select" name="year"
                                                value={year}
                                                onChange={(event) => setYear(event.target.value)}
                                            >
                                                <option value="" selected hidden>Select an option</option>
                                                <option value="First">First</option>
                                                <option value="Second">Second</option>
                                                <option value="Third">Third</option>
                                                <option value="Fourth">Fourth</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label" ><b>Phone Number:</b></label>
                                            <input className="form-control" type="number" id="phone" name="phone" required
                                                value={phone}
                                                onChange={(event) => setPhone(event.target.value)}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label" ><b>Hostel Address:</b></label>
                                            <textarea className="form-control" type="text" id="address" name="address" required
                                                value={address}
                                                onChange={(event) => setAddress(event.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="d-grid ">
                                            <button className="btn btn-success btn-block">Next</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {moveToNext && moveToLast && (
                <div className="container d-flex justify-content-center align-items-center mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                            <div className="card shadow">
                                <img src={`${process.env.PUBLIC_URL}/register3.png`}
                                    alt="" class="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title text-center" style={{ fontSize: 30, color: "#94618E" }}>Register as Admin</h5>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-2">
                                            <label className="form-label"><b>Security Question:</b></label>
                                            <textarea className="form-control" type="text" id="securityQ" name="securityQ" required
                                                value={securityQ}
                                                onChange={(event) => setSecurityQ(event.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label" ><b>Security Answer:</b></label>
                                            <input className="form-control" type="password" id="securityA" name="securityA" required
                                                value={securityA}
                                                onChange={(event) => setSecurityA(event.target.value)}
                                            />
                                        </div>
                                        {!isPending &&
                                            <div className="d-grid ">
                                                <button className="btn btn-success btn-block">Submit</button>
                                            </div>
                                        }
                                        {isPending &&
                                            <div className="d-grid ">
                                                <button className="btn btn-success btn-block disabled">Registering..</button>
                                            </div>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminRegister;