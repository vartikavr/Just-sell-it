import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
    const { id: productId } = useParams();
    const [book, setBook] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [pages, setPages] = useState('');
    const [edition, setEdition] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [isPending, setPending] = useState(true);
    const [isMount, setMount] = useState(false);

    useEffect(() => {
        getBook();
    }, []);

    useEffect(() => {
        checkChanges();
    }, [isMount]);

    const getBook = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(`${process.env.REACT_APP_URI}/categories/books/${productId}`, {
        }, axiosConfig)
            .then(async (res) => {
                console.log("book data: ", res.data.book);
                setBook(res.data.book);
                console.log(book, 'successful seed of our book!');
                setMount(true);
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

    const history = useHistory();

    const checkChanges = () => {
        if (isMount) {
            if (title === '') {
                setTitle(book.title);
            }
            if (description === '') {
                setDescription(book.description);
            }
            if (edition === '') {
                setEdition(book.edition);
            }
            if (price === '') {
                setPrice(book.price);
            }
            if (pages === '') {
                setPages(book.pages);
            }
            if (author === '') {
                setAuthor(book.author);
            }
            if (image === '') {
                setImage(book.images[0].url);
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

            await axios.post(`${process.env.REACT_APP_URI}/categories/books/${productId}/edit`, {
                title, edition, pages, description, author, price, image
            },
                axiosConfig
            )
                .then((res) => {
                    console.log(res.data);
                    history.push(`/categories/books/${productId}`);
                    setPending(false);
                })
                .catch((e) => {
                    console.log("client errror data:", e.response);
                    if (e.response.data.isLoggedIn == false) {
                        history.push('/login')
                    }
                    if (e.response.data.isOwner == false) {
                        history.push('/categories/books')
                    }
                    if (e.response.data.isVerified == false) {
                        history.push('/categories')
                    }
                    console.log("error in client", e)
                })
        }

        catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleUpload = async e => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file)
                return alert("File does not exist!");
            console.log(file);
            const formData = new FormData();
            formData.append('files', file)
            for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
            document.getElementById('formSubmitBtn').disabled = true;
            document.getElementById('formSubmitBtn').innerHTML = 'Uploading ..';
            const axiosConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post(`${process.env.REACT_APP_URI}/upload`, formData, axiosConfig)
                .then((res) => {
                    console.log(res, res.data.url);
                    setImage(res.data.url);
                    document.getElementById('formSubmitBtn').disabled = false;
                    document.getElementById('formSubmitBtn').innerHTML = 'Submit';
                })
                .catch((e) => {
                    console.log("error in client", e.response.data)
                })
        }
        catch (err) {
            alert(err, "error occured")
        }
    }

    return (
        <div className="editBook">
            <div className="row mt-3">
                <h1 className="text-center" style={{ fontSize: 40, color: "#94618E" }}>Edit Book</h1>
                {isPending && <div><h4>Seeding book ...</h4></div>}
                {!isPending &&
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <div className="registerForm mb-3">
                                <label className="form-label"><b>Title:</b></label>
                                <input className="form-control" type="text" id="title" name="title" required
                                    defaultValue={book.title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Author:</b></label>
                                <input className="form-control" type="text" id="author" name="author" required
                                    defaultValue={book.author}
                                    onChange={(event) => setAuthor(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Price:</b></label>
                                <div className="input-group">
                                    <span className="input-group-text" id="price-label">₹</span>
                                    <input className="form-control" type="number" id="price" name="price" placeholder="0.00" aria-label="price" aria-describedby="price-label" required
                                        defaultValue={book.price}
                                        onChange={(event) => setPrice(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Edition:</b></label>
                                <input className="form-control" type="text" id="edition" name="edition" required
                                    defaultValue={book.edition}
                                    onChange={(event) => setEdition(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Pages:</b></label>
                                <input className="form-control" type="text" id="pages" name="pages" required
                                    defaultValue={book.pages}
                                    onChange={(event) => setPages(event.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label for="formFileMultiple" className="form-label"><b>Change Image:</b></label>
                                <input className="form-control" type="file" id="image" name="image"
                                    onChange={handleUpload}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" ><b>Description:</b></label>
                                <textarea className="form-control" type="text" id="description" name="description" required
                                    defaultValue={book.description}
                                    onChange={(event) => setDescription(event.target.value)}
                                ></textarea>
                            </div>
                            {!isPending &&
                                <div className="d-grid gap-2 col-6 mx-auto mb-5">
                                    <button className="btn btn-success" id="formSubmitBtn">Submit</button>
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

export default EditBook;