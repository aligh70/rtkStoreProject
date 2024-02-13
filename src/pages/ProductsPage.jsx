import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Card from "../componenets/Card";
import Loader from "../componenets/Loader";
import { fetchProducts } from "../features/product/productSlice";
import styles from "./ProductsPage.module.css";
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helper/helper";
import SearchBox from "../componenets/SearchBox";
import Sidebar from "../componenets/Sidebar";

function ProductsPage() {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.product);
  const { products, loading } = state;
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setDisplayed(products);

    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {loading && <Loader />}
          {displayed.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductsPage;
