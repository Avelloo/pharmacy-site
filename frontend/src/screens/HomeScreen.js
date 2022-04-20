import React from 'react'
import Product from "../components/Product";
import data from '../data';

export default function HomeScreen() {
    return (
        <div>
            <div className="row center">
                {
                    data.product.map(product => (
                        <Product key={product._id} product={product}></Product>
                    ))
                }

            </div>
        </div>
    )
}
