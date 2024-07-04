const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-btn");

function searchFile(dir, fileName) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isDirectory()) {
            searchFile(filePath, fileName);
        } else if (file.endsWith(fileName)) {
            alert(filePath);
        }
    }
}

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = searchForm.nickname.value;

    if (username === "") {
        alert("닉네임을 입력해주세요.");
    } else {
        searchFile('./CSV', username + '.csv');
    }
})