define(["jquery", "lib/new-user"], function($, newUser) {

    $(function() {
        if ($('#add-new-user-js').length > 0) {
            newUser('#add-new-user-js');
        }
    });
});