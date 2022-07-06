import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Button, Loader, Group } from "@mantine/core";

const Header: React.FC = () => {
	const router = useRouter();

	const isActive = (pathname: string) => {
		return router.pathname === pathname;
	};

	const { data: session, status } = useSession();

	if (status === "loading") return <Loader />;

	let headerLinks = (
		<Link href="/">
			<a className="bold" data-active={isActive("/")}>
				Feed
			</a>
		</Link>
	);

	if (!session) {
		headerLinks = (
			<Link href="/api/auth/signin" passHref>
				<Button variant="subtle" data-active={isActive("/signup")}>
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
				<Button variant="subtle" onClick={() => signOut()}>
					Log out
				</Button>
			</Group>
		);
	}

	return headerLinks;
};

export default Header;
