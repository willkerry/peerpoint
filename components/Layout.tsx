import React, { ReactNode, useState } from "react";
import OldHeader from "./Header";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

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
          <Navbar.Section>
            <Text>Application navbar</Text>
          </Navbar.Section>
          <Navbar.Section grow mt="md">
            2
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={50} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
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
            <Text>Pierrepoint</Text>
            <OldHeader />
          </div>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
};

export default Layout;
