import React from 'react';
import PropTypes from 'prop-types';

import CartFooter from './CartFooter';
import CartItem from './CartItem';

import currencies from '../../utils/currencies';
import arrow from '../../assets/arrow.svg';

const Cart = ({
  show,
  onClose,
  currency,
  handleCurrencyChange, handleQuantityChange, cartItems,
  total, handleRemoveProduct,
}) => (
  <div className={`flex h-screen p-5 overflow-x-auto top-0 ${show ? 'right-0' : '-right-full'} cart-wrapper`}>
    <div className="flex justify-between">
      <div>
        <button type="button" className="close-btn" onClick={onClose}>
          <img src={arrow} alt="close" />
        </button>
      </div>
      <div className="self-center">
        <h5 className="cart-title">YOUR CART</h5>
      </div>
      <div />
    </div>
    <div className="currency-select-row">
      <select
        className="currency-select"
        defaultValue={currency.code}
        onChange={handleCurrencyChange}
      >
        {currencies.map((item) => (<option key={item.code} value={item.code}>{item.code}</option>))}
      </select>
    </div>
    <div className="cart-body">
      {cartItems.length === 0 && (<h1>Cart Empty</h1>)}
      {cartItems.length > 0 && (
      <>
        {cartItems.map((item) => (
          <CartItem
            key={item.title}
            product={item}
            currency={currency.symbol}
            modifyQuantity={handleQuantityChange}
            handleRemoveProduct={handleRemoveProduct}
          />
        ))}
      </>
      )}
    </div>
    <CartFooter total={total} currency={currency.symbol} />
  </div>
);

Cart.propTypes = {
  currency: PropTypes.shape({
    code: PropTypes.string,
    symbol: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  handleCurrencyChange: PropTypes.func.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  handleRemoveProduct: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      quantity: PropTypes.number,
      image: PropTypes.string,
    }),
  ).isRequired,
};

export default Cart;
