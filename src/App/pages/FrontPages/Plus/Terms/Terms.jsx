import React from "react";
import { FrontPageLayout } from "../../../../component/templates/FrontPageLayout/FrontPageLayout";

import { CommonHero } from "../../../../component/templates/Common/CommonHero/CommonHero";

import { TermsNotes } from "../../../../component/templates/Terms/TermsNotes";
export const Terms = () => {
  return (
    <FrontPageLayout>
      <CommonHero
        imageSrc="../../images/terms.svg"
        mainheading="Terms and Conditions"
        secondpara=" We respect your private information hence we want you to fully understand and become aware about our information collection process. This policy and all its clauses are applicable to Pavelify.com"
        thirdpara="By using our website, you consent to the data gathering practices used anywhere in the website."
      />

      <TermsNotes />
    </FrontPageLayout>
  );
};
