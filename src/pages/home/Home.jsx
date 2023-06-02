import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import ProductDetail from "../../components/productDetail/ProductDetail";
import { ShoppingCartContext } from "../../context/index";

function Home() {
  const { filteredItems, setSearchByTitle } = useContext(ShoppingCartContext);

  const renderView = () => {
    if (filteredItems?.length > 0) { //Si existen elementos
      return filteredItems?.map((product) => ( 
        <Card key={product.id} {...product} />
      ));
    } else {
      return (
        <div>
          <p className="font-medium text-xl">No products found ☹️</p>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h1 className="font-medium text-xl">Exclusive Products</h1>
      </div>

      <input
        type="text"
        placeholder="Search a product"
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        onChange={(event) => setSearchByTitle(event.target.value)}
      />

      <div className="grid grid-cols-4 gap-4 w-full max-w-screen-lg">
        {renderView()}
      </div>

      <ProductDetail />
    </Layout>
  );
}

export default Home;
