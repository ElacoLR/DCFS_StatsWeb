fetch('/players')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('ranking-table').querySelector('tbody');
        data.forEach(player => {
            const row = document.createElement('tr');
            row.innerHTML = '<td>${player.nickname}</td>\n<td>${player.asset}</td>\n<td>player.flighttime</td>';
            tableBody.appendChild(row);
        })
    })
    .catch(error => console.error('Error fetching player data:', error));