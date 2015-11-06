if (Meteor.isClient) {
        Template.header.events({
        'mouseenter .navigation li.dropdown': function (event) {
            if (!$('.navigation').hasClass('mobile')) {
                $(event.target).removeClass('close');
                $(event.target).addClass('open');
            }
        },
        'mouseleave .navigation li.dropdown': function (event) {
            if (!$('.navigation').hasClass('mobile')) {
                $(event.target).removeClass('open');
                $(event.target).addClass('close');
            }
        },
        'click #menu-icon': function () {
            if (!$('.navigation').hasClass('mobile')) {
                $('.navigation').addClass('mobile');
            } else {
                $('.navigation').removeClass('mobile');
                $('.navigation').removeClass('close');
            }

            if ($('.navigation').hasClass('open')) {
                $('header > .header-content > ul.navigation').removeClass('open');
                $('header > .header-content > ul.navigation').addClass('close');
            } else {
                $('header > .header-content > ul.navigation').removeClass('close');
                $('header > .header-content > ul.navigation').addClass('open');
            }
        },
        'click .mobile li.dropdown': function (event) {
            if ($(event.target.parentNode).hasClass('open')) {
                $(event.target.parentNode).removeClass('open');
                $(event.target.parentNode).addClass('close');
            } else {
                $(event.target.parentNode).removeClass('close');
                $(event.target.parentNode).addClass('open');
            }
        }
    });

    Meteor.call('getCurrencies', function (error, result) {
        if (error) {
            console.log('error', error);
        }
        Session.set("currencies", result);
    });

    Template.currency_changer.events({
        'keyup #having, keyup #getting': function(event) {
            Session.set( "lastInput", event.target.id );
            var amount = $(event.target).val();
            if(isNaN(amount)) {
                $(event.target).css('background-color', '#f2dede');
                $('#calculate').attr('disabled', 'disabled').css({'cursor': 'not-allowed', 'transparent': '5%'});
            } else {
                $(event.target).css('background-color', '#ffffff');
                $('#calculate').removeAttr('disabled').css('cursor', 'pointer');
            }
        },
        'click #calculate': function(event) {

            var lastInput = Session.get('lastInput');
            var sell = $('#sell').val();
            var buy = $('#buy').val();
            var result;

            if (lastInput == 'having') {
                result = (buy / sell) * $('#'+lastInput).val();
                $('#getting').val(result.toFixed(2));
            } else {
                result = (sell / buy) * $('#'+lastInput).val();
                $('#having').val(result.toFixed(2));
            }
        }
    });


    Template.currency_changer.helpers({
        calculator: function () {
            var currencies = Session.get("currencies");
            return currencies;
        },
        isValid:function(currency){
            return !isNaN(currency);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        var cheerio = Meteor.npmRequire("cheerio");

        Meteor.methods({
            getCurrencies: function () {
                result = Meteor.http.get("https://e.seb.lt/mainib/web.p?act=currencyrates&lang=LIT");
                $ = cheerio.load(result.content);
                var resultArr = [];
                $('#content01 > div > div > div > table > tbody > tr:not(.hidden)').each(function(i, element){
                    resultArr.push({
                        text: $(this).find(' > td:nth-child(1)').text().trim(),
                        sell: parseFloat($(this).find(' > td:nth-child(5)').text().trim().replace(/,/g, '.')),
                        buy: parseFloat($(this).find(' > td:nth-child(4)').text().trim().replace(/,/g, '.'))
                    });
                });

                return resultArr;
            }
        });
    });
}
