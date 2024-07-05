const urlParams = new URLSearchParams(window.location.search);
const nickname = urlParams.get('nickname');

fetch('/players')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('stats-table').querySelector('tbody');
    
        try {
            data.forEach(player => {
                const row = document.createElement('tr');
                const convFlightTime = Math.round(player.flighttime / 3600) + 'H';
                row.innerHTML = `<td>${player.asset}</td>\n<td>${convFlightTime}</td>`;
                tableBody.appendChild(row);
            });
        } catch (e) {
            throw e;
        }
    })
    .catch(error => console.error(`Error fetching player data:`, error));