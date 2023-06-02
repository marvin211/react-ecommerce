import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartContext } from "../../context/index";
import OrderCard from "../orderCard/OrderCard";
import { totalPrice } from "../../utils/index";
import "./styles.css";

const CheckoutSideMenu = () => {
  const {
    productToCart,
    order,
    isCheckoutSideMenuOpen,
    closeCheckoutSideMenu,
    setProductToCart,
    setOrder,
    setIsCheckoutSideMenuOpen,
    setSearchByTitle,
  } = useContext(ShoppingCartContext);

  const deleteProduct = (id) => {
    const productsFiltered = productToCart.filter(
      (product) => product.id !== id
    );
    setProductToCart(productsFiltered);
    
  };

  //Función para manejar el checkout
  const handleCheckout = () => {
    //Crear la orden de compra
    const orderToAdd = {
      // id: order.length + 1, //Se crea el id de la orden de compra
      date: new Date(),
      products: productToCart,
      totalProducts: productToCart.length,
      totalPrice: totalPrice(productToCart),
    };

    //Se agrega la orden de compra
    setOrder([...order, orderToAdd]);

    //Limpiar
    setProductToCart([]);
    setSearchByTitle(null);
    setIsCheckoutSideMenuOpen(false);
  };

  return (
    <aside
      className={`${
        isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div
          className="cursor-pointer text-xl font-semibold"
          onClick={() => closeCheckoutSideMenu()}
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </div>
      </div>

      <div className="px-6 overflow-y-auto flex-1">
        {productToCart.map((product) => (
          <OrderCard
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
          />
        ))}
      </div>

      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2 mt-2">
          <span className="font-semibold">Total: </span>
          <span className="font-bold text-2xl">
            ${totalPrice(productToCart)}
          </span>
        </p>
        <Link to="/my-orders/last">
          <button
            className="bg-black text-white w-full py-2 rounded-lg"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
