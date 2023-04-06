
const Stack = require('./Stack.js')
const prompt = require('prompt-sync')();

// ------------------------------
// Initialization
// ------------------------------
const backPages = new Stack();
const nextPages = new Stack();
let currentPage = "This is the first Page";

// ------------------------------
// Helper Functions
// ------------------------------

const showCurrentPage = function (action) {
    console.log(`\n${action}`);
    console.log(`Current Page = ${currentPage}`);
    console.log(`Back Page = ${backPages.peek()}`);
    console.log(`Next Page = ${nextPages.peek()}`);
}

const newPage = function (page) {
    //push currentPage to the backPages stack
    backPages.push(currentPage);
    // update currentPage to be page
    currentPage = page;
    // clear the nextPages stack
    while (!nextPages.isEmpty()) {
        nextPages.pop()
    }
    // show the current page by calling the helper function defined in Task 1 */
    showCurrentPage(page);
}

const backPage = function () {
    // push the current page on the nextPages stack as we will no longer display it
    nextPages.push(currentPage);
    // remove the top item from the backPages stack and set it as the current page
    const previousPage = backPages.pop();
    currentPage = previousPage;
    // display the new current page using the helper function we created in Task 1 and pass an argument to it to denote the back operation.. Hint
    showCurrentPage(`Back: ${currentPage}`)
}

const nextPage = function () {
    //push the current page on the backPages stack as we will no longer display it,
    backPages.push(currentPage);
    // remove the top item from the nextPages stack and set it as the current page
    currentPage = nextPages.pop();
    // display the new current page using the helper function we created in Task 1 and pass an argument to it to denote the next operation..
    showCurrentPage(`Next: ${currentPage}`)
}
/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------
let finish = false;
let showBack = false;
let showNext = false;

showCurrentPage("DEFAULT");
while (!finish) {
    // display the instructions to the user
    let instructions = baseInfo;
    if (!backPages.isEmpty()) {
        instructions = `${instructions}, ${backInfo}`
        showBack = true;
    } else {
        showBack = false;
    }
    if (!nextPages.isEmpty()) {
        instructions = `${instructions}, ${nextInfo}`;
        showNext = true;
    } else {
        showNext = false;
    }
    instructions = `${instructions}, ${quitInfo}`
    console.log(instructions);

    // ------------------------------
    // User Interface Part 2
    // ------------------------------


    const answer = prompt(question)
    const lowerCaseAnswer = answer.toLowerCase();
    /* 
      We are left with the task of processing user input that has been lower-cased. Our choices are: b, n, q or a url string. Write a conditional statement to process only the url string and display a new page based on the original typed url. */

    if (lowerCaseAnswer !== 'b' && lowerCaseAnswer !== 'n' && lowerCaseAnswer !== `q`) {
        newPage(lowerCaseAnswer);
    } else if (lowerCaseAnswer === 'b' && showBack) {
        backPage();
    } else if (lowerCaseAnswer === 'b' && !showBack) {
        console.log('Cannot go back a page. Stack is empty.')
    } else if (lowerCaseAnswer === 'n' && showNext) {
        nextPage();
    } else if (lowerCaseAnswer === 'n' && !showNext) {
        console.log('Cannot go to the next page. Stack is empty.')
    }
    else if (lowerCaseAnswer === 'q') {
        finish = true;
    }
}