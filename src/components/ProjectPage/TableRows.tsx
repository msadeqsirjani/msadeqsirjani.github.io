import type {ReactNode} from 'react';

interface TableRowsProps {
  rows: ReactNode[][];
  best?: (row: number, column: number) => boolean;
  ours?: (row: number) => boolean;
}

const TableRows = ({rows, best, ours}: TableRowsProps) => (
  <tbody>
    {rows.map(([first, ...rest], row) => (
      <tr key={row} className={ours?.(row) ? 'is-ours' : undefined}>
        <th scope="row" className="is-label">
          {first}
        </th>
        {rest.map((cell, column) => (
          <td
            key={column}
            className={best?.(row, column) ? 'is-best' : undefined}
          >
            {cell}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

export default TableRows;
