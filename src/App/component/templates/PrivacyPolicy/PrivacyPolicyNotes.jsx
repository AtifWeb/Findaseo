import React from "react";
import { PolicyListOptions } from "../../../../helpers/constants/PolicyList";
import { PolicyList } from "../../organisms/Policy/PolicyList";
import styles from "./PrivacyPolicyNotes.module.css";
export const PrivacyPolicyNotes = () => {
  return (
    <div className={styles.PrivacyPolicyNotes}>
      <div className={`${styles.ContentWrapper} w-1200`}>
        <h1 className={styles.heading}>Important Notes:</h1>
        <p className={styles.para}>
          This privacy policy is subject to change at any time without notice.
          To make sure you are aware of any changes, please review this policy
          periodically.
        </p>
        <p className={styles.para}>
          By mere use of the Website, you expressly consent to our use and
          disclosure of your personal information in accordance with this
          Privacy Policy. This Privacy Policy is incorporated into and subject
          to the Terms of Use.
        </p>
        <div className={styles.policyListWrapper}>
          {PolicyListOptions.map((EachPolicy, index) => (
            <PolicyList key={String(index)} EachPolicy={EachPolicy} />
          ))}
        </div>
      </div>
    </div>
  );
};
