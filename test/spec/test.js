/* global describe, it */

(function () {
    'use strict';

    taskArray = [
        {
            task : 'do laundry',
            complete : false,
            uniqueId : _.uniqueId('task_')
        },
        {
            task : 'get some milk',
            complete : false,
            uniqueId : _.uniqueId('task_')
        },
        {
            task : 'wash your filthy self',
            complete : false,
            uniqueId : _.uniqueId('task_')
        },
        {
            task : 'crush your foes',
            complete : false,
            uniqueId : _.uniqueId('task_')
        },
    ];

    // before each it() function, do this
    beforeEach(function(done){
        console.log('clearing out the tasks div!');

        // clear out the tasks div
        $('.printed-task-container').html('');

        // loop over the fake tasksArray
        _.each(taskArray, function (taskObjLit, i) {
            // inject it into the DOM
            $('.printed-task-container').append(taskTemplate(taskObjLit));

            // make sure we call done() after the last one is injected
            // so that the actual test can then run
            if (taskArray.length === i + 1) { done(); }
        })
    });

    describe('printed tasks have', function () {

            describe('a complete button', function () {

                it('on click, adds the completed class to the corresponding task div in the DOM, and sets task object prop to complete: true', function () {

                    var taskStatus = [];

                    $('#task_1').find('.btn-mark-completed').click();
                    console.log('taskArray',taskArray);
                    _.each(taskArray, function(element, index) {
                        taskStatus.push(element.complete);
                        console.log('taskStatus',taskStatus)
                    })

                    // expect($('#task_1').hasClass('completed')).to.equal(true);

                    // //check that only only task_1 (at index 0) is set to complete: true
                    expect(taskStatus[0]).to.be.equal(true);
                    expect(taskStatus[1]).to.be.equal(false);
                    expect(taskStatus[2]).to.be.equal(false);
                    expect(taskStatus[3]).to.be.equal(false);
                });

                it('if clicked again, toggles the task back to an uncompleted state (removes class and sets task object prop to complete: false)', function () {


                    $('#task_1').find('.btn-mark-completed').click();
                    $('#task_1').find('.btn-mark-completed').click();

                    expect(!$('#task_1').hasClass('completed'));
                    expect(taskArray[0].complete).to.be.equal(false);
                });

                it('should only modify the clicked task, and leave all other tasks alone', function () {
                    $('#task_1').find('.btn-mark-completed').click();

                    expect($('#task_1').hasClass('completed'));
                    expect(!$('#task_2').hasClass('completed'));
                    expect(!$('#task_3').hasClass('completed'));
                    expect(!$('#task_4').hasClass('completed'));

                    // expect() //all other objects in taskArray to be completed: false
                });
            });

        describe('a delete button', function () {
            it('on click, should remove the corresponding task element from the DOM', function () {
                $('#task_1').find('.btn-trash-task').click();

                expect($('#task_1').hasClass('completed'));
            });

            it('on click, should remove the corresponding task object from the taskArray', function () {
                var theOriginalObjectId = taskArray[0].uniqueId;
                $('#task_1').find('.btn-trash-task').click();

                expect(theOriginalObjectId).to.not.equal(taskArray[0].uniqueId);
            });
        });
    });
})();
