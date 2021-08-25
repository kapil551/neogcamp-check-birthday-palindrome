//get the birthday input
const birthdayInput = document.querySelector("#birthday-input");
// console.log(birthdayInput);

// get the show palindrome Button
const showPalindromeBtn = document.querySelector("#show-palindrome-btn");
// console.log(showPalindromeBtn);

// get the ouput div
const outputMessage = document.querySelector(".output");
// console.log(outputMessage);


// reverse the string
function reverseString(str) {


    let listOfChars = str.split(''); // -> ['h', 'e', 'l', 'l', 'o']
    let reversedListOfChars = listOfChars.reverse(); // -> ['o', 'l', 'l', 'e', 'h']

    let reversedStr = reversedListOfChars.join(''); // -> 'olleh'

    return reversedStr;
}

// check if the string is palindrome
function isPalindrome(str) {

    // rever the string
    let reversedStr = reverseString(str);

    //check palindrome ==> string is same as it's reverse
    if(str === reversedStr) {

        return true;
    } 
    
    else {

        return false;
    }

}

// function that converts the date from number to string
function convertDateToString(date) {

    let dateToString = {day: '', month: '', year: ''};

    // logic for day
    if(date.day < 10) {

        dateToString.day = '0' + date.day;
    }
    else {

        dateToString.day = date.day.toString(); // inbuilt function in javascript ==> .toString()
    }

     // logic for month
     if(date.month < 10) {
        
        dateToString.month = '0' + date.month;
    } 
    else {

        dateToString.month = date.month.toString(); // inbuilt function in javascript ==> .toString()
    }

    //logic for year
    dateToString.year = date.year.toString();

    // console.log(dateToString);

    return dateToString;

}

// function that takes a date and returns all variations of it
function getAllDateFormats(date) {

    let dateStr = convertDateToString(date);

    //variations of date
    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2); // last two digits of year
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    // return an array of all variations of date
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

// function that checks palindrome for all the date formats
function checkPalindromeForAllDateFormats(date) {

    let listOfPalindromes = getAllDateFormats(date);

    let isAPalindrome = false;

    //iterate over each date format
    for(let idx=0;idx < listOfPalindromes.length;idx++) {

        // if any one of the format is a palindrome then make the isAPalindrome to true and break out of the loop.
        if(isPalindrome(listOfPalindromes[idx]) === true) {
            
            isAPalindrome = true;
            break;
        }
    }


    return isAPalindrome;

}

// check for leap year
function isLeapYear(year) {

    if(year % 400 === 0) {
        return true;
    }

    if(year % 100 === 0) {
        return false;
    }

    if(year % 4 === 0) {
        return true;
    }

    return false;
}

// gets the next date ==> also taking care of increasing the month and increasing the year.
function getNextDate(date) {
    let day = date.day + 1; // incrment the day by one
    let month = date.month;
    let year = date.year;
    

    // January-> 31 days, Feburary-> 28 days, march-> 31 days and so on for 12 months
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // if month is feburary
    if(month === 2) {

        //check for leap year
        if(isLeapYear(year)) {

            // In leap year ==> feburary has 29 days, then after 29 days it is next month
            if(day > 29) {
                day = 1;
                month = month + 1;
            }
        }
        else {

            // In non leap years ==> feburary has 28 days, then after 28 days it is next month
            if(day > 28) {
                day = 1;
                month = month + 1;
            }

        }
    }

    // if month is other than feburary ==> Jan, mar, april, may, june, july, aug, sept, oct, nov, dec
    else {

        // check if the day exceeds the max days in month ==> taking care of month increase
        // month - 1 ==> due to indexing ==> 0th index is january and 11th index is december
        if(day > daysInMonth[month - 1]) {

            day = 1;
            month = month + 1;
        }
    }

    // taking care of year increase ==> next year if month is greater than 12, One year has only 12 months
    if(month > 12) {
        month = 1;
        year = year + 1;
    }

    // return the new next Date
    return {
        day: day,
        month: month,
        year: year
    }
   
}

// Find the next palindrome date, also how many days are in between
function getNextPalindromeDate(date) {

    let ctr = 0;
    let nextDate = getNextDate(date);

    while(1) {
        ctr = ctr + 1;

        let isAPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isAPalindrome === true) {
            break;
        }

        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];

}


function showPalindromeBtnHandler() {

    // console.log("Clicked");
    outputMessage.style.display = "none"

    let birthdayStr = birthdayInput.value;

    if(birthdayStr !== '') {

        // build our date object
        let listOfDate = birthdayStr.split('-');
        
        // console.log(listOfDate);

        // now the date object is build
        /*          
            var date = {
                day: 4,
                month: 2,
                year: 2020
            };
        */
        let date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        // console.log(date);

        // check for palindrome
        let isAPalindrome = checkPalindromeForAllDateFormats(date);

        // console.log(isAPalindrome);

        if(isAPalindrome === true) {

            outputMessage.style.display = "block";
            outputMessage.innerText = `Yay, your birthday is a palindrome 🎂🎂`;
        }
        else {

            // then find the next date palindrome

            let [ctr, nextDate] = getNextPalindromeDate(date);

            outputMessage.style.display = "block";
            outputMessage.innerText = `The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`
        }


    } 
    
    else {

        outputMessage.style.display = "block";
        outputMessage.innerText = `The Birthday cannot be empty`;
    }
}


// call the click event listener on the show palindrome button
showPalindromeBtn.addEventListener("click", showPalindromeBtnHandler);





