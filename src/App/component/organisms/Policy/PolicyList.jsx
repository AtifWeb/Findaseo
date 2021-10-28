import React from "react";
import styles from "./PolicyList.module.css";
export const PolicyList = ({ EachPolicy }) => {
  return (
    <ul>
      <li className={styles.head}>{EachPolicy["heading"]}</li>
      {EachPolicy["list"].map((list) => (
        <>
          <li className={styles.list}>{list}</li>
          {EachPolicy["extra"] !== null &&
            EachPolicy["extra"].map((list, index) => (
              <ul className={styles.subList} key={String(index)}>
                <li className={styles.Subhead}>{list.heading}</li>
                <li className={styles.list}>{list.value}</li>
              </ul>
            ))}
        </>
      ))}
    </ul>
  );
};
