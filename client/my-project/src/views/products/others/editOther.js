import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditOther = () => {

    const { id: productId } = useParams();
    const [otherItem, setOtherItem] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [isPending, setPending] = useState(true);
    const [isMount, setMount] = useState(false);

    useEffect(() => {
        getOtherItem();
    }, []);

    useEffect(() => {
        checkChanges();
    }, [isMount]);

    const getOtherItem = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`http://localhost:5000/categories/others/${productId}`, {
        }, axiosConfig)
            .then(async (res) => {
                console.log("other Item data: ", res.data.other);
                setOtherItem(res.data.other);
                console.log(otherItem, 'successful seed of our other item!');
                setMount(true);
                setPending(false);
            })
            .catch((e) => {
                console.log("error in client", e)
            })
    }

    const history = useHistory();

    const checkChanges = () => {
        if (isMount) {
            if (title === '') {
                setTitle(otherItem.title);
            }
            if (description === '') {
                setDescription(otherItem.description);
            }
            if (price === '') {
                setPrice(otherItem.price);
            }
            if (image === '') {
                setImage(otherItem.images[0].url);
            }
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setPending(true);

        try {
            const axiosConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            await axios.post(`http://localhost:5000/categories/others/${productId}/edit`, {
                title, description, price, image
            },
                axiosConfig
            )
                .then((res) => {
                    console.log(res.data);
                    history.push(`/categories/others/${productId}`);
                    setPending(false);
                })
                .catch((res, e) => {
                    console.log("error in client", e)
                })
        }

        catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <div className="editOther">
            <div className="row mt-3">
                <h1 className="text-center">Edit Item</h1>
                {isPending && <div>Seeding item ...</div>}
                {!isPending &&
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <div className="registerForm mb-3">
                                <label className="form-label"><b>Title:</b></label>
                                <input className="form-control" type="text" id="title" name="title" required
                                    defaultValue={otherItem.title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Price:</b></label>
                                <div className="input-group">
                                    <span className="input-group-text" id="price-label">₹</span>
                                    <input className="form-control" type="number" id="price" name="price" placeholder="0.00" aria-label="price" aria-describedby="price-label" required
                                        defaultValue={otherItem.price}
                                        onChange={(event) => setPrice(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Image Url:</b></label>
                                <input className="form-control" type="text" id="image" name="image" required
                                    defaultValue={otherItem.images[0].url}
                                    onChange={(event) => setImage(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" ><b>Description:</b></label>
                                <textarea className="form-control" type="text" id="description" name="description" required
                                    defaultValue={otherItem.description}
                                    onChange={(event) => setDescription(event.target.value)}
                                ></textarea>
                            </div>
                            {!isPending &&
                                <div className="d-grid gap-2 col-6 mx-auto mb-5">
                                    <button className="btn btn-success">Submit</button>
                                </div>
                            }
                            {isPending &&
                                <div className="d-grid gap-2 col-6 mx-auto mb-5">
                                    <button className="btn btn-success mb-3">Submitting ..</button>
                                </div>
                            }
                        </form>
                    </div>
                }
            </div>
        </div>
    );
}

export default EditOther;