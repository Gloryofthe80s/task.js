// ------ TEMPLATES ------

var taskTemplate = _.template($('.printedTask').text());

var tasksCompletedCounter = _.template($('.tasksCompleted').text());



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

// ------ FUNCTIONS ------

var updateEditedTask = function(clickedBoxId) {
    //store the edited task value
    var newValue = $('.task-input-box').val();

    //find the corresponding task in taskArray and update its value
    var taskToBeUpdated = _.findWhere(taskArray, {uniqueId : clickedBoxId});

    //actually update it
    _.each(taskArray, function(el, i) {
        if (el.uniqueId === taskToBeUpdated.uniqueId) {
            $(taskToBeUpdated).prop('task', newValue);
        }
    });
};

var reprintAllTasks = function() {
    //wipe the task container of all tasks
    $('.printed-task-container').html('');

    //reprint all tasks in taskArray
    _.each(taskArray, function(taskObjLit, i) {
        $('.printed-task-container').append(taskTemplate(taskObjLit));
    });

    updateTaskCounter();
};

var finalizeEdit = function(clickedBoxId) {
    updateEditedTask(clickedBoxId);
    reprintAllTasks();
};

var updateTaskCounter = function () {
    var taskCounter = $('#completed-counter').find('.num-remaining');
    var remainingIncompleteTasks = _.where(taskArray, {complete: false});

    if (remainingIncompleteTasks.length === 0) {
        taskCounter.text('0 tasks left')
    } else if (remainingIncompleteTasks.length === 1) {
        taskCounter.text('1 task left')
    } else {
        taskCounter.text(remainingIncompleteTasks.length + ' tasks left');
    }
};


// ------ EVENT HANDLING ------

$(document).ready(function() {

    // style task input on focus
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
    $('.create-new-task').on('keypress', function(e) {
        //on enter keypress, so long as the input isn't empty
        if(e.which == 13 && $(this).val() != '') {
            var input = {
                task: $('.create-new-task').val(),
            };

            // construct the task object and put it in the taskArray
            taskArray.push(new TaskObject(input));

            reprintAllTasks();
            updateTaskCounter();

            //clear the text input
            $(this).val('');

    }});
    //fade in buttons on mouseenter
    $('.printed-task-container').on('mouseenter', '.task-wrapper', function(event) {
        event.preventDefault();
        $(this).find('.task-btns').stop();
        $(this).find('.task-btns').animate({opacity: 1}, 150);
    });

    //fade out buttons on mouseleave
    $('.printed-task-container').on('mouseleave', '.task-wrapper', function(event) {
        event.preventDefault();
        $(this).find('.task-btns').stop();
        $(this).find('.task-btns').animate({opacity: 0}, 150);
    });

    //turn trash button red on mouseenter
    $('.printed-task-container').on('mouseenter', '.btn-trash-task', function(event) {
        event.preventDefault();
        $(this).addClass('hovered');
    });

    //remove red on mouseleave
    $('.printed-task-container').on('mouseleave', '.btn-trash-task', function(event) {
        event.preventDefault();
        $(this).removeClass('hovered');
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

        updateTaskCounter();
    });

    // editing printed tasks: on double click
    $('.printed-task-container').on('dblclick', '.task-side-left', function () {
        var clickedBoxId = $(this).parent('.task-wrapper').attr('id');

        //inject the inputbox, store pre-edited task
        var currentValue = $(this).find('.task-p').text();
        var inputbox = "<input type='text' class='task-input-box'>";
        $(this).find($('.task-name')).html(inputbox);
        var theEditInput = $(this).find('.task-input-box');
        theEditInput.prop('value', currentValue);
        theEditInput.focus();

        //reprint on enter keypress
        theEditInput.on('keypress', function (event) {
            if(event.which == 13) {
                finalizeEdit(clickedBoxId);
            }
        });

        // OR ELSE reprint once focus is lost
        theEditInput.on('blur', function () {
            finalizeEdit(clickedBoxId);
        });
    });

        // theEditInput.blur(function() {

        //     updateEditedTask();

        //     reprintAllTasks();
        // });

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

        updateTaskCounter();
    });

    // ------ TESTING STUFF ------

    // taskArray = [
    //         {
    //             task : 'do laundry',
    //             complete : false,
    //             uniqueId : _.uniqueId('task_')
    //         },
    //         {
    //             task : 'get some milk',
    //             complete : false,
    //             uniqueId : _.uniqueId('task_')
    //         },
    //         {
    //             task : 'wash your filthy self',
    //             complete : false,
    //             uniqueId : _.uniqueId('task_')
    //         },
    //         {
    //             task : 'crush your foes',
    //             complete : false,
    //             uniqueId : _.uniqueId('task_')
    //         },
    //     ];

    //     // before each it() function, do this
    //     beforeEach(function(done){
    //         console.log('clearing out the tasks div!');

    //         // clear out the tasks div
    //         $('.printed-task-container').html('');

    //         // loop over the fake taskArray
    //         _.each(taskArray, function (taskObjLit, i) {
    //             // inject it into the DOM
    //             $('.printed-task-container').append(taskTemplate(taskObjLit));

    //             // make sure we call done() after the last one is injected
    //             // so that the actual test can then run
    //             if (taskArray.length === i + 1) { done(); }
    //         })
    //     });


}); //---- end JS wrapper







