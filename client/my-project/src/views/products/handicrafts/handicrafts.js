import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const Handicrafts = () => {

    const [allHandicrafts, setAllHandicrafts] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        getAllHandicrafts();
    }, []);

    const getAllHandicrafts = () => {
        setPending(true);
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('http://localhost:5000/categories/handicrafts', {
            //allBooks: books
        }, axiosConfig)
            .then((res) => {
                console.log(res.data);
                const handicrafts = res.data;
                setAllHandicrafts(handicrafts);
                console.log(allHandicrafts, 'successful seed!');
                setPending(false);
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
        console.log("event..", event.target)
        history.push(`/categories/handicrafts/${id}`);
    }
    const history = useHistory();

    const redirectTo = () => {
        history.push('/categories/handicrafts/new');
    }

    return (
        <div className="handicrafts">
            {isPending && <div><h4>pending ...</h4></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info sell-item" onClick={redirectTo}>
                        Sell handicraft
                    </button>
                    <div className="ms-5 d-flex flex-row flex-wrap">
                        {allHandicrafts.map((handicraft) => (
                            <div className="card col-lg-3 pt-3 mt-3 ms-5 me-5 ps-lg-3">
                                <div className="col">
                                    <div className="col ps-sm-5 ps-lg-0">
                                        <img className="img-fluid displayThumbnail" alt="" src={handicraft.images[0].url} />
                                    </div>
                                    <div className="col">
                                        <div className="card-body ps-sm-5 ps-lg-0">
                                            <h2 className="card-title">{handicraft.title}</h2>

                                            <p className="card-text">
                                                <small>₹{handicraft.price}</small>
                                            </p>
                                            <p className="card-text">{handicraft.description}</p>
                                            <button type="button" id={handicraft._id} className="btn btn-info" onClick={handleSelect}>
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

export default Handicrafts;