/*SCALE GALLERY*/
// Функция создает массив с id галерей
function createStIDarr(){
    // Сформировать массив со значениями data-st
    window.stIDarr = []; // Пустой массив где будут значения data-st

    // В переменной все элементы с атрибутом data-st
    var dataStElems = $('*[data-st]') // Все элементы с атрибутом data-st

    // В цикле переберу все элементы с атрибутом data-st и помещу возможные значения в dataStValueArr
    for(var i = 0; i < dataStElems.length; i++){
        var currentVal = dataStElems.eq(i).data('st')

        // Функция проверяет наличие элемента в массиве
        function in_array(value, array){
            for(var i = 0; i < array.length; i++){
                if(array[i] == value) return true;
            }
            return false;
        }
        // Если текущего значения нет в массиве, то поместить туда.
        if(!in_array(currentVal,stIDarr)) stIDarr.push(currentVal)
    }
}

// Функция высчитывает порядковый номер выбранной вкладки
function st_ReturnTabIndex(id){
    // id - id галереи

    var allTabs = $('.st-tab[data-st=' + id + ']') // В переменной все вкладки текущей галереи

    //console.log(allTabs);
    // Переменная с порядковым номером выделенной вкладки

    // В цикле узнаю элемент с классом .st-tab-select
    for(var i = 0; i < allTabs.length; i++){
        if(allTabs.eq(i).hasClass('st-tab-select')){
            return i;
        } // Возвратить индекс выделенного элемента.
    }
}

// Функция готовит галерею st при загрузке страницы
function stPrepare(){
    // Если на странице есть элементы с .st-tab, приготовить галерею
    if(!$('.st-tab').length) return false;

    // Подготовлю каждую галерею к показу

    // Создам два контейнера
    var oldContainer = $('<div class="st-old-container"></div>'),
        newContainer = $('<div class="st-new-container"></div>');

    // Поставить два контейнера для контента в каждый .st-content
    $('.st-content').each(function(){
        $(this).append(oldContainer.clone());
        $(this).append(newContainer.clone());
    })

    // Чтобы отделить одну галерию от другой я поставил метки к каждой части галереи (на вкладки, в контейнер, в спрятанный контейнер) в виде атрибута data-st. У разных галерей разные значения data-st. Эти метки будут своиобразными id галерей

    // Сделаю массив stIDarr с id галереей
    createStIDarr();

    // Если есть одна из вкладок имеет класс st-tab-select, то узнать порядковый индекс вкладки и помещу контент соответствующией вкладки.
    // Если не имеет, то помещу в .st-old-container контент первой вкладки
    for(var i = 0; i < stIDarr.length; i++){
        var currentID = stIDarr[i];

        // Если одна из вкладок отмечена классом st-tab-select
        if($('.st-tab-select[data-st=' + currentID + ']').hasClass('st-tab-select')){

            var indexSelectedTab = st_ReturnTabIndex(currentID); // Порядковый номер выделенной вкладки

            // Помещу контент с нужным порядковым номером в .st-old-container своей галереи
            $('.st-hidden-content[data-st=' + currentID + ']').children().eq(indexSelectedTab).clone().appendTo(
                $('.st-content[data-st=' + currentID + ']').children().eq(0)
            )
        }
        // Если у вкладки нет класса st-tab-select
        else{
            $('.st-hidden-content[data-st=' + currentID + ']').children().eq(0).clone().appendTo(
                $('.st-content[data-st=' + currentID + ']').children().eq(0)
            )

            // Поставлю класс st-tab-select первой вкладке
            $('.st-tab[data-st=' + currentID + ']').eq(0).addClass('st-tab-select')
        }
    }
}
stPrepare()

// При клике по вкладке запускается stSwitchTab();
$('.st-tab').click(function(e){
    var galleryId = $(e.target).closest($('[data-st]')).data('st')
    // Объект события нужен для отмены действия браузера по умолчанию если элемент .st-tab это ссылка
    stSwitchTab(e, galleryId) // Подсветить выбранный билет
});

// Функция задает класс st-tab-select вкладке по которой кликнули
function st_hidhtlightTab(e){
    var tab = $(e.target).closest($('.st-tab')), // Вкладка по которой кликнули
        currentID = tab.data('st')// id галереи вкладки по которой кликнули

    $('.st-tab[data-st=' + currentID + ']').removeClass('st-tab-select'); // Убрать выделение со всех пиктограмм билетов
    tab.addClass('st-tab-select'); // Поставить выделение билету, по которому кликнули.
}

