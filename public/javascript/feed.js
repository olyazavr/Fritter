$(document).ready(function() {
    
    // on click, pop up a modal for editing/creating a frit
    $('.edit').click(function() {
        var fritId = $(this).attr('fritId');
        var textElt = $('#' + this.id + '.frit-text');
        var oldText = textElt.text();
        var action = '/editFrit';
        var title = 'Edit Frit';

        // if no fritId, we're creating a new frit
        if (fritId == undefined) {
            action = '/newFrit';
            title = 'Create Frit';
        }

        $('.modal-title').attr('value', title);
        $('#editFrit').attr('action', action);
        $('#fritIdInput').attr('value', fritId);
        $('#contentInput').attr('value', oldText);
        $('#editModal').modal('show');
    });

    
    // toggle viewing all Frits
    $('#all-frits').click(function() {
        // flip buttons being disabled
        $(this).attr('disabled', 'disabled');
        $('#follow-frits').removeAttr('disabled');
        $('#fav-frits').removeAttr('disabled');
        
        // hide all not followed frits
        $('.not-followed').removeClass('hidden');
        $('.not-favorited').removeClass('hidden');
    });

    // toggle viewing Frits only by those you follow
    $('#follow-frits').click(function() {
        // flip buttons being disabled
        $(this).attr('disabled', 'disabled');
        $('#all-frits').removeAttr('disabled');
        $('#fav-frits').removeAttr('disabled');
        
        // unhide all not followed frits
        $('.not-favorited').removeClass('hidden');
        $('.not-followed').addClass('hidden');
    });

    // toggle viewing only favorited Frits
    $('#fav-frits').click(function() {
        // flip buttons being disabled
        $(this).attr('disabled', 'disabled');
        $('#follow-frits').removeAttr('disabled');
        $('#all-frits').removeAttr('disabled');
        
        // unhide all not followed frits
        $('.not-followed').removeClass('hidden');
        $('.not-favorited').addClass('hidden');
    });

});