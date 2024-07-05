function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

fetch('/players')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('ranking-table').querySelector('tbody');
        var iteration = 0;

        try {
            data.forEach(player => {
                const row = document.createElement('tr');
                const convAsset = player.asset + '000';
                const commaAsset = '$'+ numberWithCommas(convAsset);
                const convFlightTime = Math.round(player.flighttime / 3600) + 'H';
                row.innerHTML = `<td>${player.nickname}</td>\n<td>${commaAsset}</td>\n<td>${convFlightTime}</td>`;
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
    nicknameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const inputnickname = document.getElementById('nickname').value;
        const isExist = false;
        
        fetch('/players')
            .then(response => response.json())
            .then(data => {
                try {
                    data.forEach(player => {
                        if (inputnickname === '') {
                            alert('닉네임을 입력해주세요.');
                            throw BreakException;
                        } else if (player.nickname === inputnickname) {
                            window.location.href = `../user-stat/index.html?inputnickname=${encodeURIComponent(inputnickname)}`;
                            isExist = true;
                            throw BreakException;
                        }
                    });
                } catch (e) {
                    if (e !== BreakException) throw e;
                }

                if (isExist === false) {
                    alert("해당 닉네임의 데이터가 존재하지 않습니다.");
                    document.getElementById('nickname').value = '';
                }
            })
            .catch(error => console.error(`Error fetching player data:`, error));
        
    });
}