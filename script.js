const nav = document.querySelector('.nav');
const personalData = document.querySelector('#personal-data');
const personalDataError = document.querySelector('#personal-data-error');

function toggleNav() {
    nav.classList.toggle('hidden');
}

function loginSubmit(data) {
    let elements = data.elements;
    const loginValue = document.querySelector('#login').value;

    function onError(error) {
        personalDataError.textContent = 'Данные пользователя ' + loginValue + ' не найдены';
        if (personalDataError.classList.contains('hidden')) {
            personalDataError.classList.toggle('hidden');
        }
        if (!personalData.classList.contains('hidden')) {
            personalData.classList.toggle('hidden');
        }
        console.log(error);
    }

    fetch('http://localhost:5000/login/' + loginValue)
        .then(async response => {
            if (response.status !== 200) {
                onError({status: response.status});
                return
            }
            let resp = await response.json();
            if (!personalDataError.classList.contains('hidden')) {
                personalDataError.classList.toggle('hidden');
            }
            if (personalData.classList.contains('hidden')) {
                personalData.classList.toggle('hidden');
            }
            document.querySelector('#personal-data-login').textContent = resp.login;
            document.querySelector('#personal-data-name').textContent = resp.name;
        })
        .catch(e => onError(e));
}
