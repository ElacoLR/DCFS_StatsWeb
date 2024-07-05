function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const inputnickname = urlParams.get('inputnickname');
    const backBtn = document.getElementById('back-btn');
    
    fetch('/players')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('stats-table').querySelector('tbody');
            const nickBody = document.getElementById('user-nickname');
            try {
                data.forEach(player => {
                    if (player.nickname === inputnickname) {
                        const row = document.createElement('tr');
                        const convFlightTime = Math.round(player.flighttime / 3600) + 'H';
                        const convAsset = player.asset + '000';
                        const commaAsset = '$' + numberWithCommas(convAsset);
                        row.innerHTML = `<td>${commaAsset}</td>\n<td>${convFlightTime}</td>`;
                        nickBody.innerHTML = player.nickname;
                        tableBody.appendChild(row);
                    }
                });
            } catch (e) {
                throw e;
            }
        })
        .catch(error => console.error(`Error fetching player data:`, error));
    
    backBtn.addEventListener('click', () => {
        window.location.href = `../index.html`;
    });
});