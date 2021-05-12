import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FlashMessage from 'react-flash-message';

const Category = () => {

    const history = useHistory();
    const [isVerified, setIsVerified] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        checkVerification();
    }, [isVerified]);

    const checkVerification = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/user', {
        },
            axiosConfig)
            .then((res) => {
                console.log(res.data)
                setIsVerified(res.data.user.isVerified);
                if (res.data.user.isVerified == false) {
                    setIsError(true);
                }
                else {
                    setIsError(false);
                }
            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                console.log("error in client", e)
            })
    }

    const handleSelect = (event) => {
        const id = event.target.id;

        console.log(id);

        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/categories', {

        },
            axiosConfig)
            .then((res) => {
                console.log(res, 'successfully sent id!');
                console.log("ok", id)
                history.push(`/categories/${id}`);
                //console.log(name, username, email);

            })
            .catch((e) => {
                console.log("client errror data:", e.response);
                if (e.response.data.isLoggedIn == false) {
                    history.push('/login')
                }
                console.log("error in client", e)
            })

    }
    return (
        <div className="category d-flex flex-column">
            {isError && (
                <FlashMessage duration={5000}>
                    <div className="flash col-md-6 offset-md-3">
                        <p>Email not confirmed yet. Check inbox!</p>
                    </div>
                </FlashMessage>
            )}
            <div className="heading">
                <h1 style={{ textAlign: "center" }}>Select a Category :</h1>
            </div>
            <button type="button" id="books" className="btn btn-info selectCat p-3" onClick={handleSelect}>
                Books
            </button>
            <button type="button" id="cycles" className="btn btn-info selectCat p-3" onClick={handleSelect}>
                Cycles
            </button>
            <button type="button" id="furniture" className="btn btn-info selectCat p-3" onClick={handleSelect}>
                Furniture
            </button>
            <button type="button" id="handicrafts" className="btn btn-info selectCat p-3" onClick={handleSelect}>
                Handicrafts
            </button>
            <button type="button" id="others" className="btn btn-info selectCat p-3" onClick={handleSelect}>
                Others
            </button>

        </div>
    );
}

export default Category;