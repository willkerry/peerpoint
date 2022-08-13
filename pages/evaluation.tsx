import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import EvaluationIntro from "../components/evaluation/evaluation-intro";
import FormFrame from "../components/evaluation/form-frame";
import { Layout } from "../components/layout";
import { studentSrc, teacherSrc } from "../lib/evaluation";

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
