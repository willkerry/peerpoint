import EmptyState from "../components/display/empty-state";
import { Layout } from "../components/layout";

const Error404: React.FC = () => (
  <Layout>
    <EmptyState
      title="Error 404"
      description="That route didn’t go anywhere."
    />
  </Layout>
);

export default Error404;
