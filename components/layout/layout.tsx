import React from "react";

// import { useSession } from "next-auth/react";
import Link from "next/link";

import { AppShell, Box, Group, Header as MantineHeader } from "@mantine/core";

import Logo from "../icons/logo";
import Header from "./header";
import Meta from "./meta";

type Props = {
  children?: React.ReactNode;
  loading?: boolean;
  title?: string;
  noPad?: boolean;
};

const defaultProps = {
  children: null,
  loading: false,
  title: "Peerpoint",
  noPad: false,
};

const Layout: React.FC<Props> = ({ title, children, loading, noPad }) => (
  /*
   * const theme = useMantineTheme();
   * const [opened, setOpened] = React.useState(false);
   */
  // const { data: session } = useSession();

  /*
   * const sidebar = (
   *   <Navbar
   *     p="md"
   *     hiddenBreakpoint="sm"
   *     // hidden={!opened}
   *     width={{ sm: 200, lg: 300 }}
   *   >
   *     <Navbar.Section grow>
   *       {session && (
   *         <Stack>
   *           <Link href="/" passHref>
   *             <Anchor component="a">Feed</Anchor>
   *           </Link>
   *           <Link href="/drafts" passHref>
   *             <Anchor component="a">Drafts</Anchor>
   *           </Link>
   *         </Stack>
   *       )}
   *     </Navbar.Section>
   *   </Navbar>
   * );
   */

  <>
    <Meta {...{ title }} />
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      padding={noPad ? 0 : "md"}
      // navbar={sidebar}
      header={
        <MantineHeader height={50} p="md">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            {/* <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery> */}
            <Group position="apart" grow style={{ width: "100%" }}>
              <Link href="/" passHref>
                <Box component="a" sx={{ color: "inherit", lineHeight: 0 }}>
                  <Logo animate={loading} height="1em" />
                </Box>
              </Link>
              <Header />
            </Group>
          </Box>
        </MantineHeader>
      }
    >
      <Box sx={{ position: "relative" }}>{children}</Box>
    </AppShell>
  </>
);
Layout.defaultProps = defaultProps;

export default Layout;
