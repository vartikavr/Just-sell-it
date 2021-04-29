import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const Others = () => {

    const [allOthers, setAllOthers] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        getAllOthers();
    }, []);

    const getAllOthers = () => {
        setPending(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/categories/others', {
            //allBooks: books
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                const others = res.data;
                setAllOthers(others);
                console.log(allOthers, 'successful seed!');
                setPending(false);
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    const handleSelect = (event) => {
        const id = event.target.id;
        console.log(id);
        console.log("event..", event.target)
        history.push(`/categories/others/${id}`);
    }
    const history = useHistory();

    const redirectTo = () => {
        history.push('/categories/others/new');
    }

    return (
        <div className="others">
            {isPending && <div><h1>pending ...</h1></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info sell-item" onClick={redirectTo}>
                        Sell an item
                    </button>
                    <div className="ms-5 d-flex flex-row flex-wrap">
                    {allOthers.map((item) => (
                        <div className="card col-lg-3 pt-3 mt-3 ms-5 me-5 ps-lg-3">
                            <div className="col">
                                <div className="col ps-sm-5 ps-lg-0">
                                    <img className="img-fluid displayThumbnail" alt="" src={item.images[0].url} />
                                </div>
                                <div className="col">
                                    <div className="card-body ps-sm-5 ps-lg-0">
                                        <h2 className="card-title">{item.title}</h2>
                                        <p className="card-text">
                                            <small>₹{item.price}</small>
                                        </p>
                                        <p className="card-text">{item.description}</p>
                                        <button type="button" id={item._id} className="btn btn-info" onClick={handleSelect}>
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mb-3"></div>
                </div>
            }
        </div>
    );
}

export default Others;