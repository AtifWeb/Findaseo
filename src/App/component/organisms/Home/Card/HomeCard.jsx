import React from "react";
import styles from "./HomeCard.module.css";
export const HomeCard = ({
  bgcolor = null,
  title,
  desc,
  LargeText = null,
  img = null,
  imgClass=null,
  list = null,
}) => {
  return (
    <div className={styles.HomeCard}>
      <div
        className={styles.Top}
        style={{ background: bgcolor != null && bgcolor }}
      >
        {LargeText !== null && <h1 className={styles.LongText}>{LargeText}</h1>}

        {img != null && <picture>
          <source srcSet={img} className= {imgClass} />          
          <img src={img} className={imgClass}/>
         </picture>
         }
        {/* {img != null && <img src={img} alt="" className={styles.image} />} */}
      </div>
      <div className={styles.content}>
        <h1 className={styles.head}>{title}</h1>
        <p className={styles.para}>{desc}</p>
        {list !== null && (
          <ul className={styles.cardUL}>
            {list.map((Each) => (
              <li className={styles.list}>
                <i class="fas fa-check"></i>
                <p className={styles.list_para}>{Each}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
