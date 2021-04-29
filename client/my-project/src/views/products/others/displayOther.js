import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';


const DisplayOther = () => {

    console.log("others specific page...");
    const [isPending, setPending] = useState(true);

    const { id: productId } = useParams();
    const [otherProduct, setOtherProduct] = useState('');

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/categories/others/${productId}`, {
            //allBooks: books
        }, axiosConfig)
            .then((res) => {
                console.log("other product data: ", res.data.other);
                setOtherProduct(res.data.other);
                console.log(otherProduct, 'successful seed of our other product!');
                setPending(false);
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(`http://localhost:5000/categories/others/${productId}/delete`, {

        }, axiosConfig)
            .then((res) => {
                console.log('successfully deleted item!');
                history.push('/categories/others');
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    const imageUrls = otherProduct.images;

    const handleBack = () => {
        history.push('/categories/others');
    }
    const history = useHistory();



    return (
        <div className="displayOther">
            {isPending && <div>Seeding cycle ...</div>}
            {!isPending &&
                <div className="dataDisplay">
                    <button type="button" className="btn btn-info  ms-4 mt-3" onClick={handleBack}>
                        All Others category products
                </button>
                    <div className="mt-5"></div>
                    <div className="row mainContent-item mt-5 d-flex align-items-center ms-auto me-auto">
                        <div id="booksCarousel" className="col-md-6 carousel slide" data-bs-ride="carousel">
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
                        <div className="card col-md-6 h-300">
                            <div className="card-body">
                                <h5 className="card-title">{otherProduct.title}</h5>
                                <p className="card-text">{otherProduct.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Submitted by: {otherProduct.userId.username}</li>
                                <li className="list-group-item">Price: ₹{otherProduct.price}</li>
                            </ul>
                            {sessionStorage.getItem('currentUser') && otherProduct.userId._id == sessionStorage.getItem('currentUser') && (
                                <div class="card-body">
                                    <a className="card-link btn btn-info" href={`/categories/others/${otherProduct._id}/edit`}>Edit</a>
                                    &nbsp;
                            <form className="d-inline" onSubmit={handleDelete}>
                                        <button className="btn btn-danger">Delete</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default DisplayOther;