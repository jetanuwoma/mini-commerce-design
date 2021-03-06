import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import Header from './components/Header';
import ProductItem from './components/ProductItem';
import CartView from './components/Cart';

import Query from './utils/query';
import currencies from './utils/currencies';

import './App.scss';

function App() {
  const [currency, setCurrency] = useState(currencies[0]);
  const [products, setProducts] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [carts, setCarts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const { loading } = useQuery(Query(currency.code), {
    onCompleted: (data) => setProducts(data.products),
  });

  useEffect(() => {
    let priceTotal = 0;
    const newCart = carts ? carts.map((cartItem) => {
      const item = cartItem;
      const newItem = products.find((product) => cartItem.id === product.id);
      if (newItem) {
        item.price = newItem.price;
        priceTotal += newItem.price * item.quantity;
        setCartTotal(cartTotal + (item.price * item.quantity));
      }
      return item;
    }) : [];
    setCartTotal(priceTotal);
    setCarts(newCart);
  }, [products]);

  const handleCurrencyChange = ({ target: { value } }) => {
    setCurrency(
      currencies.filter((item) => item.code === value)[0],
    );
  };

  const addToCart = (item) => {
    const cartsItem = [...carts];
    const inCart = cartsItem.filter((prod) => item.id === prod.id)[0];
    if (inCart) {
      inCart.quantity += 1;
      cartsItem.map((prod) => {
        if (prod.id === inCart.id) {
          return inCart;
        }
        return prod;
      });
      setCartTotal(cartTotal + item.price);
      setCarts(cartsItem);
      return setShowOverlay(true);
    }
    setCartTotal(cartTotal + item.price);
    setCarts([...carts, { ...item, quantity: 1 }]);
    return setShowOverlay(true);
  };

  const removeCartItem = (item) => {
    const inCart = carts.filter((prod) => item.id === prod.id)[0];
    const cartsItem = [...carts];
    let priceReduction = 0;
    if (inCart) {
      setCarts(cartsItem.filter((prod) => {
        if (prod.id === inCart.id) {
          priceReduction = inCart.price * inCart.quantity;
          return false;
        }
        return true;
      }));
    }
    setCartTotal(cartTotal - priceReduction);
  };

  const onQuantityModify = (type, item) => {
    const cartsItem = [...carts];
    const product = item;
    const operand = type === 'reduce' ? -1 : 1;

    if (product.quantity > 1 || type === 'increase') {
      product.quantity += operand;
      cartsItem.map((prod) => {
        if (prod.id === product.id) {
          return product;
        }
        return prod;
      });
      setCartTotal(cartTotal + (operand * product.price));
      setCarts(cartsItem);
    }
  };

  return (
    <div className="flex flex-col">
      <Header
        onClickCart={() => setShowOverlay(true)}
        cartCount={carts.length}
      />
      <div className="flex bg-gray-50 p-10 h-72 justify-center">
        <div className="w-full m-auto max-w-screen-lg">
          <h1 className="font-lora text-4xl font-normal">All Products</h1>
          <p className="text-base mt-2">A 360° look at Lumin</p>
        </div>
      </div>
      <section>
        <div className="grid grid-cols-3 gap-4">
          {loading && (
            <p>Loading.....</p>
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
                currency={currency.symbol}
                addTocart={() => addToCart(product)}
              />
            ))}
          </>
          )}
        </div>
        <CartView
          show={showOverlay}
          cartItems={carts}
          currency={currency}
          total={cartTotal}
          handleQuantityChange={onQuantityModify}
          onClose={() => setShowOverlay(false)}
          handleCurrencyChange={handleCurrencyChange}
          handleRemoveProduct={removeCartItem}
        />
      </section>
      {showOverlay && (
        <div className="fixed left-0 top-0 w-full h-full overlay" />
      )}
    </div>
  );
}

export default App;
