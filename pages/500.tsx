import EmptyState from "../components/display/empty-state";
import { Layout } from "../components/layout";

const Error500: React.FC = () => (
  <Layout>
    <EmptyState
      title="Error 500"
      description="Something went wrong in the backend."
    />
  </Layout>
);

export default Error500;
