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
            if(!$('.navigation').hasClass('mobile')) {
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
        'click .mobile li.dropdown': function(event) {
            if ($(event.target.parentNode).hasClass('open')) {
                $(event.target.parentNode).removeClass('open');
                $(event.target.parentNode).addClass('close');
            } else {
                $(event.target.parentNode).removeClass('close');
                $(event.target.parentNode).addClass('open');
            }
        }

    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
