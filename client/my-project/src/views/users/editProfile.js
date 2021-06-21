import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import FlashMessage from 'react-flash-message';
import config from '../../config';

const EditProfile = () => {

    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [course, setCourse] = useState('');
    const [year, setYear] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [isMount, setMount] = useState(false);
    const [isError, setError] = useState(false);

    useEffect(() => {
        userInfo();
    }, []);

    useEffect(() => {
        checkChanges();
    }, [isMount]);

    const history = useHistory();

    const userInfo = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`${config.SERVER_URI}/user`, {
        }, axiosConfig)
            .then(async (res) => {
                console.log("user data: ", res.data.user);
                setUser(res.data.user);
                console.log(user, 'successful seed of our user!');
                setMount(true);
            })
            .catch((e) => {
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                console.log("error in client", e)
            })
    }

    const checkChanges = () => {
        if (isMount) {
            if (name === '') {
                setName(user.name);
            }
            if (username === '') {
                setUsername(user.username);
            }
            if (course === '') {
                setCourse(user.course);
            }
            if (year === '') {
                setYear(user.year);
            }
            if (phone === '') {
                setPhone(user.phone);
            }
            if (email === '') {
                setEmail(user.email);
            }
            if (address === '') {
                setAddress(user.address);
            }
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const axiosConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            await axios.post(`${config.SERVER_URI}/user/edit`, {
                name, username, course, year, phone, email, address
            },
                axiosConfig
            )
                .then((res) => {
                    setError(false);
                    console.log(res.data);
                    history.push('/user');
                })
                .catch((e) => {
                    if (e.response.data.isLoggedIn == false) {
                        history.push('/login')
                    }
                    setError(true);
                    console.log("error in client", e)
                })
        }

        catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="editProfile">
            <div className="row mt-3">
                <h1 className="text-center" style={{ fontSize: 40, color: "#94618E" }}>Edit User Info</h1>
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="userInfoForm mb-3">
                            <label className="form-label"><b>Name:</b></label>
                            <input className="form-control" type="text" id="name" name="name"
                                defaultValue={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Username:</b></label>
                            <div className="input-group">
                                <input className="form-control" type="text" id="username" name="username"
                                    defaultValue={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Course:</b></label>
                            &nbsp;
                            <select className="select" name="course"
                                value={course}
                                onChange={(event) => setCourse(event.target.value)}
                            >
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
                                <option value="First">First</option>
                                <option value="Second">Second</option>
                                <option value="Third">Third</option>
                                <option value="Fourth">Fourth</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>College Email id:</b></label>
                            <input className="form-control" type="text" id="email" name="email"
                                defaultValue={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Phone No:</b></label>
                            <input className="form-control" type="number" id="phone" name="phone"
                                defaultValue={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" ><b>Hostel Address:</b></label>
                            <textarea className="form-control" type="text" id="address" name="address"
                                defaultValue={address}
                                onChange={(event) => setAddress(event.target.value)}
                            ></textarea>
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
                            <button className="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
        ;
}

export default EditProfile;