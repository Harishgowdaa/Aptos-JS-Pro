import { useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

interface Transaction {
  _type: string;
  amount: bigint;
  coin: string;
  sender?: { address: string };
  receiver?: { address: string };
  timestamp: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  const columns = useMemo(
    () => [
      { accessorKey: "_type", header: "Type" },
      { accessorKey: "amount", header: "Amount" },
      { accessorKey: "coin", header: "Coin" },
      { accessorKey: "sender.address", header: "Sender", cell: (info) => info.getValue() || "-" },
      { accessorKey: "receiver.address", header: "Receiver", cell: (info) => info.getValue() || "-" },
      { accessorKey: "timestamp", header: "Timestamp" },
    ],
    []
  );

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="border p-2">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
