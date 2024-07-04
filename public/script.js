fetch('/players')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('ranking-table').querySelector('tbody');
        var iteration = 0;

        try {
            data.forEach(player => {
                const row = document.createElement('tr');
                const convFlightTime = Math.round(player.flighttime / 3600) + 'H';
                row.innerHTML = `<td>${player.nickname}</td>\n<td>${player.asset}</td>\n<td>${convFlightTime}</td>`;
                tableBody.appendChild(row);
                iteration++;

                if (iteration === 3) throw BreakException;
            });
        } catch (e) {
            if (e !== BreakException) throw e;
        }
    })
    .catch(error => console.error(`Error fetching player data:`, error));