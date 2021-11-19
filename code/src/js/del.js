$(document).ready(function() {
    // Если находимся на этой странице, то показать города и адреса пунктов выдачи
    if(typeof ymaps == "object" && $(".where-buy-map-wrapper").length > 0){

        ymaps.ready(init);
        function init() {
            var map = new ymaps.Map('map', {
                center: [55.71101678, 37.43628350],
                zoom: 14
            });
            map.behaviors.disable('scrollZoom');

            $('.where-buy-letter').click(function(e) {
                e.preventDefault();
                $('.where-buy-city').hide();
                $('.where-buy-city[letter="' + $(this).attr('letter') + '"]').show();
                $('.where-buy-letter').removeClass('where-buy-letter-selected');
                $(this).addClass('where-buy-letter-selected');
            });

            $('.where-buy-city').click(function(e) {
                e.preventDefault();
                var terminals = $.parseJSON($(this).attr('terminals'));
                var addresses = '';
                $.each(terminals, function(i, val) {
                    map.geoObjects.add(new ymaps.Placemark([val.latitude, val.longitude]));
                    addresses += '<div class="where-buy-adress-wrapper" latitude="' + val.latitude + '" longitude="' + val.longitude + '"><a href="" class="where-buy-adress link-on-this-page">' + val.address + '</a></div>';
                })
                $('#where-buy-adresses').html(addresses);
                $('#where-buy-adresses .where-buy-adress-wrapper:first-of-type').click();
                $('.where-buy-city').removeClass('where-buy-city-selected');
                $(this).addClass('where-buy-city-selected');
            });

            $('#where-buy-adresses').on('click', '.where-buy-adress-wrapper', function(e) {
                e.preventDefault();
                map.panTo([+$(this).attr('latitude'), +$(this).attr('longitude')]);
                $('#where-buy-adresses .where-buy-adress-wrapper').removeClass('where-buy-adress-wrapper-selected');
                $(this).addClass('where-buy-adress-wrapper-selected');
            });

            $('.where-buy-letter[letter="М"]').click();
            $('.where-buy-city[name='+ "Москва" +']').click();
        }
    }
});


























$(document).ready(function() {
    ymaps.ready(init);
    function init() {
        var map = new ymaps.Map('map', {
            center: [55.71101678, 37.43628350],
            zoom: 14
        });
        map.behaviors.disable('scrollZoom');

        $('.delivery-city-city').bind('change click', function() {
            $('#city-in-header').text($(this).attr('name'));
            $('#delivery-header-near-map span').text($(this).attr('name'));
            var terminals = $.parseJSON($(this).attr('terminals'));
            var addresses = '';
            $.each(terminals, function(i, val) {
                map.geoObjects.add(new ymaps.Placemark([val.latitude, val.longitude]));
                addresses += '<div class="delivery-adress-wrapper" latitude="' + val.latitude + '" longitude="' + val.longitude + '"><p class="delivery-adress">' + val.address + '</p></div>';
            })
            $('#delivery-adresses').html(addresses);
            $('#delivery-adresses .delivery-adress-wrapper:first-of-type').click();
        });

        $('#delivery-adresses').on('click', '.delivery-adress-wrapper', function() {
            map.panTo([+$(this).attr('latitude'), +$(this).attr('longitude')]);
            $('#delivery-adresses .delivery-adress-wrapper').removeClass('delivery-adress-wrapper-selected');
            $(this).addClass('delivery-adress-wrapper-selected');
        });

        $('.delivery-city-city[name=Москва]').change();
    }
});