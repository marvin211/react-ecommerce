import { XMarkIcon } from "@heroicons/react/24/solid";

const OrderCard = ({ product, deleteProduct }) => {
  const { id, title, images, price } = product;

  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20">
          <img
            className="w-full h-full rounded-lg object-cover"
            src={images && images[0]}
            alt={title}
          />
        </figure>
        <p className="text-sm font-light">{title}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-lg font-medium"> ${price}</p>
        {deleteProduct && (
          <XMarkIcon
            onClick={() => deleteProduct(id)}
            className="cursor-pointer h-6 w-6 text-gray-500"
          />
        )}
      </div>
    </div>
  );
};

export default OrderCard;
