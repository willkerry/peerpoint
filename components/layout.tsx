import React, { ReactNode, useState } from "react";
import OldHeader from "./header";
import Link from "next/link";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Anchor,
  Stack,
} from "@mantine/core";
import router from "next/router";
import { useSession } from "next-auth/react";
import { Group } from "@mantine/core";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data: session, status } = useSession();

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
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
      }
      header={
        <Header height={50} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Group position="apart" grow style={{ width: "100%" }}>
              <Text>Pierrepoint</Text>
              <OldHeader />
            </Group>
          </div>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
};

export default Layout;
