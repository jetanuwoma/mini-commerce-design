import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../assets/logo.png';
import cartIcon from '../assets/cart.png';

const Header = ({ onClickCart, cartCount }) => (
  <header className="flex justify-between py-1 px-10 bg-white border-b-2 bg-gray-50">
    <div className="logo w-40">
      <img src={Logo} alt="Lumin skin for men - logo" />
    </div>
    <div
      role="button"
      className="w-10 cursor-pointer self-center p-1 relative"
      onClick={onClickCart}
      aria-hidden="true"
    >
      <img src={cartIcon} alt="cart icon - lumin skins" />
      <span className="absolute cart-count">{cartCount}</span>
    </div>
  </header>
);

Header.propTypes = {
  onClickCart: PropTypes.func.isRequired,
  cartCount: PropTypes.number.isRequired,
};

export default Header;
