// ------ TEMPLATES ------

var taskTemplate = _.template($('.printedTask').text());



// ------ DATA HANDLING ------

// the task constructor
function TaskObject(propertyObject) {
    propertyObject =  propertyObject || {};
    this.task = propertyObject.task;
    this.complete = false;
    this.uniqueId = _.uniqueId('task_')
};

var taskArray = [];

// ------ EVENT HANDLING ------

$(document).ready(function() {

// remove placeholder text on focus
$('.create-new-task').on('focus', function() {
    $(this).removeAttr('placeholder');
    $(this).css('outline', 'none');
    $(this).css('text-align', 'left');
});

// re-add placeholder text on focus out
$('.create-new-task').on('focusout', function() {
    $(this).attr('placeholder', 'I need to...');
    $(this).css('text-align', 'center');
});

// submit task creation on enter keypress (and hover effects)
$('.create-new-task').keypress(function(e) {
    if(e.which == 13 && $(this).val() != '') {
        var input = {
            task: $('.create-new-task').val(),
        };

        taskArray.push(new TaskObject(input));

        $('.printed-task-container').html('');

        _.each(taskArray, function(task, index) {
              $('.printed-task-container').append(taskTemplate(task));
        });

        //clear the text input
        $(this).val('');
    };

    $('.task-wrapper').on({
        mouseenter: function () {
            $(this).find('.task-btns').addClass('hovered');
        },
        mouseleave: function () {
            $(this).find('.task-btns').removeClass('hovered');
        }
    });
});

// on 'completed' button press
$('.printed-task-container').on('click', '.btn-mark-completed', function() {
    $(this).closest('.task-wrapper').toggleClass('completed');
    $(this).closest('.btn-mark-completed').toggleClass('active');

    var taskToBeFlaggedCompleted = _.findWhere(taskArray, {uniqueId : $(this).closest('.task-wrapper').attr('data-uniqueid')});

    _.each(taskArray, function(task, index) {
        if(task.uniqueId == taskToBeFlaggedCompleted.uniqueId) {
            if( $(taskToBeFlaggedCompleted).prop('complete') == false) {
                $(taskToBeFlaggedCompleted).prop('complete', 'true');
            } else {
                $(taskToBeFlaggedCompleted).prop('complete', 'false');
            }
        } else {
            console.log("couldn't find correct task object in array!")
        }
    });

    // var changeToCompleted = function() {
    //      _.each(taskArray, function(task, index) {
    //         if (task.uniqueId == taskToBeFlaggedCompleted.uniqueId) {
    //             $(taskToBeFlaggedCompleted).toggle(function() {
    //                 $(taskToBeFlaggedCompleted).prop('complete', 'true');
    //             }, function() {
    //                 $(taskToBeFlaggedCompleted).prop('complete', 'false');
    //             });
    //         };
    //     });
    // };

    // changeToCompleted();
});

// on 'trash' button press
$('.printed-task-container').on('click', '.btn-trash-task', function() {
    $(this).closest('.task-wrapper').fadeOut('fast', function() {
        $(this).closest('.task-wrapper').remove();
    });

    var taskToBeDeleted = _.findWhere(taskArray, {uniqueId : $(this).closest('.task-wrapper').attr('data-uniqueid')});

    _.each(taskArray, function(task, index) {
        if (task.uniqueId == taskToBeDeleted.uniqueId) {
            taskArray.splice(index, 1);
        };
    });
});


}); //---- end JS wrapper







