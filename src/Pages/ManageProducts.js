import React, { useState, useEffect } from 'react';
import { Table, Input, CustomInput, InputGroupAddon, InputGroup } from 'reactstrap';
import Swal from 'sweetalert2';
import { Button /*, Col, Form*/ } from 'react-bootstrap';
import { API_URL } from '../Support/API_URL';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct,/* getProductLimit,*/ getProduct, deleteProduct, editProduct } from '../Redux/Action';
// import { ProductPagination } from '../Components';

const ManageProducts = () => {
    const productList = useSelector((state) => state.product.productList);
    const loading = useSelector((state) => state.product.loading);

    const dispatch = useDispatch();

    const [update, setUpdate] = useState(false);
    const [toggle, setToggle] = useState(null);
    const [formInput, setformInput] = useState({
        name: '',
        price: '',
        brand: '',
        image: '',
    });
    const [image, setImage] = useState({
        imageName : 'Select File...',
        imageFile : undefined,
    });
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');
    // const [currentPage, setCurrentPage] = useState(1);

    // const productPerPage = 5;
    // const offset = productPerPage * (currentPage - 1);
    // const paginate = pageNumber => setCurrentPage(pageNumber);

    // const totalProducts = useSelector((state) => state.product.count);

    useEffect(() => {
        // dispatch(getProductLimit(productPerPage, offset));
        dispatch(getProduct());
        if (update) setUpdate(false);
    // },[dispatch, update, currentPage, offset]);
    },[dispatch, update]);

    const handleChangeAdd = (e) => {
        setformInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        if (e.target.files[0]) {
            setImage({
                imageFile : e.target.files[0],
                imageName : e.target.files[0].name,
            });
        } else {
            setImage({
                imageName : '',
                imageFile : undefined,
            });
        }
    };

    const handleSubmit = () => {
        Swal.fire({
            title: 'Are you sure you want to add current product?',
            text: 'You won\'t be able to edit after upload the product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, upload it!',
        })
        .then((res) => {
            if (res.value) {
                Swal.fire(
                    'Success!',
                    'Product has been added.',
                    'success',
                );
                let { name, brand,price } = formInput;
                let formData = new FormData();
                formData.append('nama', name);
                formData.append('merk', brand);
                formData.append('harga', price);
                formData.append('image', image.imageFile);
                dispatch(
                    addProduct(formData)
                );
                setUpdate(true);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        })
        .then((res) => {
            if (res.value) {
                Swal.fire(
                    'Deleted!',
                    'Product has been deleted.',
                    'success',
                );
                dispatch(
                    deleteProduct(id)
                );
                setUpdate(true);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const handleEditConfirm = (id) => {
        let formData = new FormData();
        formData.append('nama', editName);
        formData.append('harga', editPrice);
        formData.append('image', image.imageFile);
        dispatch(
            editProduct(id, formData)
        );
        setUpdate(true);
        setToggle(null);
    };

    const renderTable = () => {
        return productList.map((val, index) => {
            if (toggle === val.product_id) {
                return (
                    <tr key={index}>
                        <td style={styles.rowTxtCenter}>{val.id}</td>
                        <td style={styles.rowTxtCenter}>
                            <Input
                                name='name'
                                defaultValue={val.nama}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        </td>
                        <td style={styles.rowTxtCenter}>
                            <CustomInput
                                type='file'
                                name='imageEdit'
                                id='imageEdit'
                                label={image.imageName}
                                onChange={handleImage}
                            />
                        </td>
                        <td style={styles.rowTxtCenter}>
                            <Input
                                name='price'
                                defaultValue={val.harga}
                                onChange={(e) => setEditPrice(e.target.value)}
                            />
                        </td>
                        <td style={styles.rowBtnCenter}>
                            <Button variant='outline-dark' style={styles.buttonStyle} onClick={() => setToggle(null)}>
                                Cancel
                            </Button>
                        </td>
                        <td style={styles.rowBtnCenter}>
                            <Button variant='outline-dark' style={styles.buttonStyle} 
                            onClick={() => handleEditConfirm(val.product_id, editName, editPrice)}>
                                Confirm
                            </Button>
                        </td>
                    </tr>
                );
            }
            return (
                <tr key={index}>
                    <td style={styles.rowTxtCenter}>{index+1}</td>
                    <td style={styles.rowTxtCenter}>{val.nama}</td>
                    <td style={styles.rowTxtCenter}>{val.merk}</td>
                    <td style={styles.rowTxtCenter}>
                        <img src={API_URL + val.imagePath} alt='Gambar' height='100px'/>
                    </td>
                    <td style={styles.rowTxtCenter}>
                        {`Rp. ${val.harga.toLocaleString('id-ID')}`}
                    </td>
                    {/* <td style={styles.rowTxtCenter}>
                        <Button variant='outline-primary' style={styles.buttonStyle} onClick={() => setToggle(val.product_id)}>
                            Edit
                        </Button>
                    </td> */}
                    <td style={styles.rowBtnCenter}>
                        <Button variant='outline-danger' style={styles.buttonStyle} onClick={() => handleDelete(val.product_id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className='d-flex'>
            <div className='col-3'>
                {/* <div className='d-flex justify-content-center'>
                    <Button variant="outline-danger" style={styles.buttonStyle}>
                        Log Out
                    </Button>
                </div> */}
                <Input
                    style={styles.sideInputBox}
                    placeholder='Name'
                    type='text'
                    name='name'
                    id='name'
                    onChange={handleChangeAdd}
                />
                <Input
                    style={styles.sideInputBox}
                    placeholder='Brand'
                    type='text'
                    name='brand'
                    id='brand'
                    onChange={handleChangeAdd}
                />
                <CustomInput
                    style={styles.sideInputBox}
                    type='file'
                    name='image'
                    id='image'
                    label={image.imageName}
                    onChange={handleImage}
                />
                <InputGroup style={styles.sideInputBox}>
                    <InputGroupAddon addonType="prepend">Rp.</InputGroupAddon>
                    <Input
                        type='number'
                        min='0'
                        step='500'
                        placeholder='Price'
                        name='price'
                        id='price'
                        onChange={handleChangeAdd}
                    />
                </InputGroup>
                <div className='d-flex justify-content-center'>
                    <Button 
                    style={styles.buttonStyle}
                    variant='outline-success'
                    onClick={handleSubmit}>
                        {
                            loading
                            ?
                            'Loading...'
                            :
                            'Add Item'
                        }
                    </Button>
                </div>
            </div>
            <div style={styles.container} className='col-9'>
                {/* <Col sm={3} style={{display: 'inline-block'}}>
                    <Form.Control style={{display: 'inline-block'}} type="text" name="productName" placeholder="Product Name" />
                </Col>
                <Button variant='outline-primary' style={styles.buttonStyle}>Search</Button> */}
                <Table hover bordered style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.rowTxtCenter}>#</th>
                            <th style={styles.rowTxtCenter}>Name</th>
                            <th style={styles.rowTxtCenter}>Brand</th>
                            <th style={styles.rowTxtCenter}>Image</th>
                            <th style={styles.rowTxtCenter}>Price</th>
                            <th style={styles.rowTxtCenter}>Action</th>
                            {/* <th colSpan='2' style={styles.rowTxtCenter}>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable()}
                    </tbody>
                </Table>
            </div>
            {/* <ProductPagination
                productPerPage={productPerPage}
                totalProducts={totalProducts}
                paginate={paginate}
            /> */}
        </div>
    );
};

const styles = {
    container: {
        height: '100%',
    },
    table: {
        marginBottom: '20px',
    },
    sideInputBox: {
        marginTop: '10px',
        marginBottom: '10px',
    },
    buttonStyle: {
        borderRadius: '20px',
        padding: '10px',
    },
    rowTxtCenter: {
        textAlign: 'center',
    },
    rowBtnCenter: {
        textAlign: 'center',
        margin: 'auto',
    },
};

export default ManageProducts;
