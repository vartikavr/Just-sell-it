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
                    <h1>All other items - </h1>
                    <button type="button" className="btn btn-info" onClick={redirectTo}>
                        Add new item to sell
                    </button>
                    {allOthers.map((item) => (
                        <div className="card mt-3 ms-3 me-3">
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <img className="img-fluid" alt="" src={item.images[0].url} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <button type="button" id={item._id} className="btn btn-info" onClick={handleSelect}>
                                            View
                                        </button>
                                        <h2 className="card-title">{item.title}</h2>
                                        <p className="card-text">
                                            <small>₹{item.price}</small>
                                        </p>
                                        <p className="card-text">{item.description}</p>
                                        {/*} <a className="btn btn-primary" href="/campgrounds/<%= campground._id %>">View <%= campground.title %> </a> */}
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

export default Others;