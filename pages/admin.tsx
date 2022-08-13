import { Grid, Select } from "@mantine/core";

import { useSession } from "next-auth/react";
import useSWR from "swr";

import ChallengePreview from "../components/display/challenge-preview";
import { Layout, TitleGroup } from "../components/layout";
import fetchChallenges from "../lib/fetchers/fetch-challenges";

const Admin: React.FC = () => {
  const { data } = useSWR(["", true], fetchChallenges);
  const { data: session } = useSession();

  return (
    <Layout loading={!data} title="Admin">
      <Grid>
        <Grid.Col span={12}>
          <TitleGroup area="Your challenges" title={session?.user?.email} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            disabled
            label="Filter by course"
            defaultValue="all"
            data={[
              {
                value: "all",
                label: "All",
              },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            disabled
            label="Sort"
            defaultValue="newest"
            data={[
              {
                value: "newest",
                label: "Newest",
              },
              {
                value: "oldest",
                label: "Oldest",
              },
            ]}
          />
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
