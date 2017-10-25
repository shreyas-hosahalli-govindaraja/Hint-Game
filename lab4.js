var rooms = ['Kitchen', 'Study', 'Living Room', 'Dining Room', 'Library', 'Lounge', 'Billiards Room', 'Hall', 'Ball Room'];
var weapons = ['Pistol', 'Knife', 'Wrench', 'Lead Pipe', 'Candlestick', 'Revolver'];
var suspects = ['Mrs. Peacock', 'Mrs. Green', 'Miss Scarlet', 'Colonel Mustard', 'Professor Plum', 'Mrs White'];

var room_shuffle = shuffle(rooms);
var weapon_shuffle = shuffle(weapons);
var suspect_shuffle = shuffle(suspects);

var user = {"rooms":[],"weapons":[],"suspects":[]};
var computer = {"rooms":[],"weapons":[],"suspects":[]};
var secretkey = {};
var user_card = [];
var computer_card = [];
var items = [2,3];
var item = items[Math.floor(Math.random()*items.length)];
if(item === 2){
    item1 = 3;
}
else
    item1 = 2;
function welcomeName() {
    var user_name = document.getElementById("welcome")[0].value;
    // console.log(user_name);
    if(item===2) {
        document.getElementById('welcome').innerHTML = "Welcome " + user_name + "," +
            " you hold the cards for:<br />" +
            "Rooms: " + user.rooms[0] + "," + user.rooms[1] + "," + user.rooms[2] + "," + user.rooms[3] + "<br />"+
            "Suspects: " + user.suspects[0] + "," + user.suspects[1] + ","+ user.suspects[2] + "<br />"+
            "Weapons: "+ user.weapons[0] + ","+ user.weapons[1];
    }
    else{
        document.getElementById('welcome').innerHTML = "Welcome " + user_name + "," +
            " you hold the cards for:<br />" +
            "Rooms: " + user.rooms[0] + "," + user.rooms[1] + "," + user.rooms[2] + "," + user.rooms[3] + "<br />"+
            "Suspects: " + user.suspects[0] + "," + user.suspects[1] +"<br />"+
            "Weapons: "+ user.weapons[0] + ","+ user.weapons[1]+ ","+ user.weapons[2];
    }
    modify_choice();
}
function modify_choice() {
    var new_room = compare_string(rooms,user.rooms);
    var new_suspect = compare_string(suspects,user.suspects);
    var new_weapon = compare_string(weapons,user.weapons);
    var select = document.getElementById('selectBox');
    for(var i=0;i<new_room.length;i++) {
        select.removeChild(select[new_room[0]]);
    }
}
function compare_string(arr1, arr2){
    var arr =[],ret = [];

    for (var i = 0; i < arr1.length; i++) {
        arr[arr1[i]] = true;
    }

    for (var i = 0; i < arr2.length; i++) {
        if (arr[arr2[i]]) {
            delete arr[arr2[i]];
        } else {
            arr[arr2[i]] = true;
        }
    }

    for (var k in arr) {
        ret.push(k);
    }

    return ret;
}

function emptyFieldCheck() {
    var a = document.getElementById("welcome")[0].value;
    if (a === "") {
        alert("Name must be filled out");
        return false;
    }
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function randomize_room_cards(cards) {
    var j = 0, k = 0;
    for (var i = 0; i < cards.length; i++) {
        if (i === 0) {
            secretkey.rooms = cards[i];
        }
        else if ((i >= 1) && (i <= 4)) {
            user.rooms[j++] = cards[i];
        }
        else {
            computer.rooms[k++] = cards[i];
        }

    }
}


function randomize_weapon_cards(cards) {
    var j = 0, k = 0;
    for(var i = 0; i<cards.length; i++) {
        if (i === 0) {
            secretkey.weapons = cards[i];
        }
        else if ((i >= 1) && (i <= item)) {
            user.weapons[j++] = cards[i];

            //console.log(cards[i], j);
        }
        else {
            computer.weapons[k++] = cards[i];
        }
    }
}


function randomize_suspect_cards(cards) {

    var j = 0, k = 0;
    for(var i = 0; i<cards.length; i++) {
        if (i === 0) {
            secretkey.suspects = cards[i];
        }
        else if ((i >= 1) && (i <= item1)) {
            user.suspects[j] = cards[i];
            j = j+1;
        }
        else {
            computer.suspects[k++] = cards[i];
        }
    }

}

randomize_suspect_cards(suspect_shuffle);
randomize_room_cards(room_shuffle);
randomize_weapon_cards(weapon_shuffle);

console.log(user);
console.log(computer);
console.log(secretkey);

