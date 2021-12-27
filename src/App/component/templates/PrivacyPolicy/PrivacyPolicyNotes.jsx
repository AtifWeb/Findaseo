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
        This privacy notice describes how we might use your information if you:
        <ul  style={{marginTop:'1rem'}}>
          <li>
          Visit our website at https://pavelify.com
          </li>
          <li>
          Engage with us in other related ways ― including any sales, marketing, or events
          </li>
        </ul>
        </p>
        <p className={styles.para}>
        In this privacy notice, if we refer to:
        <ul style={{marginTop:'1rem'}}>
          <li>
          "Website," we are referring to any website of ours that references or links to this policy
          </li>
          <li>
          "Services," we are referring to our Website, and other related services, including any sales, marketing, or events
          </li>
        </ul>
        </p>

        <p style={{fontWeight:700,fontSize:14}}> The purpose of this privacy notice is to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.
</p>

<h1 style={{marginTop:'3rem'}} className={styles.BeforeList}>WHAT INFORMATION DO WE COLLECT?</h1>
        <div className={styles.policyListWrapper}>
          {PolicyListOptions.map((EachPolicy) => (
            <PolicyList EachPolicy={EachPolicy} />
          ))}
        </div>
      </div>
    </div>
  );
};
