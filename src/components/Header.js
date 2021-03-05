import React from 'react';
import Logo from '../assets/logo.png';
import cartIcon from '../assets/cart.png'

const Header = ({ onClickCart, itemsInCart }) => (
  <header className="flex justify-between py-1 px-10 bg-white border-b-2 bg-gray-50">
    <div className="logo w-40">
      <img src={Logo} alt="Lumin skin for men - logo" />
    </div>

    <div className="cart w-10 cursor-pointer self-center p-1 relative" onClick={onClickCart}>
      <img src={cartIcon} alt="cart icon - lumin skins" />
      <span className="cart-number absolute cart-count">{itemsInCart}</span>
    </div>
  </header>
);

export default Header;
