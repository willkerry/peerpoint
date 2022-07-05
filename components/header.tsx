import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Button, Loader, UnstyledButton, Group } from "@mantine/core";

const OldHeader: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let headerLinks = (
    <Link href="/">
      <a className="bold" data-active={isActive("/")}>
        Feed
      </a>
    </Link>
  );

  if (status === "loading") {
    headerLinks = <Loader />;
  }

  if (!session) {
    headerLinks = (
      <Link href="/api/auth/signin">
        <a data-active={isActive("/signup")}>Log in</a>
      </Link>
    );
  }

  if (session) {
    headerLinks = (
      <Group>
        <Link href="/create" passHref>
          <Button component="a">Create</Button>
        </Link>
        <UnstyledButton onClick={() => signOut()}>Log out</UnstyledButton>
      </Group>
    );
  }

  return headerLinks;
};

export default OldHeader;
