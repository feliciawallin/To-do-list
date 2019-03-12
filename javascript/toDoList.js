var myToDoArray = [];
var doneArray = [];

function init() {

    //Hämtar från localstorage och sprarar i variabler
    doneArray = localStorage.getItem("myStoredDoneArray");
    myToDoArray = localStorage.getItem("myStoredToDoArray");

    // Kollar om min localstorage är null, då läggs min hårdkodade lista till
    if (myToDoArray === null) {

        myToDoArray = ["Take André to the doctor", "Meet Alexa", "Have a strawberrydaq", "watch the last episode of Riverdale", "By a new dress"];
        localStorage.setItem("myStoredToDoArray", JSON.stringify(myToDoArray));
    } 
    //om doneArray inte är satt, så lägger jag den som tom, och sparar den i localstorage som en tom array
    if (doneArray === null) {
        doneArray = [];
        localStorage.setItem("myStoredDoneArray", JSON.stringify(doneArray));
    }
    printToDo();
}

function printToDo() {
    // Hämtar myToDoArray från Localstorage
    var getMyToDoArray = localStorage.getItem("myStoredToDoArray");

    myToDoArray = JSON.parse(getMyToDoArray);

    // Hämtar doneArray från Localstorage
    var getMyDoneArray = localStorage.getItem("myStoredDoneArray");

    doneArray = JSON.parse(getMyDoneArray);


    // skriver ut myToDoArray 
    var myFullPrintedToDo = " ";

    for (var i = 0; i < myToDoArray.length; i++) {
        myFullPrintedToDo += "<li class='row justify-content-center'>" + "<div class='col-4 text-left'><p class='upperCase'>" + " " + myToDoArray[i] + "</p></div>" + '<div class="col-4 text-right"><button id="' + i + '" onclick="deleteToDo(' + i + ')"><i class="far fa-trash-alt"></i></button>' + "<input onclick='moveToDone(" + i + ")' type='checkbox' id='" + i + "'></div></li>";
    }

    document.getElementById("printingMyArray").innerHTML = myFullPrintedToDo;

    // skriver ut doneArray
    var myFullPrintedToDone = " ";

    for (var i = 0; i < doneArray.length; i++) {
        myFullPrintedToDone += "<li class='row justify-content-center'>" + "<div class='col-4 text-left'><p class='lineThrough upperCase'>" + " " + doneArray[i] + "</p></div>" + '<div class="col-4 text-right"><button id="' + i + '"onclick="deleteDone(' + i + ')"><i class="far fa-trash-alt"></i></button>' + "<input onclick='moveToToDo(" + i + ")' type='checkbox' checked id='" + i + "'></div></li>";
    }

    document.getElementById("printDoneArray").innerHTML = myFullPrintedToDone;
}

function addItem() {
    var inputValue = document.getElementById("addedItemValue").value;
    myToDoArray.push(inputValue);
    save();
    document.getElementById("addedItemValue").value = '';
    printToDo();
}

function moveToDone(id) {
    var moveThis = myToDoArray.splice(id, 1);
    var turnToString = moveThis.toString();
    doneArray.push(turnToString);
    save();
    printToDo();
}

function moveToToDo(id) {
    var moveThis = doneArray.splice(id, 1);
    var turnToString = moveThis.toString();
    myToDoArray.push(turnToString);
    save();
    printToDo();
}

function sortMyList() {
    myToDoArray.sort(function (x, y) {
        var a = x.toLowerCase();
        var b = y.toLowerCase();

        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
    save();
    printToDo();
}

function deleteToDo(position) {
    myToDoArray.splice(position, 1);
    save();
    printToDo();
}

function deleteDone(position) {
    doneArray.splice(position, 1);
    save();
    printToDo();
}

function save() {
    localStorage.setItem("myStoredToDoArray", JSON.stringify(myToDoArray));
    localStorage.setItem("myStoredDoneArray", JSON.stringify(doneArray));
}