'use strict';

$(function () {

    // Template

    var html = $('#output-test').html();
    var info = [{
        questionTitle: '1. Река Волга впадает в ',
        questionText: ['Каспийское море', 'Черное море', 'Балтийское море'],
        questionAnswer: ['true', 'false', 'false']
    }, {
        questionTitle: '2. Столица Беларуси - город',
        questionText: ['Москва', 'Минск', 'Киев'],
        questionAnswer: ['false', 'true', 'false']
    }, {
        questionTitle: '3. Наивысшая точка в Европе это',
        questionText: ['Говерла', 'Эльбрус', 'Монблан'],
        questionAnswer: ['false', 'true', 'false']
    }];

    var testInLocalStorage = JSON.stringify(info);
    localStorage.setItem('keyTest', testInLocalStorage);

    var testOutFromLocalStorage = localStorage.getItem('keyTest');

    var variableTest = JSON.parse(testOutFromLocalStorage);

    var content = tmpl(html, {
        data: variableTest
    });

    var answerResult = [];
    var count = 0,
        markPositive = 0,
        markNegative = 0;

    $('body').append(content);

    $('.output-wrapper').slideDown('slow');

    // handlers for  unique choice of checkbox groups

    var $unique0 = $('input[class="question-answer_0"]');
    $unique0.click(function () {
        $unique0.filter(':checked').not(this).removeAttr('checked');
    });

    var $unique1 = $('input[class="question-answer_1"]');
    $unique1.click(function () {
        $unique1.filter(':checked').not(this).removeAttr('checked');
    });

    var $unique2 = $('input[class="question-answer_2"]');
    $unique2.click(function () {
        $unique2.filter(':checked').not(this).removeAttr('checked');
    });

    // handler for counting and displaying test results

    $('.button-refer').on('click', function () {

        for (var i = 0; i < variableTest.length; i++) {

            for (var j = 0; j < variableTest[i].questionText.length; j++) {

                if ($('#checkbox_' + i + '_' + j).prop('checked') && variableTest[i].questionAnswer[j] === 'true') {

                    answerResult[count] = '<p class="modal-window__output-result">' + 'Ответ ' + (i + 1) + '.' + (j + 1) + ' верный' + '</p>';
                    count++;
                    markPositive++;
                } else if ($('#checkbox_' + i + '_' + j).prop('checked') && variableTest[i].questionAnswer[j] === 'false') {

                    answerResult[count] = '<p class="modal-window__output-result">' + 'Ответ ' + (i + 1) + '.' + (j + 1) + ' неправильный' + '</p>';
                    count++;
                    markNegative++;
                }
            }
        }

        //    for (let m = 0; m < answerResult.length; m++) {
        //        console.log(answerResult[m]);
        //        
        //    };


        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = answerResult[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var value = _step.value;

                console.log(value);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        ;

        console.log('--------------');
        console.log('Правильных ответов: ', markPositive);
        console.log('Неправильных ответов: ', markNegative);

        $('.modal-window').fadeIn('slowly');

        $('div.modal-window__result-here').append(answerResult);

        if (markPositive == variableTest.length) {
            $('div.modal-window__result-here').after('<p class="modal-window__output-result-all-correct">' + 'Поздравлем! Вы ответили правильно на все вопросы!' + '</p>');
            $('p.modal-window__output-result-all-correct').after('<div class="button-refer-position"><input class="modal-window__button-retry" type="button" value="Попробовать еще раз"></div>');
        } else if (markPositive >= 1 && markPositive < variableTest.length) {
            $('div.modal-window__result-here').after('<p class="modal-window__output-result-not-all-correct">' + 'Вы не на все вопросы ответили правильно!' + '</p>');
            $('p.modal-window__output-result-not-all-correct').after('<div class="button-refer-position"><input class="modal-window__button-retry" type="button" value="Попробовать еще раз"></div>');
        } else if (markPositive == 0 && markNegative == 0) {
            $('div.modal-window__result-here').after('<p class="modal-window__output-result-not-choosed">' + 'Вы не выбрали ни одного ответа!' + '</p>');
            $('p.modal-window__output-result-not-choosed').after('<div class="button-refer-position"><input class="modal-window__button-retry" type="button" value="Попробовать еще раз"></div>');
        } else if (markNegative > 0 && markPositive == 0) {
            $('div.modal-window__result-here').after('<p class="modal-window__output-result-not-choosed">' + 'Все ответы неверные!' + '</p>');
            $('p.modal-window__output-result-not-choosed').after('<div class="button-refer-position"><input class="modal-window__button-retry" type="button" value="Попробовать еще раз"></div>');
        };

        $('.modal-window__button-retry').on('click', function () {
            window.location.reload();
        });
    });
});
