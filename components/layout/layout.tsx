import {
  Anchor,
  AppShell,
  Burger,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Navbar,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Header from "./header";
// import Logo from "./icons/logo";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  /*
   * const theme = useMantineTheme();
   * const [opened, setOpened] = React.useState(false);
   */
  const { data: session } = useSession();

  const sidebar = (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      // hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section grow>
        {session && (
          <Stack>
            <Link href="/" passHref>
              <Anchor component="a">Feed</Anchor>
            </Link>
            <Link href="/drafts" passHref>
              <Anchor component="a">Drafts</Anchor>
            </Link>
          </Stack>
        )}
      </Navbar.Section>
    </Navbar>
  );

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      // navbar={sidebar}
      header={
        <MantineHeader height={50} p="md">
          <div
            style={{
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
                <Text component="a" weight={700}>
                  {/* <Logo /> */}
                  Peerpoint
                </Text>
              </Link>
              <Header />
            </Group>
          </div>
        </MantineHeader>
      }
    >
      {props.children}
    </AppShell>
  );
};

export default Layout;
