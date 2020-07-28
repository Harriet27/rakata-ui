import React, { useState, useEffect } from 'react';
import { Table, Input, CustomInput, InputGroupAddon, InputGroup } from 'reactstrap';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import { API_URL } from '../Support/API_URL';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getProduct, deleteProduct } from '../Redux/Action';
import './ManageProduct.css';

const ManageProducts = () => {
    const productList = useSelector((state) => state.product.productList);
    const loading = useSelector((state) => state.product.loading);

    const dispatch = useDispatch();

    const [update, setUpdate] = useState(false);
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

    useEffect(() => {
        dispatch(getProduct());
        if (update) setUpdate(false);
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

    const renderTable = () => {
        return productList.map((val, index) => {
            return (
                <tr key={index}>
                    <td style={styles.rowTxtCenter}>{val.nama}</td>
                    <td style={styles.rowTxtCenter}>{val.merk}</td>
                    <td style={styles.rowTxtCenter}>
                        <img src={API_URL + val.imagePath} alt='Gambar' className='image' />
                    </td>
                    <td style={styles.rowTxtCenter}>
                        {`Rp. ${val.harga.toLocaleString('id-ID')}`}
                    </td>
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
        <div className='yeet'>
            <div className='addForm' style={{marginTop: '10px'}}>
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
            <div className='tabel' style={styles.container}>
                <Table hover bordered style={styles.table} size='sm'>
                    <thead>
                        <tr>
                            <th style={styles.rowTxtCenter}>Name</th>
                            <th style={styles.rowTxtCenter}>Brand</th>
                            <th style={styles.rowTxtCenter}>Image</th>
                            <th style={styles.rowTxtCenter}>Price</th>
                            <th style={styles.rowTxtCenter}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable()}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100%',
    },
    table: {
        marginTop: '20px',
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
