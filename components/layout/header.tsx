import React from "react";

import {
  ActionIcon,
  Group,
  Menu,
  Skeleton,
  Text,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";

import {
  IconInfoCircle,
  IconLogin,
  IconLogout,
  IconMenu2,
  IconMoon,
  IconPlus,
  IconSearch,
  IconSun,
  IconTable,
  IconUser,
  IconUserPlus,
} from "@tabler/icons";
import { signOut, useSession } from "next-auth/react";

import { useOsAwareModKey } from "../../utils/hooks";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const light = colorScheme === "light";
  const modKey = useOsAwareModKey();

  if (status === "loading") return <Skeleton width={80} height={36} />;

  const accountItems = [];

  const applicationItems = [
    <Menu.Item
      href="/about"
      key="about"
      component={NextLink}
      icon={<IconInfoCircle size={14} />}
    >
      About
    </Menu.Item>,
    <Menu.Item
      icon={<IconSearch size={14} />}
      href="/"
      component={NextLink}
      key="find"
    >
      Find a challenge
    </Menu.Item>,
    <Menu.Item
      onClick={() => toggleColorScheme()}
      key="dark-mode"
      icon={light ? <IconMoon size={14} /> : <IconSun size={14} />}
      rightSection={
        <Text size="xs" color="dimmed">
          {modKey}J
        </Text>
      }
    >
      {light ? "Dark mode" : "Light mode"}
    </Menu.Item>,
  ];

  if (session) {
    accountItems.push(
      <Menu.Item
        onClick={() => signOut()}
        color="red"
        key="logout"
        icon={<IconLogout size={14} />}
      >
        Log out
      </Menu.Item>
    );
    applicationItems.unshift(
      <Menu.Item
        href="/admin"
        key="challenges"
        component={NextLink}
        icon={<IconTable size={14} />}
      >
        Your challenges
      </Menu.Item>
    );
  } else {
    accountItems.push(
      <Menu.Item
        component={NextLink}
        key="login"
        href="/api/auth/signin"
        icon={<IconLogin size={14} />}
      >
        Log in
      </Menu.Item>
    );
    accountItems.push(
      <Menu.Item
        component={NextLink}
        href="/api/auth/signin"
        icon={<IconUserPlus size={14} />}
      >
        Create account
      </Menu.Item>
    );
  }

  const headerLinks = (
    <Group position="right">
      {session && (
        <Tooltip label="Create a challenge">
          <ActionIcon
            component={NextLink}
            href="/create"
            variant="filled"
            color="orange"
            size="lg"
          >
            <IconPlus size={16} stroke={3} />
          </ActionIcon>
        </Tooltip>
      )}
      <Menu
        shadow="md"
        width={200}
        position="bottom-end"
        withArrow
        arrowOffset={12}
        offset={-1}
      >
        <Menu.Target>
          <ActionIcon component="a" variant="outline" size="lg">
            {session ? (
              <IconUser size={16} stroke={2} />
            ) : (
              <IconMenu2 size={16} />
            )}
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          {applicationItems}
          <Menu.Divider />
          <Menu.Label>Account</Menu.Label>
          {accountItems}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );

  return headerLinks;
};

export default Header;
