requirejs.config({
    // "baseUrl": "/",
    shim: {
        bootstrap: {
            deps: [ "jquery" ]
        }
    },
    paths: {
      jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
      bootstrap: "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min",
      axios: "//unpkg.com/axios/dist/axios.min"
    }
});

// Load the main
requirejs(["main"]);