import React, { useEffect } from 'react';
import { getProduct } from '../Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../Components';
import { API_URL } from '../Support/API_URL';
// import background from '../Components/assets/minimal.jpg';
import './ProductPage.css';

const ProductPage = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.product.productList);
    // console.log(products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    const renderProducts = () => {
        return products.map((val, idx) => {
            return (
                <div className="col-3 cardMap" key={idx}>
                    <ProductCard
                        image={API_URL + val.imagePath}
                        name={val.nama}
                        price={val.harga}
                        brand={val.merk}
                    />
                </div>
            );
        });
    };

    return (
        <div className="mainDiv">
            <div className='firstchild'>
                <div className='col-12 kolom'>
                    <div className='produk'>
                        {renderProducts()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
