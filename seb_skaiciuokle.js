if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

    Template.header.events({
        'mouseenter .navigation li.dropdown': function (event) {
            $(event.target).removeClass('close');
            $(event.target).addClass('open');
        },
        'mouseleave .navigation li.dropdown': function (event) {
            $(event.target).removeClass('open');
            $(event.target).addClass('close');
        }
    });

    Template.main_content.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.main_content.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
