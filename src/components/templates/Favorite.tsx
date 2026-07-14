import { useWishList } from "@/hooks/useWishList";
import styles from "@/components/templates/styles/favorite/route.module.css";

const Favorite = () => {
  const { wishList } = useWishList();
  const convertedList = JSON.parse(JSON.stringify(wishList));

  console.log(convertedList);
  return (
    <ul className="flex gap-2">
      {wishList.length
        ? wishList.map((item) => (
            <li key={item.id} className={styles.list}>
              <div className={styles.list__header}>
                <span className="text-[1rem] mr-auto">
                  {item.market_cap_rank}
                </span>
                <span className="text-[0.8rem]">{item.symbol}</span>
              </div>
              <div className={styles.list__main}>
                <div className="w-8 h-8 ">
                  <img
                    className="rounded-full"
                    src={item.image}
                    alt="coin-imgs"
                  />
                </div>
                <span className=" text-[0.9rem] text-gray-300">
                  {item.name}
                </span>
              </div>
            </li>
          ))
        : ""}
    </ul>
  );
};

export default Favorite;
