$(document).ready(() => {

    // declaring variables
    const regexNum = /[^0-9]/g;
    let textArea = $('textarea').val();
    let yearInput = $('#year').val();

    // input value updation on input
    $('textarea').on('input', e => {
        textArea = $('textarea').val();
        checkTextarea(textArea, 'textarea')
    });

    $('#year').on('input', e => {
        yearInput = $('#year').val();
        checkNumber(yearInput, 'year')
    });

    // function to validate JSON string
    function IsValidJSONString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    // check textarea functionality
    function checkTextarea(elem, str) {
        if(elem.length == 0) displayError('Above field is required', `${str}`)
        else if (!IsValidJSONString(elem)) displayError(`Please enter valid JSON`, `${str}`)
        else {
            displaySuccess(`${str}`)
            return 1
        }
    }

    // check number functionality
    function checkNumber(elem, str) {
        if(elem.length == 0) displayError('Above field is required', `${str}`)
        else if (regexNum.test(elem)) displayError(`Please enter valid year`, `${str}`)
        else {
            displaySuccess(`${str}`)
            return 1
        }
    }

    // display error function
    function displayError(msg, e) {
        $(`.${e}Err`).text(msg)
        $(`.${e}Err`).show()
    }

    // display success function
    function displaySuccess(e) {
        $(`.${e}Err`).html('')
        $(`.${e}Err`).hide()
    }

    // checkForm on input blur
    $('textarea').on('blur', e => checkTextarea(textArea, 'textarea'));
    $('#year').on('blur', e => checkNumber(yearInput, 'year'));

    const generateData = (json, yearInput) => {
        let data = JSON.parse(json);
        let dateArr = [];
        let newDateArr = [];

        $(data).filter((i, e) => dateArr.push(e.birthday));
        $(dateArr).filter((i, e) => newDateArr.push(`${e.slice(0,6)}${yearInput}`));

        displayData(newDateArr)
    }

    // on form submit    
    $('#birthday').submit(e => {
        e.preventDefault();

        let checkNum1 = checkTextarea(textArea, 'textarea');
        let checkNum2 = checkNumber(yearInput, 'year');
        
        if(checkNum1 == 1 && checkNum2 == 1) {
            generateData(textArea, yearInput)
        } else {
            console.log('nope')
        }
    })

})