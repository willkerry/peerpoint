import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import EvaluationIntro from "../components/evaluation/evaluation-intro";
import FormFrame from "../components/evaluation/form-frame";
import { Layout } from "../components/layout";

export const studentSrc =
  "https://forms.office.com/Pages/ResponsePage.aspx?id=z8oksN7eQUKhXDyX1VPp83qfg2kEy-pMp66634QBRXVUMjRORVRNSjVERVM5SUdJNlM0WVNBRVVWWC4u&embed=true";

export const teacherSrc = "/";

const Evaluation = () => {
  const [src, setSrc] = useState("");
  const router = useRouter();
  const { q } = router.query;

  /*
   * If query string is correctly set, load up the appropriate URL.
   *  - /?q=student -> student form
   *  - /?q=teacher -> teacher form
   */
  useEffect(() => {
    if (q === "student") setSrc(studentSrc);
    else if (q === "teacher") setSrc(teacherSrc);
    else setSrc("");
  }, [q]);

  return (
    <Layout title="Evaluation">
      {src ? (
        <FormFrame {...{ src, setSrc }} />
      ) : (
        <EvaluationIntro {...{ setSrc }} />
      )}
    </Layout>
  );
};

export default Evaluation;
