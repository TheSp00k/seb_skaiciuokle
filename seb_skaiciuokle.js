if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

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
        console.log(result);

        Session.set("currencies", result);
    });

    Template.currency_changer.helpers({
        calculator: function () {
            return Session.get("currencies");
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
                var resp = $('#curr_rates_from > option:nth-child(1)').text();
                //var options = $('#curr_rates_from option');
                //var resp = $.map(options ,function(option) {
                //    return option.value;
                //});
                //console.log(resp);
                return resp;
            }
        });
    });
}
