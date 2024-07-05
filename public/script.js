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

const nicknameForm = document.getElementById('search-form');

if (nicknameForm) {
    const isExist = false;
    nicknameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const inputnickname = document.getElementById('nickname').value;

        fetch('/players')
            .then(response => response.json())
            .then(data => {
                try {
                    data.forEach(player => {
                        if (player.nickname === inputnickname) {
                            window.location.href = `../user-stat/index.html?nickname=${encodeURIComponent(nickname)}`;
                            isExist = true;
                            throw BreakException;
                        }
                    });
                } catch (e) {
                    if (e !== BreakException) throw e;
                }
            })
            .catch(error => console.error(`Error fetching player data:`, error));
    });
}