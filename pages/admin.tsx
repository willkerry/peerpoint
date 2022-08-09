import { Grid } from "@mantine/core";
import useSWR from "swr";
import { Layout, TitleGroup } from "../components/layout";
import fetchChallenges from "../lib/fetchers/fetch-challenges";
import { ChallengePreview } from "../components/display/";
import { useSession } from "next-auth/react";

const Admin: React.FC = () => {
  const { data } = useSWR(["", true], fetchChallenges);
  const { data: session } = useSession();
  console.log(session);

  return (
    <Layout loading={!data} title="Admin">
      <Grid>
        <Grid.Col span={12}>
          <TitleGroup area="Your challenges" title={session?.user?.email} />
        </Grid.Col>
        {data?.map((ch) => (
          <Grid.Col span={12} xs={6} sm={4} md={3} xl={2} key={ch.id}>
            <ChallengePreview challenge={ch} userOwns />
          </Grid.Col>
        ))}
      </Grid>
    </Layout>
  );
};
export default Admin;
