$(document).ready(() => {

    // declaring variables
    const regexNum = /[^0-9]/g;
    let textArea = $('textarea').val();
    let yearInput = $('#year').val();

    // adding empty className
    $(`.card .names`).html('<i class="far fa-frown-open"></i>');

    // textarea value updation on input
    $('textarea').on('input', e => {
        textArea = $('textarea').val();
        formValidation(textArea, 'textarea')
    });

    // year value updation on input
    $('#year').on('input', e => {
        yearInput = $('#year').val();
        formValidation(yearInput, 'year')
    });

    // function to validate JSON string
    function IsValidJSONString(str) {
        try { JSON.parse(str) }
        catch (e) { return false }
        return true;
    }

    // form validation functionality
    function formValidation(elem, str) {
        if(elem.length == 0) displayError('Above field is required', `${str}`)
         else if(str == 'textarea') {
            if (!IsValidJSONString(elem)) displayError(`Please enter valid JSON`, `${str}`)
            else {
                displaySuccess(`${str}`)
                return 1
            }
        } else if (str == 'year') {
            if (regexNum.test(elem) || elem.length != 4) displayError(`Please enter valid year`, `${str}`)
            else {
                displaySuccess(`${str}`)
                return 1
            }
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
    $('textarea').on('blur', e => formValidation(textArea, 'textarea'));
    $('#year').on('blur', e => formValidation(yearInput, 'year'));

    // generate data functionality
    const generateData = (json, yearInput) => {
        let data = JSON.parse(json);
        let dateArr=[], newDateArr=[], nameInitial=[], jsonData=[];

        $(data).filter((i, e) => dateArr.push(e.birthday));
        $(data).filter((i, e) => {
            const fullName = e.name.split(' ');
            const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
            nameInitial.push(initials)
        });
        $(dateArr).filter((i, e) => newDateArr.push(`${e.slice(0,6)}${yearInput}`));

        class JsonDate {
            constructor(n, d) {
                this.n = n;
                this.d = d;
            }
        }
        for (var i=0; i<data.length; i++) {
            const obj = new JsonDate(nameInitial[i], newDateArr[i]);
            jsonData.push(obj);
        }
        displayData(jsonData)
    }

    // display data functionality
    const displayData = (data) => {
        $(`.card`).addClass('empty');
        $(`.card .names`).html('<i class="far fa-frown-open"></i>');

        for(var i=0; i<data.length; i++) {
            const myDay = new Date(data[i].d).getDay() + 1
            const content = `<li>${data[i].n}</li>`;

            $(`.card:nth-child(${myDay}) .names i`).before(content);
            $(`.card:nth-child(${myDay})`).removeClass('empty');
        }
    }

    // on form submit    
    $('#birthday').submit(e => {
        e.preventDefault();

        let checkNum1 = formValidation(textArea, 'textarea');
        let checkNum2 = formValidation(yearInput, 'year');
        
        if(checkNum1 == 1 && checkNum2 == 1) generateData(textArea, yearInput)
    })
})