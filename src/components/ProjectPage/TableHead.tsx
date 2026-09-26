const TableHead = ({labels}: {labels: string[]}) => (
  <thead>
    <tr>
      {labels.map((label, index) => (
        <th
          key={label}
          scope="col"
          className={index === 0 ? 'is-label' : undefined}
        >
          {label}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHead;
