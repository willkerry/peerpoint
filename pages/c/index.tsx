import { useRouter } from "next/router";

const RedirectToChallenge = () => {
  const router = useRouter();
  const { challenge } = router.query;
  if (challenge) {
    router.push(`/c/${challenge}`);
  }

  return null;
};

export default RedirectToChallenge;
