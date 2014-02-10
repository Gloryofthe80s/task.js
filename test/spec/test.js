/* global describe, it */

(function () {
    'use strict';

    describe('printed tasks have', function () {

        describe('a complete button', function () {

            it('on click, adds the completed class (which modifies its appearance) to the corresponding task in the DOM', function () {

                $('.task-wrapper[data-uniqueid="task_1"] > btn-mark-completed').click();
                console.log($(".task-wrapper[data-uniqueid='footer']"));

                // expect($('.task-wrapper[data-uniqueid="task1"]').css('background-color')).to.equal('rgba(75, 75, 75, 0.25)');
            });

            it("on click, should change the corresponding task object's completed property to 'true'" , function () {

            });

            it('if clicked again, toggles the task back to an uncompleted state', function () {

            });

            it('should only mark completed the task in the DOM that was clicked', function () {

            });

            it('should only affect the corresponding object in the taskArray completed status', function () {

            });
        });

        describe('a delete button', function () {
            it('on click, should remove the corresponding task element from the DOM', function () {

            });

            it('on click, should remove the corresponding task object from the taskArray', function () {

            });
        });


    });
})();
