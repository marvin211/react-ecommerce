import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartContext } from "../../context/index";
import "./styles.css";

const ProductDetail = () => {
  const { isProductDetailOpen, productToShow, closeProductDetail } =
    useContext(ShoppingCartContext);

  return (
    <aside
      className={`${
        isProductDetailOpen ? "flex" : "hidden"
      } product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>

        <div
          className="cursor-pointer text-xl font-semibold"
          onClick={() => closeProductDetail()}
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />
        </div>
      </div>

      <div className="overflow-y-auto">
        <figure className="px-6">
          <img
            className="w-full h-full rounded-lg"
            src={productToShow.images && productToShow.images[0]}
            alt={productToShow.title}
          />
        </figure>
        <p className="flex flex-col p-6">
          <span className="font-medium text-2xl mb-2">
            ${productToShow.price}
          </span>
          <span className="font-medium text-xl">{productToShow.title}</span>
          <span className="font-lg text-base">{productToShow.description}</span>
        </p>
      </div>
    </aside>
  );
};

export default ProductDetail;
