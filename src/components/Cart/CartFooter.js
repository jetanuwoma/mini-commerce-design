import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const CartFooter = ({ total, currency }) => (
  <footer className="absolute bottom-0 cart-footer">
    <div className="cart-total">
      <p>Subtotal</p>
      <p>{`${currency}${total.toFixed(2)}`}</p>
    </div>

    <div className="cart-action-btns">
      <button type="button">Make this a subscription (Save 20%)</button>
      <button type="button">Proceed to Checkout</button>
    </div>
  </footer>
);

CartFooter.propTypes = {
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default CartFooter;
