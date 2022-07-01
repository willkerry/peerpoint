import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Button, Group, Text, UnstyledButton } from "@mantine/core";

const OldHeader: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <Link href="/">
      <a className="bold" data-active={isActive("/")}>
        Feed
      </a>
    </Link>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <Group>
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}>Drafts</a>
        </Link>
      </Group>
    );
    right = (
      <Group>
        <Link href="/create" passHref>
          <Button component="a">Create</Button>
        </Link>
        <UnstyledButton onClick={() => signOut()}>
          <Avatar radius="xl" />
        </UnstyledButton>
      </Group>
    );
  }

  return (
    <Group>
      {left}
      {right}
    </Group>
  );
};

export default OldHeader;
