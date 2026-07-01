import Search from "../elements/Search";
import styles from "@/components/layout/styles/header/route.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Coinzed</h1>

      <Search />
    </header>
  );
};

export default Header;
