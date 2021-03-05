import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import Header from './components/Header';
import Loading from './components/Loading';
import ProductItem from './components/ProductItem';

import Query from './utils/query';
import currencies from './utils/currencies';

import './App.scss';

function App() {
  const [currency, setCurrency] = useState(currencies[0]);
  const [products, setProducts] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [carts, setCarts] = useState([]);
  const { loading } = useQuery(Query(currency.code), { onCompleted:  ({ products }) => setProducts(products) });

  const onAddToCart = (item) => {
    const cartsItem = [...carts];
    const inCart = cartsItem.filter((prod) => item.id === prod.id)[0];
    setShowOverlay(true);
    if (inCart) {
      inCart.quantity = inCart.quantity  + 1
      cartsItem.map((item) => {
        if (item.id === inCart.id) {
          return inCart
        }
        return item
      })
      return setCarts(cartsItem)
    }
    return setCarts([...carts, { ...item, quantity: 1 }])
  }

  return (
    <div className="flex flex-col">
     <Header />
     <div className="flex bg-gray-50 p-10 h-72 justify-center">
       <div className="w-full m-auto max-w-screen-lg">
        <h1 className="font-lora text-4xl font-normal">All Products</h1>
        <p className="text-base mt-2">A 360° look at Lumin</p>
      </div>
     </div>
     <section>
        <div className="grid grid-cols-3 gap-4">
          {loading && (
            <Loading />
          )}
          {!loading && (
            <>
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  price={product.price}
                  title={product.title}
                  image={product.image_url}
                  productId={product.id}
                  addTocart={() => onAddToCart(product)}
                />
              ))}
            </>
          )}
        </div>
      </section>
      {showOverlay && (
        <div
          className="fixed left-0 top-0 w-full h-full overlay"
          onClick={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
}

export default App;
