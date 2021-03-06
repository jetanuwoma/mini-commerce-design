import React from 'react';
import PropType from 'prop-types';

const ProductItem = ({
  addTocart, image, title, price, productId, currency,
}) => (
  <div className="flex flex-col py-12 px-7 justify-center items-center">
    <div className="flex h-32 item-center justify-center mb-4">
      <img className="px-1 object-contain" src={image} alt={title} />
    </div>
    <h3 className="mb-2 text-base font-lora">{title}</h3>
    <p className="font-lora text-base mb-0.5">
      From:
      <span data-product-code={productId}>
        {` ${currency}${price.toFixed(2)}`}
      </span>
    </p>
    <button
      type="button"
      onClick={addTocart}
      className="btn-pry"
    >
      Add to Cart
    </button>
  </div>
);

ProductItem.propTypes = {
  addTocart: PropType.func.isRequired,
  title: PropType.string.isRequired,
  image: PropType.string.isRequired,
  price: PropType.number.isRequired,
  productId: PropType.number.isRequired,
  currency: PropType.string.isRequired,
};

export default ProductItem;
