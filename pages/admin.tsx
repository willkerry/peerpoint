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
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Challenge } from "@prisma/client";
import { useState, useEffect } from "react";
import LanguageIndicator from "../components/display/language-indicator";
import DisplayId from "../components/display/display-id";
import { Input } from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons";

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
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");

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
            size: "xs",
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
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Layout>
      <Meta title="Admin" />
      <Title mb="xl" order={3}>
        Your challenges
      </Title>
      <Group>
        <Input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
        Controls<div>{JSON.stringify(table.getState().rowSelection)}</div>
      </Group>
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
                          asc: <IconSortAscending size={14} />,
                          desc: <IconSortDescending size={14} />,
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
            <UnstyledButton
              component="tr"
              key={row.id}
              onClick={row.getToggleSelectedHandler()}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </UnstyledButton>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};
export default Admin;
