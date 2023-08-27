interface Column {
  id: string;
  label: string;
}

type Row = Record<string, string | number | Date>;

interface Props {
  columns: Column[];
  rows: Row[];
}

export default function DataGrid({ columns, rows }: Props) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {Object.keys(row).map((key, index) => (
              <td key={index}>{`${row[key]}`}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
