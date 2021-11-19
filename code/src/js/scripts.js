/*ОБЩЕЕ*/

var windowWidth, windowHeight;

// Функция определяющая ширину и высоту window
function setWindowSizes(){
    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;
}

//Функция сортирует массив с случайном порядке.
function compareRandom(a, b) {
    return Math.random() - 0.5;
}
/* / / ОБЩЕЕ*/


/*ПОДГОНКА ГРАФИКИ ДЛЯ РЕТИНЫ*/
// Функция подгоняет изображения для Ретины
function setRetinaImg(){
    if (window.devicePixelRatio > 1) {
        var retinaImg = $('.retina-img');

        retinaImg.each(function(i) {

            // Задание ширины
            var lowresWidth = $(this).data('width');
            $(this).css('width', lowresWidth);

            // Замена источника
            var lowresSrc = $(this).attr('src');
            var arrString = lowresSrc.split('.')
            arrString[arrString.length-2] += "_2x";
            var highresSrc = arrString.join('.')
            $(this).attr('src', highresSrc);
        });
    }
}
setRetinaImg();
/* / / ПОДГОНКА ГРАФИКИ ДЛЯ РЕТИНЫ*/


/* МЕНЮ */
// Функция подсвечивает текущую страницу в навигации
function highlightMenu(){
    //Начало навигации
    var adress = location.origin + location.pathname;

    //Если имя файла совпадает с путем ссылки, то добавляем класс тегу li, а ссылку удаляем
    $(".menu-wrap a[href='" + adress + "']").each(function(){
        $(this).parent().addClass('menu-li1-selected');
    });
}

highlightMenu();
/* / / МЕНЮ */



/* ГЛАВНАЯ */
// Функция открывает скрытый текст отзыва
function showHiddenRecall(link){
    var hiddenText = link.parent().prev();

    //Если отзыв скрыт
    if(hiddenText.css('display') == 'none'){
        hiddenText.css({'display' : 'block'});

        link.text('Скрыть');
    }else{
        hiddenText.css({'display' : ''});

        link.text('Полностью');
    }
}
$('.show-full-recall-link').click(function (e) {
    e.preventDefault();

    showHiddenRecall($(this))
});
/* / / ГЛАВНАЯ */


/* ПРОКРУТКА ДО ОПРЕДЕЛЕННОГО ЭЛЕМЕНТА */
// Таблицы времен
$('.times-index-item a').on('click', function(e){
    scrollTo(e, 400, false, 0);
});

$('.dic-lesson-number').on('click', function(e){
    scrollTo(e, 400, false, 20);
});


/* / / ПРОКРУТКА ДО ОПРЕДЕЛЕННОГО ЭЛЕМЕНТА */



/* БЛОК С ИЗУЧЕНИЕМ СЛОВ */

// Формирование разметки блока с изучением слов
function worksMarkup(){
    $('.words-g-w2').each(function(){
        var wordsGW2 = $(this),
            sourceWords = wordsGW2.find('.source-words'),
            words = [];

        for (var i = 0; i < sourceWords.length; i++){
            var word = $(sourceWords[i]).html();

            words.push(word.split(' – '))
        }

        // Сколько слов уйдет в левую колонку
        var middleCount = Math.ceil(words.length / 2);

        // Формирование разметки контейнеров
        var containers = $('<div class="row"><div class="col-xs-12 col-md-6"><div class="words-g-w"></div></div><div class="col-xs-12 col-md-6"><div class="words-g-w"></div></div></div>');

        // Формирование разметки левой колонки
        for(var i = 0; i < middleCount; i++){
            var markup = $('<div class="word-g-w"><p class="word-word"><span class="word-source">' + words[i][0] + '</span><span class="word-dash"> — </span><span class="word-traslated">' + words[i][1] + '</span></p><input type="text" class="word-text-input"><p class="word-right-rus-word">' + words[i][0] + '</p> <p class="word-right-eng-word">' + words[i][1] + '</p></div>');

            containers.find('.words-g-w').eq(0).append(markup);
        }

        // Формирование разметки правой колонки
        for(var i = middleCount; i < words.length; i++){
            var markup = $('<div class="word-g-w"><p class="word-word"><span class="word-source">' + words[i][0] + '</span><span class="word-dash"> — </span><span class="word-traslated">' + words[i][1] + '</span></p><input type="text" class="word-text-input"><p class="word-right-rus-word">' + words[i][0] + '</p> <p class="word-right-eng-word">' + words[i][1] + '</p></div>');

            containers.find('.words-g-w').eq(1).append(markup);
        }

        // Вставка финальной разметки в документ
        $(this).prepend(containers);
    });
}

