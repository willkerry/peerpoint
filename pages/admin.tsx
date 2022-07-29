import {
  Checkbox,
  Group,
  Table,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
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
import LanguageIndicator from "../components/display/language-indicator";
import { SortAscIcon, SortDescIcon } from "@primer/octicons-react";
import DisplayId from "../components/display/display-id";

type ChallengeRow = {
  select?: () => void;
  id: Challenge["id"];
  title: Challenge["title"];
  language: Challenge["language"];
  createdAt: Challenge["createdAt"];
};

const columnHelper = createColumnHelper<ChallengeRow>();

const Admin: React.FC = () => {
  const { data } = useSWR("/", fetchChallenges);
  const [tableData, setTableData] = useState<ChallengeRow[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<ChallengeRow>[] = [
    columnHelper.accessor("id", {
      cell: (info) => <DisplayId id={info.getValue()} />,
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
      cell: (info) => (
        <Text
          {...{
            component: "time",
            dateTime: info.getValue().toString(),
            weight: 500,
            children: new Date(info.getValue()).toLocaleDateString(),
            sx: {
              fontVariantNumeric: "tabular-nums slashed-zero",
            },
          }}
        />
      ),
      header: "Date",
    }),
    {
      id: "select",
      cell: ({ row }) => (
        <Checkbox
          {...{
            checked: row.getIsSelected(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    if (data) {
      setTableData(
        data?.map((challenge) => ({
          id: challenge.id,
          title: challenge.title,
          language: challenge.language,
          createdAt: challenge.createdAt,
        }))
      );
    }
  }, [data]);

  const table = useReactTable<ChallengeRow>({
    data: tableData,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <Layout>
      <Meta title="Admin" />
      <Title mb="xl" order={3}>
        Your challenges
      </Title>
      <Table fontSize="xs" highlightOnHover>
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
            <tr key={row.id} onClick={row.getToggleSelectedHandler()}>
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
