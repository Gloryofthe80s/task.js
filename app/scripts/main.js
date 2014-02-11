// ------ TEMPLATES ------

var taskTemplate = _.template($('.printedTask').text());

var tasksCompleted = _.template($('.tasksCompleted').text());



// ------ DATA HANDLING ------

// the task constructor
function TaskObject(propertyObject) {
    propertyObject =  propertyObject || {};
    this.task = propertyObject.task;
    this.complete = false;
    this.uniqueId = _.uniqueId('task_')
};

// all task objects go into the taskArray
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
    //on enter keypress, so long as the input isn't empty
    if(e.which == 13 && $(this).val() != '') {
        var input = {
            task: $('.create-new-task').val(),
        };

        // construct the task object and put it in the taskArray
        taskArray.push(new TaskObject(input));

        //'wipe the slate' of tasks
        $('.printed-task-container').html('');

        //reprint all tasks in the taskArray
        _.each(taskArray, function(taskObjLit, i) {
            $('.printed-task-container').append(taskTemplate(taskObjLit));
        });

        //clear the text input
        $(this).val('');
    };

    // on printed task hover
    $('.task-wrapper').on({
        mouseenter: function () {
            $(this).find('.task-btns').stop();
            $(this).find('.task-btns').animate({opacity: 1}, 150);
        },
        mouseleave: function () {
            $(this).find('.task-btns').stop();
            $(this).find('.task-btns').animate({opacity: 0}, 150);
        }
    });

    // on trash icon hover
    $('.btn-trash-task').on({
        mouseenter: function () {
            $(this).addClass('hovered');
        },
        mouseleave: function () {
            $(this).removeClass('hovered');
        }
    });
});

// on 'completed' button click
$('.printed-task-container').on('click', '.btn-mark-completed', function() {
    $(this).closest('.task-wrapper').toggleClass('completed');

    //find the corresponding task object in the taskArray
    var taskToBeFlaggedCompleted = _.findWhere(taskArray, {uniqueId : $(this).closest('.task-wrapper').attr('id')});

    // toggle completed prop of the task object
    _.each(taskArray, function(task, index) {
        if(task.uniqueId == taskToBeFlaggedCompleted.uniqueId) {
            if( $(taskToBeFlaggedCompleted).prop('complete') == false) {
                $(taskToBeFlaggedCompleted).prop('complete', true);
            } else {
                $(taskToBeFlaggedCompleted).prop('complete', false);
            }
        };
    });
});

// on 'trash' button click
$('.printed-task-container').on('click', '.btn-trash-task', function() {
    $(this).closest('.task-wrapper').fadeOut('fast', function() {
        $(this).closest('.task-wrapper').remove();
    });

    var taskToBeDeleted = _.findWhere(taskArray, {uniqueId : $(this).closest('.task-wrapper').attr('id')});

    _.each(taskArray, function(task, index) {
        if (task.uniqueId == taskToBeDeleted.uniqueId) {
            taskArray.splice(index, 1);
        };
    });
});

// ------ TESTING SPECIFIC ------

//load up some default tasks
// taskArray = [
//     {
//         task : 'do laundry',
//         complete : false,
//         uniqueId : _.uniqueId('task_')
//     },
//     {
//         task : 'get some milk',
//         complete : false,
//         uniqueId : _.uniqueId('task_')
//     },
//     {
//         task : 'wash your filthy self',
//         complete : false,
//         uniqueId : _.uniqueId('task_')
//     },
//     {
//         task : 'crush your foes',
//         complete : false,
//         uniqueId : _.uniqueId('task_')
//     },
// ];

// //append them to the container
// _.each(taskArray, function (taskObjLit, i) {
//     $('.printed-task-container').append(taskTemplate(taskObjLit));
// })

}); //---- end JS wrapper







