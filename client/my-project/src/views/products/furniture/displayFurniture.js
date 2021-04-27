import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';


const DisplayFurniture = () => {

    console.log("furniture specific page...");
    const [isPending, setPending] = useState(true);

    const { id: productId } = useParams();
    const [furniture, setFurniture] = useState('');

    useEffect(() => {
        getFurniture();
    }, []);

    const getFurniture = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/categories/furniture/${productId}`, {
            //allBooks: books
        }, axiosConfig)
            .then((res) => {
                console.log("furniture data: ", res.data.furniture);
                setFurniture(res.data.furniture);
                console.log(furniture, 'successful seed of our furniture!');
                setPending(false);
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    const handleDelete = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`http://localhost:5000/categories/furniture/${productId}/delete`, {

        }, axiosConfig)
            .then((res) => {
                console.log('successfully deleted furniture!');
                history.go(-1);
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    const imageUrls = furniture.images;

    const handleBack = () => {
        history.go(-1);
    }
    const history = useHistory();


    return (
        <div className="displayFurniture">
            {isPending && <div>Seeding cycle ...</div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info" onClick={handleBack}>
                        Back to all Furniture
                </button>
                    <div id="booksCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            {imageUrls.map((img, i) => (
                                <div className={"carousel-item " + (i == 0 ? 'active' : '')}>
                                    <img src={img.url} className="d-block w-100" alt="..." />
                                </div>
                            ))}
                        </div>
                        <div className="group">
                            <a className="carousel-control-prev" href="#booksCarousel" role="button" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#booksCarousel" role="button" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </a>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{furniture.title}</h5>
                            <p className="card-text">{furniture.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Submitted by: {furniture.userId.username}</li>
                            <li className="list-group-item">Price: ₹{furniture.price}</li>
                            <li className="list-group-item text-muted">Age: {furniture.age}</li>
                        </ul>
                        {sessionStorage.getItem('currentUser') && furniture.userId._id == sessionStorage.getItem('currentUser') && (
                            <div class="card-body">
                                <a className="card-link btn btn-info" href={`/categories/furniture/${furniture._id}/edit`}>Edit</a>
                                &nbsp;
                            <form className="d-inline" action="/">
                                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}

export default DisplayFurniture;