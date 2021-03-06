import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({
  handleRemoveProduct, product, modifyQuantity, currency,
}) => (
  <div className="my-5">
    <div className="cart-item">
      <div className="product-description">
        <span
          role="button"
          className="remove-product"
          onClick={() => handleRemoveProduct(product)}
          aria-hidden="true"
        >
          x
        </span>
        <h1 className="text-base mb-8 text-left">{product.title}</h1>
        <div className="quantity">
          <div className="quantity-selector">
            <span
              className="counter-action decrement"
              onClick={() => modifyQuantity('reduce', product)}
              aria-hidden="true"
            >
              -
            </span>
            <span className="counter-number counter">{product.quantity}</span>
            <span
              className="counter-action increment"
              onClick={() => modifyQuantity('increase', product)}
              aria-hidden="true"
            >
              +
            </span>
          </div>
          <div className="price">
            {currency}
            {product.price}
          </div>
        </div>
      </div>
      <div className="product-image">
        <img src={product.image_url} alt={product.title} />
      </div>
    </div>
  </div>
);

CartItem.propTypes = {
  handleRemoveProduct: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  modifyQuantity: PropTypes.func.isRequired,
  product: PropTypes.shape({
    title: PropTypes.string,
    image_url: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};

export default CartItem;
