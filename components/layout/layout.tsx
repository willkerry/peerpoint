import React from "react";

import Link from "next/link";

import { AppShell, Box, Group, Header as MantineHeader } from "@mantine/core";

import Logo from "../icons/logo";
import Header from "./header";
import Meta from "./meta";

type Props = {
  children?: React.ReactNode;
  loading?: boolean;
  title?: string;
  noPad?: boolean;
};

const defaultProps = {
  children: null,
  loading: false,
  title: "Peerpoint",
  noPad: false,
};

const Layout: React.FC<Props> = ({
  title,
  children,
  loading,
  noPad,
}: Props) => (
  <>
    <Meta {...{ title }} />
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      padding={noPad ? 0 : "md"}
      header={
        <MantineHeader height={50} p="md">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Group position="apart" grow style={{ width: "100%" }}>
              <Link href="/" passHref>
                <Box component="a" sx={{ color: "inherit", lineHeight: 0 }}>
                  <Logo animate={loading} height="1em" />
                </Box>
              </Link>
              <Header />
            </Group>
          </Box>
        </MantineHeader>
      }
    >
      <Box sx={{ position: "relative" }}>{children}</Box>
    </AppShell>
  </>
);
Layout.defaultProps = defaultProps;

export default Layout;