worksMarkup();



// Функция выделяет кнопку, по которой кликнули
function selectGroupBtn(e){
    e.preventDefault();

    var target = $(e.target);

    var wordsGW2 = target.parentsUntil('.words-g-w2').parent(),
        btns = wordsGW2.find('.btn-group');

    // Убрать класс .btn-group-selected у всех кнопок
    btns.removeClass('btn-group-selected');

    // Поставить класс .btn-group-selected кнопке, которую нажали
    target.addClass('btn-group-selected');
}

// При клике по кнопке Рус → Eng
$('.btn-rus-eng').click(function(e){
    // Подсветить кнопку, по которой нажали.
    selectGroupBtn(e)

    var target = $(e.target),
        wordsGW2 = target.parentsUntil('.words-g-w2').parent(),
        rusWords = wordsGW2.find('.word-source'),
        dash = wordsGW2.find('.word-dash'),
        engWords = wordsGW2.find('.word-traslated'),
        input = wordsGW2.find('.word-text-input'),
        rusRightWords = wordsGW2.find('.word-right-rus-word'),
        engRightWords = wordsGW2.find('.word-right-eng-word'),
        tipEnter = wordsGW2.find('.words-tip-enter');


    // Показать нужные элементы
    dash.css({'display' : ''});
    rusWords.css({'display' : ''});
    engWords.css({'display' : ''});
    input.css({'display' : ''});
    input.css({'display' : ''});
    rusRightWords.css({'display' : ''});
    engRightWords.css({'display' : ''});

    engWords.css({'font-weight' : ''});

    // Скрыть подсказку
    tipEnter.css({'display' : ''});

});

// При клике по кнопке Рус → __
$('.btn-rus_').click(function(e){
    // Подсветить кнопку, по которой нажали.
    selectGroupBtn(e);

    var target = $(e.target),
        wordsGW2 = target.parentsUntil('.words-g-w2').parent(),
        rusWords = wordsGW2.find('.word-source'),
        dash = wordsGW2.find('.word-dash'),
        engWords = wordsGW2.find('.word-traslated'),
        input = wordsGW2.find('.word-text-input'),
        engRightWords = wordsGW2.find('.word-right-eng-word'),
        rusRightWords = wordsGW2.find('.word-right-rus-word'),
        tipEnter = wordsGW2.find('.words-tip-enter');

    // Cкрыть ненужные элементы
    dash.css({'display' : 'none'});
    engWords.css({'display' : 'none'});
    rusRightWords.css({'display' : ''});

    // Показать нужные элементы
    rusWords.css({'display' : 'block'});
    input.css({'display' : 'block'});

    // Стереть поля
    input.val('');

    // Поставить фокус в первое поле
    input.first().focus();

    // Показать подсказку
    tipEnter.css({'display' : 'block'});

});

// При клике по кнопке Eng → __
$('.btn-eng_').click(function(e){
    // Подсветить кнопку, по которой нажали.
    selectGroupBtn(e);

    var target = $(e.target),
        wordsGW2 = target.parentsUntil('.words-g-w2').parent(),
        rusWords = wordsGW2.find('.word-source'),
        dash = wordsGW2.find('.word-dash'),
        engWords = wordsGW2.find('.word-traslated'),
        input = wordsGW2.find('.word-text-input'),
        engRightWords = wordsGW2.find('.word-right-eng-word'),
        tipEnter = wordsGW2.find('.words-tip-enter');

    // Cкрыть ненужные элементы
    dash.css({'display' : 'none'});
    rusWords.css({'display' : 'none'});
    engRightWords.css({'display' : ''});

    // Показать нужные элементы
    engWords.css({'display' : 'block'});
    input.css({'display' : 'block'});

    // Сделать английское слово нормальной жирности
    engWords.css({'font-weight' : 'normal'});

    // Стереть поля
    input.val('');

    // Поставить фокус в первое поле
    input.first().focus();

    // Показать подсказку
    tipEnter.css({'display' : 'block'});
});


