import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../../../config';

const Handicrafts = () => {

    const [allHandicrafts, setAllHandicrafts] = useState([]);
    const [isPending, setPending] = useState(false);
    const [search, setSearch] = useState('');

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
        axios.get(`${config.SERVER_URI}/categories/handicrafts`, {
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
        history.push(`/categories/handicrafts/${id}`);
    }
    const history = useHistory();

    const redirectTo = () => {
        history.push('/categories/handicrafts/new');
    }

    return (
        <div className="handicrafts" id="allHandicrafts">
            {isPending && <div><h4>pending ...</h4></div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info sell-item" onClick={redirectTo}>
                        Sell handicraft
                    </button>
                    <div className="searchBar input-group">
                        <input className="input-group rounded searchBar" type="text" id="search" name="search" autoComplete="off"
                            placeholder="to search start typing.."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <span className="input-group-text border-0" id="search-addon" style={{ background: "transparent", display: "inline-block" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </span>
                    </div>
                    <div className="grid-display-products d-flex flex-row flex-wrap">
                        {allHandicrafts.map((handicraft) => (
                            (handicraft.title.toLowerCase().includes(search.toLowerCase())) ? (
                                <div className="card col-lg-2 pt-3 mt-3 ms-5 me-5 ps-3 pe-3">
                                    <div className="col">
                                        <div className="col">
                                            <img className="img-fluid displayThumbnail" alt="" src={handicraft.images[0].url}
                                                id={handicraft._id}
                                                onClick={handleSelect}
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="card-body data-display-grid-small">
                                                <h2 className="card-title data-display-heading">{handicraft.title}</h2>
                                                <p className="card-text data-display-subheading">
                                                    <b>₹{handicraft.price}</b>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ))}
                        {
                            !(allHandicrafts.some(handicraft => handicraft.title.toLowerCase().includes(search.toLowerCase()))) ?
                                (<h1 style={{ textAlign: "center", margin: "auto", fontSize: 20 }}>No products to show.</h1>) : null
                        }
                    </div>
                    <div className="mb-5"></div>
                </div>
            }
        </div>
    );
}

export default Handicrafts;