setUp();

$(document).ready(function() {
    setButtons();
});

function setUp() {
    $.get('navigation.html', function(data){
        $('.nav-placeholder').replaceWith(data);
    });
}

function setButtons() {
    // Кнопка редактирования предыдущего поля
    $('.btn-edit-prev').click(function() {
        let curElem = $(this);
        curElem.toggleClass('hidden');

        let btnSave = $(this).next();
        btnSave.toggleClass('hidden');

        let textElem = curElem.prev();
        textElem.removeAttr('disabled');
    });

    // Кнопка сохранения предыдущего поля
    $('.btn-save-prev').click(function() {
        let curElem = $(this);
        curElem.toggleClass('hidden');

        let btnEdit = $(this).prev();
        btnEdit.toggleClass('hidden');

        let textElem = btnEdit.prev();
        textElem.attr('disabled', 'disabled');
    });

    // Кнопка разворачивания
    $('.btn-expand').click(function() {
        let btnExpand = $(this);

        let memberPacksArea = btnExpand.parents(":eq(1)").find('.member-packs');
        memberPacksArea.slideDown('fast', function() {
            let btnCollapse = btnExpand.parent().find('.btn-collapse');
            btnExpand.toggleClass('hidden');
            btnCollapse.toggleClass('hidden');
        })
    });

    // Кнопка сворачивания
    $('.btn-collapse').click(function() {
        let btnCollapse = $(this);

        let memberPacksArea = btnCollapse.parents(":eq(1)").find('.member-packs');
        memberPacksArea.slideUp('fast', function() {
            let btnExpand = btnCollapse.parent().find('.btn-expand');
            btnExpand.toggleClass('hidden');
            btnCollapse.toggleClass('hidden');
        })
    });

    // Фильтр по тегу
    $('.tags-filter p').click(function () {
        let btnTag = $(this);
        let tagFilter = btnTag.text();

        if (btnTag.hasClass('checked')) {
            $('.member-pack').removeClass('hidden');
        } else {
            let filters = $('.tags-filter p.checked');
            filters.each(function () {
                $(this).removeClass('checked');
            });
            $('.member-pack').each(function () {
                let curPack = $(this);
                if (curPack.find(`.pack-tags p:contains(${tagFilter})`).length < 1) {
                    curPack.addClass('hidden');
                }

            })
        }
        btnTag.toggleClass('checked');
    })
}


// const nav = document.querySelector('.nav');
// const personalData = document.querySelector('#personal-data');
// const personalDataError = document.querySelector('#personal-data-error');
//
// function toggleNav() {
//     nav.classList.toggle('hidden');
// }
//
// function loginSubmit(data) {
//     let elements = data.elements;
//     const loginValue = document.querySelector('#login').value;
//
//     function onError(error) {
//         personalDataError.textContent = 'Данные пользователя ' + loginValue + ' не найдены';
//         if (personalDataError.classList.contains('hidden')) {
//             personalDataError.classList.toggle('hidden');
//         }
//         if (!personalData.classList.contains('hidden')) {
//             personalData.classList.toggle('hidden');
//         }
//         console.log(error);
//     }
//
//     fetch('http://localhost:5000/login/' + loginValue)
//         .then(async response => {
//             if (response.status !== 200) {
//                 onError({status: response.status});
//                 return
//             }
//             let resp = await response.json();
//             if (!personalDataError.classList.contains('hidden')) {
//                 personalDataError.classList.toggle('hidden');
//             }
//             if (personalData.classList.contains('hidden')) {
//                 personalData.classList.toggle('hidden');
//             }
//             document.querySelector('#personal-data-login').textContent = resp.login;
//             document.querySelector('#personal-data-name').textContent = resp.name;
//         })
//         .catch(e => onError(e));
// }
