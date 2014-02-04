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

// submit task creation on enter keypress
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
    }
});

// on hover of printed task
// $('.header').hover(function() {
//     console.log('test');
//     $(this).find('.task-btns').addClass('hovered');
// }, function() {
//     $(this).find('.task-btns').removeClass('hovered');
// });

$('.header').on({
    mouseenter: function () {
        console.log('test!');
        // $(this).find('.task-btns').addClass('hovered');
    },
    mouseleave: function () {
        console.log('test leave!')
        // $(this).find('.task-btns').removeClass('hovered');
    }
});


// on 'completed' button press
$('.printed-task-container').on('click', '.btn-mark-completed', function() {
    $(this).closest('.task-wrapper').toggleClass('completed');
});

// on 'trash' button press
$('.printed-task-container').on('click', '.btn-trash-task', function() {
    $(this).closest('.task-wrapper').remove();

    var taskToBeDeleted = _.findWhere(taskArray, {uniqueId : $(this).closest('.task-wrapper').attr('data-uniqueid')});

    _.each(taskArray, function(task, index) {
        if (task.uniqueId == taskToBeDeleted.uniqueId) {
            taskArray.splice(index, 1);
        };
    });
});


}); //---- end JS wrapper







