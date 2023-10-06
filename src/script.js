
const body = document.querySelector("body");
const h1 = document.createElement("h1");
const h2 = document.createElement("h2");

h1.innerText = "ITUNES SEARCH";
h2.innerText = "";


const input = document.createElement("input");
input.type = "text";


const button = document.createElement("button");
button.classList = "btn btn-primary m-2";
button.id = "button";
button.innerText = "pretraži";

const table = document.createElement("table");
const tbody = document.createElement("tbody");
table.append(tbody);


body.append(h1);
body.append(h2);
body.append(input);
body.append(button);
body.append(table);

function updateTable(results) {
    tbody.innerHTML = "";

    if (results.length === 0) {
        h2.innerText = "no results";
    } else {
        h2.innerText = "";

        results.forEach((result) => {
            const tr = document.createElement("tr");

            const td1 = document.createElement("td");
            td1.innerText = result.trackName;
            tr.appendChild(td1);

            const td2 = document.createElement("td");
            td2.innerText = result.artistName;
            tr.appendChild(td2);
            //  audio
            const td3 = document.createElement("td");
            const audio = document.createElement("audio");
            const source = document.createElement("source");
            source.src = result.previewUrl;
            audio.controls = true;
            audio.appendChild(source);
            td3.appendChild(audio);
            tr.appendChild(td3);

            tbody.appendChild(tr);
        });
    }
}


input.addEventListener("input", function () {
    const query = input.value;

    if (query.trim() === "") {
        updateTable([]);
    } else {
        fetch(`https://itunes.apple.com/search?term=${query}&entity=song`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                updateTable(data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }
});



button.addEventListener("click", function () {
    const query = input.value;

    if (query.trim() === "") {
        h2.innerText = "no results";
    } else {
        button.disabled = true;

        fetch(`https://itunes.apple.com/search?term=${query}&entity=song`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                updateTable(data.results);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                button.disabled = false;
            });
    }
});
