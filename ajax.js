$(document).ready(function(){

    const URI = '/editarProveedor'

    $(`#tabla`).load("./")

    $('table').on('click', 'eliminarSummit', function(){
        let row = $(this).closest('tr');
        let id = row.find('.id').text();

        $.ajax({
            url:`${URI}\${id}`,
            method: 'DELETE',
            success: function(response){
                $(``)
            }
        })
    })
})