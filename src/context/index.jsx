import { useState, useEffect, useCallback } from "react";
import { createContext } from "react";

export const ShoppingCartContext = createContext();

//Proveer el contexto a la app
export const ShoppingCartProvider = ({ children }) => {
  //Mostrar o ocultar el componente ProductDetail
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  //Almacenar el producto seleccionado
  const [productToShow, setProductToShow] = useState({});

  //Almacenar los productos que se agregarán al carrito de compras
  const [productToCart, setProductToCart] = useState([]);

  //Mostrar u ocultar el componente CheckoutSideMenu
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);

  // Orden de compra
  const [order, setOrder] = useState([]);

  //Obtener todos los productos
  const [items, setItems] = useState(null);

  // Filtrar los elementos ya sea por busqueda o categoría
  const [filteredItems, setFilteredItems] = useState(null);

  //Obtener lo que se escribe en el input de buscar product
  const [searchByTitle, setSearchByTitle] = useState(null);

  //Obtener los productos por categoría
  const [searchByCategory, setSearchByCategory] = useState(null);

  //Obtener los productos de la API
  const fechtItems = async () => {
    const url = "https://api.escuelajs.co/api/v1/products";
    const response = await fetch(url);
    const data = await response.json();

    setItems(data); //Almacenar los datos obtenidos
  };

  useEffect(() => {
    fechtItems(); //Se invoca la función para obtener los productos de la API
  }, []);

  //Funciones para abrir y cerrar el componente ProductDetail
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);
  
  //Funciones para abrir y cerrar el componente de CheckoutSideMenu
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);
  

  //Filtrar los productos por el input de buscar a través del título
  const filterItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  //Filtrar elementos o productos por categoria
  const filterItemsByCategory = (items, searchByCategory) => {
    return items?.filter((item) =>
      item.category?.name.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };

  //Filtrar los elementos o productos
  const filterBy = useCallback(
    (searchType, items, searchByTitle, searchByCategory) => {
      if (searchType === "BY_TITLE") {
        return filterItemsByTitle(items, searchByTitle);
      }

      if (searchType === "BY_CATEGORY") {
        return filterItemsByCategory(items, searchByCategory);
      }

      if (searchType === "BY_TITLE_AND_CATEGORY") {
        return filterItemsByCategory(items, searchByCategory).filter((item) =>
          item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        );
      }

      if (!searchType) {
        return items;
      }
    },
    []
  );

  //Filtrar los elementos
  useEffect(() => {
    if (searchByTitle && searchByCategory) { //true && true
      setFilteredItems(
        filterBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchByTitle,
          searchByCategory
        )
      ); //filtrar los elementos por busqueda y categoría
    }

    if (searchByTitle && !searchByCategory) { // true && false
      setFilteredItems(
        filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
      ); //filtrar los elementos por busqueda
    }

    if (!searchByTitle && searchByCategory) { //false && true
      setFilteredItems(
        filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
      ); //filtrar los elementos por categoría
    }

    if (!searchByTitle && !searchByCategory) { //false && false
      setFilteredItems(
        filterBy(null, items, searchByTitle, searchByCategory)
      ); //filtrar todos los elementos
    }
  }, [items, searchByTitle, searchByCategory, filterBy]);

  return (
    <ShoppingCartContext.Provider
      value={{
        isProductDetailOpen,
        productToShow,
        productToCart,
        isCheckoutSideMenuOpen,
        order,
        items,
        searchByTitle,
        filteredItems,
        searchByCategory,

        openProductDetail,
        closeProductDetail,
        setProductToShow,
        setProductToCart,
        setIsCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        setOrder,
        setItems,
        setSearchByTitle,
        setFilteredItems,
        setSearchByCategory,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
