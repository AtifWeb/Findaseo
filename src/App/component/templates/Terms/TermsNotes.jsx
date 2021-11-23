import React from "react";
import { TermsList } from "../../../../helpers/constants/TermsList";
import { PolicyList } from "../../organisms/Policy/PolicyList";
import styles from "../PrivacyPolicy/PrivacyPolicyNotes.module.css";
export const TermsNotes = () => {
  return (
    <div className={styles.PrivacyPolicyNotes}>
      <div className={`${styles.ContentWrapper} w-1200`}>
        <h1 className={styles.heading}>TERMS OF USE:</h1>
        <p className={styles.para}>Last updated November 16, 2021</p>

        <div className={styles.policyListWrapper}>
          {TermsList.map((EachPolicy) => (
            <PolicyList EachPolicy={EachPolicy} />
          ))}
        </div>
      </div>
    </div>
  );
};
