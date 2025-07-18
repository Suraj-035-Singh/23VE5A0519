import React from 'react';

function Stats({ items }) {
  if (!items.length) return null;

  return (
    <div>
      <h2>📈 Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Original</th>
            <th>Short</th>
            <th>Expires</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.original}</td>
              <td>
                <a href={item.short} target="_self" >
                  {item.short}
                </a>
              </td>
              <td>
                {item.expiresAt
                  ? new Date(item.expiresAt).toLocaleString()
                  : "Never"}
              </td>
              <td>{item.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
