import { useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

import Layout from "../../components/layout/Layout";
import { ShoppingCartContext } from "../../context/index";
import OrderCard from "../../components/orderCard/OrderCard";

const MyOrder = () => {
  const { order } = useContext(ShoppingCartContext);

  const currentPath = window.location.pathname; //Se obtiene la ruta actual
  let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);

  if (index === "last") index = order?.length - 1;

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-6">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>

        <h1>My Order</h1>
      </div>

      <div className="flex flex-col w-80">
        {order?.[index]?.products.map((product) => (
          <OrderCard key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default MyOrder;
