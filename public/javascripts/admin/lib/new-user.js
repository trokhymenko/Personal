define(
    [
        'jquery', 
        'axios', 
        'bootstrap'
    ], 
    function($, axios) {
        
        function addUser() {
            axios.post('/admin/api/user/add', {
                username: $('#addNewUser input[name=username]').val(),
                email: $('#addNewUser input[name=email]').val(),
                password: $('#addNewUser input[name=password]').val()
              })
              .then(function (response) {
                console.log(response);
                if (response.data.status === 'success') {
                    location.reload();
                }
              })
              .catch(function (error) {
                console.log('Error');
                console.log(error);
              });
        }

        function deleteUser(id) {
            axios.post('/admin/api/user/delete', {
                userid: id,
              })
              .then(function (response) {
                console.log(response);
                if (response.data.status === 'success') {
                    location.reload();
                }
              })
              .catch(function (error) {
                console.log('Error');
                console.log(error);
              });
        }

        return function (link) {
            $(document).on('click', link, function(){
                $('#addNewUser').modal('toggle');
            });

            $(document).on('click', '#add-user-js', function(){
                addUser();
            });

            $(document).on('click', '.delete-user-js', function(){
                deleteUser($(this).data('user-id'));
            });
        }
    }
);