// При нажатии на Enter показать правильное слово у сфокусированного поля или перевести фокус на следующее поле
$('.word-text-input').keydown(function(e){
    var keyCode = e.keyCode,
        wordsGW2 = $(e.target).parentsUntil('.words-g-w2').parent(),
        inputs = wordsGW2.find('.word-text-input'),
        selectedBtn = wordsGW2.find('.btn-group-selected'),
        rightWordEng = $(this).parent().find('.word-right-eng-word'),
        rightWordRus = $(this).parent().find('.word-right-rus-word');

    // Если нажали Enter
    if(keyCode == 13){

        // Если английский, то открыть английскую подсказку
        if(selectedBtn.hasClass('btn-rus_')) {
            // Если правильное слово скрыто, то показать. Если открыто, то перейти на следующее поле ввода
            if (rightWordEng.css('display') == 'none') {
                rightWordEng.css({'display': 'block'})
            }
            else {
                var flag;

                $(inputs).each(function (index) {
                    if (flag) {
                        $(this).focus();
                        return false;
                    }

                    if ($(this).is(":focus")) {
                        flag = 1;
                    }
                });
            }
        }

        // Если русский, то открыть русскую подсказку
        if(selectedBtn.hasClass('btn-eng_')){
            // Если правильное слово скрыто, то показать. Если открыто, то перейти на следующее поле ввода
            if (rightWordRus.css('display') == 'none') {
                rightWordRus.css({'display': 'block'})
            }
            else {
                var flag;

                $('.word-text-input').each(function (index) {
                    if (flag) {
                        $(this).focus();
                        return false;
                    }

                    if ($(this).is(":focus")) {
                        flag = 1;
                    }
                });
            }
        }
    }
});


// При клике по кнопке «Перемешать» нужно перемешать слова
$('.btn-link-mix-words').click(function(e){
    e.preventDefault();

    var target = $(e.target),
        wordsGW2 = target.parentsUntil('.words-g-w2').parent(),
        words = wordsGW2.find('.word-g-w').detach(),
        wordsArr = [];

    // Поместить слова в пустой массив
    words.each(function(){
        wordsArr.push($(this));
    });

    // Перемешать элементы массива
    wordsArr.sort(compareRandom);

    // Переместить элементы обратно
    for(var i = 0; i < wordsArr.length; i++){

        if(i % 2){
            wordsGW2.find('.words-g-w').eq(1).append(wordsArr[i]);
        }else{
            wordsGW2.find('.words-g-w').eq(0).append(wordsArr[i]);
        }
    }
});
/* / / БЛОК С ИЗУЧЕНИЕМ СЛОВ */



/* ЗАДАНИЯ */
// При щелчке по кнопке «Готово» затенять карточку задания
$('.btn-ready').on('click', function () {
    var taskWrapper = $(this).parentsUntil('.task-wrapper').parent();

    taskWrapper.addClass('task-ready-w');

    // Когда закончили последнее упражнение Первой техники речи скрыть предложения
    var allTasksDone = 1;
    if(!$('.task-wrapper').hasClass('task-ready-w')) allTasksDone = 0;

    $('.task-wrapper').each(function(){
        if(!$(this).hasClass('task-ready-w')){
            allTasksDone = 0;
        }
    });


    if(allTasksDone == 1){
        $('#task1-example-w').css({'display' : 'none'});
        $('.task1-wrapper').css({'display' : 'none'});
        $('.task1-wrapper').next().css({'display' : 'none'});
    }
});

// При клике по тексту первого задания открыть правильный ответ
$('.task1-p').on('click', function(e){
    e.preventDefault();

    var answerW = $(e.currentTarget).next();

    if(answerW.css('display') == 'block'){
        answerW.css({'display' : ''});
    }else {
        answerW.css({'display' : 'block'});
    }
});

// Перемешать предложения при клике по кнопке «Перемешать» в Первой технике речи
$('.btn-link-mix-task1').on('click', function(e){
    e.preventDefault();

    var wrapper = $(this).parent().prev(),
        items =  wrapper.children(),
        itemsArr = [];

    // Поместить предложения в пустой массив
    items.each(function(){
        itemsArr.push($(this));
    });

    // Перемешать элементы массива
    itemsArr.sort(compareRandom);

    // Переместить элементы обратно
    for(var i = 0; i < itemsArr.length; i++){

        wrapper.append(itemsArr[i]);
    }
});

// При щелчке по кнопке «Готово» второго задания перемешать фразы Первой техники речи
$('#btn-second-task-ready').on('click', function(){
    $('.btn-link-mix-task1').click();
});


// Раскрыть или скрыть перевод при клике по кнопке «Раскрыть/скрыть перевод» в Первой технике речи
$('.btn-link-show-hide-translate-task1').on('click', function(e){
    e.preventDefault();

    var firstAnswer = $('.task1-p-answer-w').eq(0);


    if(firstAnswer.css('display') == 'block'){
        $('.task1-p-answer-w').css({'display' : ''});
    }else {
        $('.task1-p-answer-w').css({'display' : 'block'});
    }
});
/* / / ЗАДАНИЯ */



