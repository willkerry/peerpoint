import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Button, Group, Skeleton } from "@mantine/core";

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
        <Link href="/create" passHref>
          <Button component="a">Create</Button>
        </Link>
        <Button variant="outline" onClick={() => signOut()}>
          Log out
        </Button>
      </Group>
    );
  }

  return headerLinks;
};

export default Header;
