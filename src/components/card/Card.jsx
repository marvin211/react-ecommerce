import { useContext } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../context/index";

const Card = ({
  id,
  title,
  price,
  images,
  description,
  category: { name },
}) => {
  
  const {
    openProductDetail,
    closeProductDetail,
    productToCart,
    setProductToShow,
    setProductToCart,
    openCheckoutSideMenu,
  } = useContext(ShoppingCartContext);

  const showProduct = () => {
    openProductDetail(); //Abrir el componente ProductDetail
    setProductToShow({ id, title, price, images, description, name }); //Almacena el producto seleccionado
  };

  //Agregar un producto al carrito de compras
  const addProductToCart = (event) => {
    event.stopPropagation();
    openCheckoutSideMenu(); //Abrir CheckoutSideMenu

    //Almacena el producto seleccionado en productToCart
    setProductToCart([
      ...productToCart,
      { id, title, price, images, description, name },
    ]);

    //Cerrar el componente closeProductDetail
    closeProductDetail();
  };

  //Renderizar el icono de agregar al carrito de compras
  const renderIcon = (id) => {
    const isInCard =
      productToCart.filter((product) => product.id === id).length > 0; //true o false

    if (isInCard) {
      return (
        <div className="absolute top-0 right-0 flex justify-center items-center bg-gray-700 w-6 h-6 rounded-full m-2 p-1 cursor-auto">
          <CheckIcon className="h-6 w-6 text-white" />
        </div>
      );
    } else {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
          onClick={(event) => addProductToCart(event)}
        >
          <PlusIcon className="h-6 w-6 text-black" />
        </div>
      );
    }
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg"
      onClick={() => showProduct()}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-2 px-3 py-0.5">
          {name}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={images[0]}
          alt={title}
        />

        {renderIcon(id)}
      </figure>

      <p className="flex justify-between">
        <span className="text-sm">{title}</span>
        <span className="text-sm font-medium">${price}</span>
      </p>
    </div>
  );
};

export default Card;
