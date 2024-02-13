import { useSelector } from "react-redux";
import BasketCard from "../componenets/BasketCard";
import BasketSidebar from "../componenets/BasketSidebar";

import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const state = useSelector((store) => store.cart);

  if (!state.itemsCounter) {
    return (
      <div className={styles.container}>
        <p>Empty</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BasketSidebar state={state} />
      <div className={styles.products}>
        {state.selectedItems.map((product) => (
          <BasketCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default CheckoutPage;
