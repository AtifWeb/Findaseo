import React from "react";
import styles from "./CareersForm.module.css";
export const CareersForm = () => {
  return (
    <div className={styles.CareersForm}>
      <div className={`${styles.contactFormContent}   w-1200 `}>
        <h1 className={styles.heading}>Contact Form</h1>

        <form action="" className={styles.Form}>
          <div className={styles.inputWrapper}>
            <label htmlFor="" className={styles.label}>
              Name
            </label>
            <input type="text" placeholder="Name" className={styles.input} />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="" className={styles.label}>
              Email
            </label>
            <input type="email" placeholder="Email" className={styles.input} />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="" className={styles.label}>
              Phone
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor=" " className={styles.label}>
              Skills
            </label>
            <input type="text" placeholder="Skills" className={styles.input} />
          </div>

          <button className={styles.Button}>Try Pavelify for free</button>
        </form>
      </div>
    </div>
  );
};
