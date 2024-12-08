const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const input = document.getElementById('travelInput');
const resultDiv = document.getElementById('result');

function searchCondition() {
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
        console.log(data);    
        //
        const findCrit = input.value.toLowerCase();
        //
        if (findCrit === 'countries' || findCrit === 'country') {
            for (let i = 0; i < data.countries.length; i++) {
                DisplayCountryData(resultDiv, data.countries[i]);
            }    
        }
        //    
        if (findCrit === 'temples' || findCrit === 'temple')
            DisplayData(resultDiv, data.temples);
        //
        if (findCrit === 'beaches' || findCrit === 'beach')
            DisplayData(resultDiv, data.beaches);
        //
        })
        .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
        resultDiv.style.visibility='visible';
        });
}


function DisplayCountryData(resultDiv, data) {
    resultDiv.innerHTML += `<h1>${data.name}</h1>`;
    DisplayData(resultDiv, data.cities)
}


function DisplayData(resultDiv, data) {
    data.forEach(element => {
        resultDiv.innerHTML += `<h2>${element.name}</h2>`;
        resultDiv.innerHTML += `<img src="${element.imageUrl}" alt="no image">`;
        resultDiv.innerHTML += `<p><strong>description:</strong> ${element.description}</p>`;
        resultDiv.innerHTML += `<hr></hr>`;
        resultDiv.style.visibility='visible';
    });

}

function clearResult() {
    resultDiv.innerHTML = '';
    resultDiv.style.visibility = 'hidden';
    input.value = '';
}


btnSearch.addEventListener('click', searchCondition);
btnReset.addEventListener('click', clearResult);
