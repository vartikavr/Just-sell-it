import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const NewBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [pages, setPages] = useState('');
    const [edition, setEdition] = useState('');
    const [description, setDescription] = useState('');
    const [productId, setProductId] = useState('');
    const [imgNum, setImgNum] = useState('');
    //const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    // const fileObj = [];
    // const fileArray = [];
    // const file = [];

    const handleSubmit = async e => {
        e.preventDefault();
        setIsPending(true);

        try {
            // console.log("images...", images)
            // if (!images)
            //     return alert("No images uploaded")

            const axiosConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            await axios.post('http://localhost:5000/categories/books/new', {
                title, edition, pages, description, author, price, image
            },
                axiosConfig
            )
                .then((res) => {
                    console.log(res.data);
                    setProductId(res.data._id);
                    history.push(`/categories/books/${productId}`);
                    setIsPending(false);
                })
                .catch((res, e) => {
                    console.log("error in client", e)
                })
        }

        catch (err) {
            alert(err.response.data.msg)
        }
        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('author', author);
        // formData.append('price', price);
        // formData.append('pages', pages);
        // formData.append('description', description);
        // formData.append('edition', edition);
        // formData.append('file', file);

        // const axiosConfig = {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }
        // axios.post('http://localhost:5000/categories/books/new',
        //     // title: title,
        //     // author: author,
        //     // price: price,
        //     // pages: pages,
        //     // description: description,
        //     // edition: edition,
        //     // images: images
        //     formData
        //     , axiosConfig)
        //     .then((res) => {
        //         console.log(res.data);
        //         setProductId(res.data._id);
        //         history.push(`/categories/books/${productId}`);
        //         setIsPending(false);
        //     })
        //     .catch((res, e) => {
        //         console.log("error in client", e)
        //     })
    }

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    // const handleUpload = async e => {
    //     e.preventDefault();
    //     //fileObj.push(e.target.files);
    //     try {
    //         const file = e.target.files[0];
    //         if (!file)
    //             return alert("File does not exist!");
    //         console.log(file);
    //         const formData = new FormData();
    //         formData.append('file', file)
    //         const axiosConfig = {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         }
    //         axios.post('http://localhost:5000/upload', formData, axiosConfig)
    //             .then((res) => {
    //                 console.log(res);
    //                 setImages(res.data);
    //             })
    //             .catch((res, e) => {
    //                 console.log("error in client", e)
    //             })
    //     }
    //     catch (err) {
    //         alert(err, "error occured")
    //     }

    //     // for (let i = 0; i < fileObj[0].length; i++) {
    //     //     fileArray.push(URL.createObjectURL(fileObj[0][i]));
    //     // }
    //     // for (let i = 0; i < fileArray.length; i++) {
    //     //     file.push({ url: fileArray[i] });
    //     // }
    //     // console.log(fileArray);
    //     // console.log(file);
    // }

    // const insertImg = imgNum =>{
    //     for(let i=0;i<imgNum;i++)
    //     {

    //     }
    // }

    return (
        <div className="newBook">
            <div className="row mt-3">
                <h1 className="text-center">New Book</h1>
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                        <div className="registerForm mb-3">
                            <label className="form-label"><b>Title:</b></label>
                            <input className="form-control" type="text" id="title" name="title" required
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Author:</b></label>
                            <input className="form-control" type="text" id="author" name="author" required
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Price:</b></label>
                            <div className="input-group">
                                <span className="input-group-text" id="price-label">₹</span>
                                <input className="form-control" type="number" id="price" name="price" placeholder="0.00" aria-label="price" aria-describedby="price-label" required
                                    value={price}
                                    onChange={(event) => setPrice(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Edition:</b></label>
                            <input className="form-control" type="text" id="edition" name="edition" required
                                value={edition}
                                onChange={(event) => setEdition(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Pages:</b></label>
                            <input className="form-control" type="text" id="pages" name="pages" required
                                value={pages}
                                onChange={(event) => setPages(event.target.value)}
                            />
                        </div>
                        {/* <div className="mb-3">
                            <label for="formFileMultiple" className="form-label">Upload Image(s):</label>
                            <input className="form-control" type="file" id="image" name="image" required
                                onChange={handleUpload}
                            />
                        </div> */}
                        {/* <div className="mb-3 multi-preview">
                            {fileArray.length > 0 && (fileArray).map(url => (
                                <img src={url} alt="..." />
                            ))}
                        </div> */}
                        {/* <div className="mb-3">
                            <label className="form-label"><b>Enter no of images:</b></label>
                            <input className="form-control" type="text" id="imgNum" name="imgNum" required
                                value={imgNum}
                                onChange={(event) => setImgNum(event.target.value)}
                            />
                        </div>
                        {imgNum &&
                            <ul>
                                {
                                    [...Array(imgNum)].map((e, i) => {
                                        <li key={i}> */}
                        <div className="mb-3">
                            <label className="form-label"><b>Image Url:</b></label>
                            <input className="form-control" type="text" id="image" name="image" required
                                value={image}
                                onChange={(event) => setImage(event.target.value)}
                            />
                        </div>
                        {/* </li>
                                    })
                                }
                            </ul>
                        } */}
                        <div className="mb-3">
                            <label className="form-label" ><b>Description:</b></label>
                            <textarea className="form-control" type="text" id="description" name="description" required
                                value={description}
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
            </div>
        </div>
    );
}

export default NewBook;