import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AllUsers = () => {

    const [isPending, setPending] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getAllUsers();
    }, [isDeleted]);

    const getAllUsers = () => {
        setPending(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/admin/users', {

        }, axiosConfig)
            .then((res) => {
                console.log(res.data.users);
                const users = res.data.users;
                setAllUsers(users);
                console.log(allUsers, 'successful seed!');
                setPending(false);
            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                if (e.response.data.isAdmin == false) {
                    history.push('/categories')
                }
                if (e.response.data.isVerified == false) {
                    history.push('/categories')
                }
                console.log("error in client", e)
            })
    }

    const handleSelect = (event) => {
        const id = event.target.id;
        console.log(id);
        console.log("event..", event.target)
        history.push(`/admin/user-profile/${id}`);
    }

    const handleDelete = (e) => {
        const id = e.target.id;
        console.log("in client delete user")
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`http://localhost:5000/admin/${id}/delete`, {

        }, axiosConfig)
            .then((res) => {
                console.log('successfully deleted user!');
                setIsDeleted(true);
                history.push('/admin/users');
            })
            .catch((e) => {
                setIsDeleted(false);
                console.log("error in client", e)
            })
    }

    return (
        <div className="allUsers">
            <div className="mb-3">
                <h1 className="mt-4 text-center mb-5" style={{ fontSize: 40, color: "#94618E" }}>All Users</h1>
            </div>
            {isPending && <div><h4>loading ...</h4></div>}
            {!isPending &&
                <div className="displayUsers col-md-6 offset-md-3">
                    {allUsers.map((user) => (
                        <div className="card mb-3">
                            <div className="row ms-2">
                                <div className="card-body float-container">
                                    <div className="float-child">
                                        <h5 className="card-title">{user.name}</h5>
                                        <p className="card-text"><b>Username: </b>{user.username}</p>
                                    </div>
                                    <div className="float-child mt-2">
                                        <a className="btn btn-primary" id={user._id} onClick={handleSelect}>View User Profile</a>
                                    </div>
                                    <div className="float-child mt-2">
                                        <a className="btn btn-danger" id={user._id} onClick={handleDelete}>Delete User Account</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default AllUsers;