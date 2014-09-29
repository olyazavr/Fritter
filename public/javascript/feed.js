$(document).ready(function() {
    
    // on click, pop up a modal for editing/creating a frit
    $('.edit').click(function() {
        // remove old modals
        $('#editModal').remove();

        var fritId = $(this).attr('fritId');
        var textElt = $('#' + this.id + '.frit-text');
        var oldText = textElt.text();
        var action = '/editFrit'
        var title = 'Edit Frit'

        // if no fritId, we're creating a new frit
        if (fritId == undefined) {
            action = '/newFrit'
            title = 'Create Frit'
        }

        // add bootstrap modal
        var modal = '<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                        '<div class="modal-dialog">' +
                          '<div class="modal-content">' +
                            '<div class="modal-header">' +
                              '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                              '<h4 class="modal-title" id="editModalLabel">' + title + '</h4>' +
                            '</div>' +
                            '<div class="modal-body">' +

                              '<!-- editing space -->' +
                              '<form id="editFrit" action=' + action + ' method="post">' +
                                '<input type="hidden" name=fritId value=' + fritId + '>' +
                                '<input type="text" name="text" value="' + oldText + '">' +
                                '<input type="submit" class="btn btn-primary" value="Save Changes" method="post">' +
                              '</form>' +
                              '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                              '<!-- /editing space -->' +

                            '</div>' +
                          '</div>'+
                        '</div>' +
                    '</div>'

        $('#editModalHere').append($(modal));
        $('#editModal').modal('show');
    });

});