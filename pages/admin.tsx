import { Group, Table, Title, UnstyledButton } from "@mantine/core";
import useSWR from "swr";
import { Layout, Meta } from "../components/layout";
import fetchChallenges from "../lib/fetchers/fetch-challenges";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Challenge } from "@prisma/client";
import { useState, useEffect } from "react";
import IdButton from "../components/display/id-button";
import LanguageIndicator from "../components/display/language-indicator";
import { SortAscIcon, SortDescIcon } from "@primer/octicons-react";

type ChallengeRow = {
  id: Challenge["id"];
  title: Challenge["title"];
  language: Challenge["language"];
  createdAt: Challenge["createdAt"];
  updatedAt: Challenge["updatedAt"];
};

const columnHelper = createColumnHelper<ChallengeRow>();
const columns: ColumnDef<ChallengeRow>[] = [
  columnHelper.accessor("id", {
    cell: (info) => <IdButton id={info.getValue()} />,
    header: "",
  }),
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
    header: "Title",
  }),
  columnHelper.accessor("language", {
    cell: (info) => <LanguageIndicator language={info.getValue()} />,
    header: "Language",
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    header: "Created At",
  }),
  columnHelper.accessor("updatedAt", {
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    header: "Updated At",
  }),
];

const Admin: React.FC = () => {
  const { data } = useSWR("/", fetchChallenges);
  const [tableData, setTableData] = useState<ChallengeRow[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  // const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    if (data) {
      setTableData(
        data?.map((challenge) => ({
          id: challenge.id,
          title: challenge.title,
          language: challenge.language,
          createdAt: challenge.createdAt,
          updatedAt: challenge.updatedAt,
        }))
      );
    }
  }, [data]);

  const table = useReactTable<ChallengeRow>({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  return (
    <Layout>
      <Meta title="Admin" />
      <Title mb="xl" order={3}>
        Your challenges
      </Title>
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? (
                    ""
                  ) : (
                    <UnstyledButton
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <Group spacing="xs">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <SortAscIcon size={12} />,
                          desc: <SortDescIcon size={12} />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </Group>
                    </UnstyledButton>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} onClick={() => console.log(row.id)}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};
export default Admin;
