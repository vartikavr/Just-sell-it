import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import axios from 'axios';
const Register = () => {

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('http://localhost:5000/register', {
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
                console.log(res.data.curretUser);
                sessionStorage.setItem('currentUser', res.data.currentUser);
                console.log(sessionStorage.getItem('currentUser'), "registration done");
                history.push('/categories');
                setIsPending(false);
            })
            .catch((res, e) => {
                setError(true);
                console.log("error in client", e)
            })
    }

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    return (
        <div className="register">
            <div className="row mt-3">
                <h1 className="text-center">Register</h1>
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="registerForm mb-3">
                            <label className="form-label"><b>Name:</b></label>
                            <input className="form-control" type="text" id="name" name="name" required
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Username:</b></label>
                            <input className="form-control" type="text" id="username" name="username" required
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Password:</b></label>
                            <input className="form-control" type="password" id="password" name="password" required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
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
                        <div className="mb-3">
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
                        <div className="mb-3">
                            <label className="form-label"><b>College Email id:</b></label>
                            <input className="form-control" type="email" id="email" name="email" required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" ><b>Phone Number:</b></label>
                            <input className="form-control" type="number" id="phone" name="phone" required
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" ><b>Hostel Address:</b></label>
                            <textarea className="form-control" type="text" id="address" name="address" required
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Security Question:</b></label>
                            <textarea className="form-control" type="text" id="securityQ" name="securityQ" required
                                value={securityQ}
                                onChange={(event) => setSecurityQ(event.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" ><b>Security Answer:</b></label>
                            <input className="form-control" type="password" id="securityA" name="securityA" required
                                value={securityA}
                                onChange={(event) => setSecurityA(event.target.value)}
                            />
                        </div>
                        {isError && (
                            <div className="flash">
                                <FlashMessage duration={5000}>
                                    <p>
                                        Invalid entry. Please try again!
                                </p>
                                </FlashMessage>
                            </div>
                        )}
                        <div className="d-grid gap-2 col-6 mx-auto mb-5">
                            <button className="btn btn-success">Register user</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;