/* ВТОРАЯ ТЕХНИКА РЕЧИ */
// Формирование разметки блока Второй техники речи
function se2Markup(){
    $('.se2-g-w').each(function(){
        var se2GW = $(this),
            sourceItems = se2GW.find('.source-se2-items'),
            sourceItemsArr = [];

        for (var i = 0; i < sourceItems.length; i++){
            var item = $(sourceItems[i]).text();

            sourceItemsArr.push(item.split(' | '))
        }

        // Формирование разметки главного контейнера
        var containerG = $('<div class="se2-items-g-w"></div>');

        // Формирование разметки предложений
        for(var i = 0; i < sourceItemsArr.length; i++){
            var number = i;
            number++;
            if(number < 10) number = '0' + number;

            var markup = $('<div class="se2-item-w"><div class="se2-item-number">' + number + '.</div><div class="se2-item-text-w"><p class="se2-item-text">' + sourceItemsArr[i][0] + '</p><input type="text" class="se2-text-input" /><p class="se2-eng-text">' + sourceItemsArr[i][1] + '</p></div></div>');
            //var markup = $('<div class="word-g-w"><p class="word-word"><span class="word-source">' + words[i][0] + '</span><span class="word-dash"> — </span><span class="word-traslated">' + words[i][1] + '</span></p><input type="text" class="word-text-input"><p class="word-right-rus-word">' + words[i][0] + '</p> <p class="word-right-eng-word">' + words[i][1] + '</p></div>');

            containerG.append(markup);
        }

        // Вставка финальной разметки в документ
        se2GW.prepend(containerG);
    });
}

se2Markup();


// При нажатии на Enter показать правильное слово у сфокусированного поля или перевести фокус на следующее поле
$('.se2-text-input').keydown(function(e){
    var keyCode = e.keyCode,
        se2GW = $(e.target).parentsUntil('.se2-g-w').parent(),
        inputs = se2GW.find('.se2-text-input'),
        se2EngText = $(this).parent().find('.se2-eng-text');

    // Если нажали Enter
    if(keyCode == 13){

        // Если правильное слово скрыто, то показать. Если открыто, то перейти на следующее поле ввода
        if (se2EngText.css('display') == 'none') {
            se2EngText.css({'display': 'block'})
        }
        else {
            var flag;

            $(inputs).each(function (index) {
                if (flag) {
                    $(this).focus();
                    return false;
                }

                if ($(this).is(":focus")) {
                    flag = 1;
                }
            });
        }
    }
});

// При клике по кнопке «Очистить поля и скрыть ответы» сделать что сказано
$('.btn-link-clear-se2').click(function(e){
    e.preventDefault();

    var btn = $(e.target),
        se2GW = btn.parentsUntil('.se2-g-w').parent(),
        inputs = se2GW.find('.se2-text-input'),
        engText = $('.se2-eng-text');

    // Очистить поля
    inputs.val('');

    // Скрыть ответы
    engText.css({'display' : ''});
});

// При клике по кнопке «Перемешать» нужно перемешать слова
$('.btn-link-mix-se2').click(function(e){
    e.preventDefault();

    var btn = $(e.target),
        se2GW = btn.parentsUntil('.se2-g-w').parent(),
        items = se2GW.find('.se2-item-w').detach(),
        itemsArr = [];

    // Поместить слова в пустой массив
    items.each(function(){
        itemsArr.push($(this));
    });

    // Перемешать элементы массива
    itemsArr.sort(compareRandom);

    // Переместить элементы обратно
    for(var i = 0; i < itemsArr.length; i++){
        se2GW.find('.se2-items-g-w').prepend(itemsArr[i]);
    }
});

// При щелчке по кнопке «Готово» первого задания Второй техники речи очистить поля Второй техники речи
$('.btn-first-task2-ready').on('click', function(e){

    /*var btn = $(e.target),
        se2GW = btn.parentsUntil('.se2-g-w').parent();*/

    //se2GW.find('.btn-link-clear-se2').click();
});

// При щелчке по кнопке «Готово» третьего задания Второй техники речи перемешать фразы Второй техники речи
$('.btn-third-task2-ready').on('click', function(e){

    // Кнопка которую нажали и обертка в которой содержится кнопка .btn-link-mix-se2
    var btn = $(e.target),
        se2GW = btn.parentsUntil('.se2-g-w').parent();


    // Узнаю индекс нажатой кнопки
    var btnIndex = $('.btn-third-task2-ready').index(btn);


    // Найду кнопку перемешивания слов и нажму её. Эта кнопка должна иметь тот же порядковый номер что и кнопка «Готово» чтобы перемешать именно тот словарь, к которому относится эта кнопка.
    se2GW.find('.btn-link-mix-se2:eq(' + btnIndex + ')').click();
});
/* / / ВТОРАЯ ТЕХНИКА РЕЧИ */


