
function generateTable(data) {
    const tableRows = data.map(({ items }) => {
      const rows = items.map(({ item, passing_percentage, passing, note }) => {
        return `
          <tr>
            <td>${item}</td>
            <td>${passing ? 'Pass' : 'Fail'}</td>
            <td>${passing_percentage}%</td>
            <td>${note}</td>
          </tr>
        `;
      });
  
      return `
        <tbody>
          ${rows.join('')}
        </tbody>
      `;
    });
  
    const tableHTML = `
      <table>
        <thead>
          <tr>
            <th>Peter Thiel Checklist</th>
            <th>Pass/Fail</th>
            <th>Pass %</th>
            <th>Notes</th>
          </tr>
        </thead>
        ${tableRows.join('')}
      </table>
    `;
  
    return tableHTML;
  }

module.exports = {
    generateTable
}