function stSwitchTab(e, currentID){
    e.preventDefault();

    // Узнаю порядковый номер старой активной вкладки,
    var oldTabIndex = st_ReturnTabIndex(currentID)

    // Подстветить вкладку по которой кликнули
    st_hidhtlightTab(e);

    // Узнаю порядковый номер новой активной вкладки, по которой кликнули
    var newTabIndex = st_ReturnTabIndex(currentID);

    // Переменные для следующего шага
    var oldContainer =$('.st-content[data-st=' + currentID + ']').find($('.st-old-container')),
        newContainer = $('.st-content[data-st=' + currentID + ']').find($('.st-new-container')),
        content = $('.st-content[data-st=' + currentID + ']')

    // Задать элементу .st-content высоту oldContainer
    content.height(oldContainer.height())

    // Теперь нужно определить направление щелчка. Если слева направо, то блок со старыми ценами уходит вниз, а новые появляются сверху и наоборот
    if(oldTabIndex < newTabIndex){
        oldContainer.addClass('st-down transition03')// Добавил класс и блок со старыми ценами уменьшился и стал прозрачным.

        // Очистить старый контейнер от содержимого и убрать добавленные классы через 300
        setTimeout(function(){
            oldContainer.empty();
            oldContainer.removeClass('st-down transition03')
        }, 300)

        // Клонировать содержимое новой вкладки и поставить в новый контейнер

        var innerContent = $('.st-hidden-content[data-st=' + currentID + ']').children().eq(newTabIndex).clone()
        newContainer.prepend(innerContent);

        // Ставлю класс увеличивающий блок и задающий плавную анимацию свойств
        innerContent.addClass('st-up transition03')

        // Убираю увеличение блока
        setTimeout(function(){
            innerContent.removeClass('st-up');
        }, 0)

        // Добавляю новый контент в oldContainerForTickets через 350
        setTimeout(function(){
            innerContent.removeClass('transition03');
            oldContainer.prepend(innerContent)
        }, 300)

        // Ставлю высоту для heightForTicketContainers
        content.height(newContainer.height())


        // Убираю точную высоту чтобы при изменении размеров страницы высота контейнера подбиралась автоматически
        setTimeout(function(){
            content.css('height', '');
        }, 300);
    }
    // Щелкнули справа налево
    else{
        // oldContainer должен быть выше, чем newContainer
        oldContainer.css('z-index', 2);
        newContainer.css('z-index', 1);

        oldContainer.addClass('st-up transition03') // Добавил класс и блок со старыми ценами увеличился и стал прозрачным.

        setTimeout(function(){
            oldContainer.empty();
            oldContainer.removeClass('st-up transition03')
        }, 300)// Удаление контанта в oldContainerForTickets через 300

        // Клонировать содержимое новой вкладки и поставить в новый контейнер
        var innerContent = $('.st-hidden-content[data-st=' + currentID + ']').children().eq(newTabIndex).clone()
        newContainer.prepend(innerContent);

        // Ставлю класс делающий scale и задающий плавную анимацию свойств
        innerContent.addClass('st-down transition03')

        // Убираю увеличение блока
        setTimeout(function(){
            innerContent.removeClass('st-down');
        }, 0)

        // Добавляю новый контент в oldContainerForTickets через 350
        setTimeout(function(){
            innerContent.removeClass('transition03');
            oldContainer.prepend(innerContent)
        }, 300)

        // Убрать z-index
        oldContainer.css('z-index', '');
        newContainer.css('z-index', '');

        // Ставлю высоту для heightForTicketContainers
        content.height(newContainer.height())

        // Убираю точную высоту чтобы при изменении размеров страницы высота контейнера подбиралась автоматически
        setTimeout(function(){
            content.css('height', '');
        }, 300);
    }
}
/* / / SCALE GALLERY*/



// Функция прокручивает страницу до определенного элемента.
function scrollTo(e, time, func, correctVal, target){
    // Функцию можно запускать определив только объект события.

    // e — объект события. Если его нет, то задай false
    // time — время прокрутки. По-умолчанию 0.
    // func — функция, запускаемая когда произойдет прокрутка. Если нет, то false.
    // correctVal — кооректировка местоположения. Если не нужна, то 0
    // target — если цель не определена в data-scroll-to-target, то написать ее тут. Она должна быть в контейнере jQuery.

    // Если в элементе, на котором нажали есть data-scroll-to-target, то аргумент target == значению data-scroll-to-target
    if(e != false){
        e.preventDefault();
    }

    // Определение элемента, по которому щелкнули
    var elem = $(e.target);
    // Достаю значение в data-scroll-to-target. Там должен быть написан id элемента, до которого крутить. И помещаю его в target
    if(elem.data('scroll-to-target') != ''){
        target = $('#' + elem.data('scroll-to-target'));
    }

    // Прокрутка страницы
    $('html,body').stop().animate({scrollTop: target.offset().top - correctVal}, time);

    // Через заданное время запустить фукцию если она не != false
    if (func != false){
        setTimeout(function(){
            func()
        }, time)
    }
}