import React from "react";
import Link from "next/link";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Skeleton,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconInfoCircle,
  IconLogin,
  IconLogout,
  IconMenu2,
  IconPlus,
  IconSearch,
  IconTable,
  IconUser,
  IconUserPlus,
} from "@tabler/icons";

const Header: React.FC = () => {
  const router = useRouter();

  const isActive = (pathname: string) => {
    return router.pathname === pathname;
  };

  const { data: session, status } = useSession();

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
      key="find"
      rightSection={
        <Text size="xs" color="dimmed">
          ⌘K
        </Text>
      }
    >
      Find a challenge
    </Menu.Item>,
  ];

  if (session) {
    accountItems.push(
      <Menu.Item
        onClick={() => signOut()}
        color="red"
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
    <Group>
      {session ? (
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
      ) : (
        ""
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