/* ПРОГРЕСС ОБУЧЕНИЯ */
// Функция ставит прогресс обучения
function setProgress(){
    // Узнаю номер урока
    var lessonText = $('.lesson-number').text(),
        lessonNumber = lessonText.split(' ');

    if(lessonText != ''){
        lessonNumber = lessonNumber[1]
        lessonNumber = +lessonNumber;

        // На какое число умножать номер урока
        var ratio = 100 / 44;

        // Задание ширины линии прогресса
        var line = $('.footer-progress');

        line.css('width', lessonNumber * ratio + '%');
    }
}

setProgress();
/* / / ПРОГРЕСС ОБУЧЕНИЯ */




/* ВИДЕОУРОК */
// Функция ставит номер видеоурока, который должен пройти пользователь
function setNumberOfSeriaExtra(){
    // Узнаю номер урока
    var lessonText = $('.lesson-number').text(),
        lessonNumber = lessonText.split(' ');

    if(lessonText != ''){
        lessonNumber = lessonNumber[1];
        lessonNumber = +lessonNumber - 14; // Узнал номер серии


        // Напишу это число в тексте
        var numberSpan = document.querySelector('#extra-seria-number');

        numberSpan.innerHTML = lessonNumber
    }
}

setNumberOfSeriaExtra();
/* / / ВИДЕОУРОК */




/* ТАБЛИЦА НЕПРАВИЛЬНЫХ ГЛАГОЛОВ */
// Формирование разметки блока с изучением слов
function worksMarkupWrongV() {

    var wrongVGW = $('.wrong-v-g-w'),
        wrongVStrings = wrongVGW.find('.wrong-v-string'),
        table = $('<table></table>');


    wrongVStrings.each(function () {
        var tr = $('<tr class="wrong-v-tr"></tr>'),
            word = $(this),
            text = word.text(),
            words = text.split('|');

        for (var i = 0; i < words.length; i++) {
            tr.append('<td><p class="wrong-v-word">' + words[i] + '</p></td>');
        }

        table.append(tr);
    });



    // Вставка финальной разметки в документ
    wrongVGW.prepend(table);

    table.prepend('<tr class="wrong-v-tr"><td><p class="wrong-v-legend">v</p></td><td><p class="wrong-v-legend">v2</p></td><td><p class="wrong-v-legend">v3</p></td><td><p class="wrong-v-legend">Перевод</p></td></tr>');
}


worksMarkupWrongV();

    /*$('.words-g-w2').each(function(){
        var wordsGW2 = $(this),
            sourceWords = wordsGW2.find('.source-words'),
            words = [];

        for (var i = 0; i < sourceWords.length; i++){
            var word = $(sourceWords[i]).html();

            words.push(word.split(' – '))
        }

        // Формирование разметки контейнеров
        var containers = $('<div class="row"><div class="col-xs-12 col-md-6"><div class="words-g-w"></div></div><div class="col-xs-12 col-md-6"><div class="words-g-w"></div></div></div>');

        // Формирование разметки левой колонки
        for(var i = 0; i < middleCount; i++){
            var markup = $('<div class="word-g-w"><p class="word-word"><span class="word-source">' + words[i][0] + '</span><span class="word-dash"> — </span><span class="word-traslated">' + words[i][1] + '</span></p><input type="text" class="word-text-input"><p class="word-right-rus-word">' + words[i][0] + '</p> <p class="word-right-eng-word">' + words[i][1] + '</p></div>');

            containers.find('.words-g-w').eq(0).append(markup);
        }

        // Формирование разметки правой колонки
        for(var i = middleCount; i < words.length; i++){
            var markup = $('<div class="word-g-w"><p class="word-word"><span class="word-source">' + words[i][0] + '</span><span class="word-dash"> — </span><span class="word-traslated">' + words[i][1] + '</span></p><input type="text" class="word-text-input"><p class="word-right-rus-word">' + words[i][0] + '</p> <p class="word-right-eng-word">' + words[i][1] + '</p></div>');

            containers.find('.words-g-w').eq(1).append(markup);
        }

        // Вставка финальной разметки в документ
        $(this).prepend(containers);
    });*/

/* / / ТАБЛИЦА НЕПРАВИЛЬНЫХ ГЛАГОЛОВ */