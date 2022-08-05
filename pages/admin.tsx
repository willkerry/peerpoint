import { Title, Grid } from "@mantine/core";
import useSWR from "swr";
import { Layout } from "../components/layout";
import fetchChallenges from "../lib/fetchers/fetch-challenges";
import { ChallengePreview } from "../components/display/";

const Admin: React.FC = () => {
  const { data } = useSWR(["", true], fetchChallenges);

  return (
    <Layout loading={!data} title="Admin">
      <Title mb="xl" order={3}>
        Your challenges
      </Title>

      <Grid>
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
