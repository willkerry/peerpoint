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
  IconLogout,
  IconPlus,
  IconSearch,
  IconTable,
  IconUser,
} from "@tabler/icons";

const Header: React.FC = () => {
  const router = useRouter();

  const isActive = (pathname: string) => {
    return router.pathname === pathname;
  };

  const { data: session, status } = useSession();

  let headerLinks;

  if (status === "loading") return <Skeleton width={80} height={36} />;

  if (!session) {
    headerLinks = (
      <Link href="/api/auth/signin" passHref>
        <Button variant="outline" data-active={isActive("/signup")}>
          Log in
        </Button>
      </Link>
    );
  }

  if (session) {
    headerLinks = (
      <Group>
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

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon component="a" variant="outline" size="lg">
              <IconUser size={16} stroke={2} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item
              href="/admin"
              component={NextLink}
              icon={<IconTable size={14} />}
            >
              Your challenges
            </Menu.Item>
            <Menu.Item
              href="/about"
              component={NextLink}
              icon={<IconInfoCircle size={14} />}
            >
              About
            </Menu.Item>
            <Menu.Item
              icon={<IconSearch size={14} />}
              rightSection={
                <Text size="xs" color="dimmed">
                  ⌘K
                </Text>
              }
            >
              Find a challenge
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>Account</Menu.Label>
            <Menu.Item
              onClick={() => signOut()}
              color="red"
              icon={<IconLogout size={14} />}
            >
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    );
  }

  return headerLinks;
};

export default Header;
