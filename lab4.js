var rooms = ['Kitchen', 'Study', 'Living Room', 'Dining Room', 'Library', 'Lounge', 'Billiards Room', 'Hall', 'Ball Room'];
var weapons = ['Pistol', 'Knife', 'Wrench', 'Lead Pipe', 'Candlestick', 'Revolver'];
var suspects = ['Mrs. Peacock', 'Mrs. Green', 'Miss Scarlet', 'Colonel Mustard', 'Professor Plum', 'Mrs White'];

var room_shuffle = shuffle(rooms);
var weapon_shuffle = shuffle(weapons);
var suspect_shuffle = shuffle(suspects);
var domstorage = window.localStorage;
if (!domstorage.losses) {
    domstorage.losses = 0;
}
if (!domstorage.wins) {
    domstorage.wins = 0;
}
var secretkey = {};
var user_card = [];
var computer_card = [];
var user_name;
var common_card = [];
var database = [];


function welcomeName() {
    user_name = document.getElementById("welcome")[0].value;
    domstorage.user = user_name;
    welcomeAgain();
}

function welcomeAgain() {
    document.getElementById('compute').innerHTML = "";
    document.getElementById('welcome').innerHTML = "Welcome " + user_name + ", you hold the cards for ";
    for (var i = 0; i < user_card.length; i++) {
        document.getElementById('welcome').innerHTML += common_card[i] + ", ";
    }
    document.getElementById('guess').disabled = false;
    modify_choice();
}

function today() {
    var current = new Date();
    var yyyy = current.getFullYear();
    var month = current.getMonth() + 1;
    var date = current.getDate();

    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }
    return date + '/' + month + '/' + yyyy;

}

function checkForWin() {
    var e = document.getElementById('rooms');
    var strRooms = e.options[e.selectedIndex].value;
    var e = document.getElementById('suspects');
    var strSuspects = e.options[e.selectedIndex].value;
    var e = document.getElementById('weapons');
    var strWeapons = e.options[e.selectedIndex].value;
    if (strRooms === secretkey.rooms && strWeapons === secretkey.weapons && strSuspects === secretkey.suspects) {
        user_guess = user_name+" guessed \"" + strSuspects + " in the " + strRooms +
            " with a " + strWeapons + "\"<br/>";
        call_session(user_guess);
        if (domstorage.losses) {
            domstorage.losses = Number(domstorage.losses) + 1;
        }
        local_storage(user_name);
        document.getElementById('guess').disabled = true;

        document.getElementById('compute').innerHTML = "That was the correct guess! " + strSuspects +
            " did it with the " + strWeapons + " in the " + strRooms + "!</br>Click to start a new game:";
        document.getElementById('compute').innerHTML += "<input type=\"button\" value=\"New Game\" onclick=\"refresh()\"/>";
    }
    else {
        // var matched_cards = element_exists(strRooms,strWeapons,strSuspects);
        var user_guess = user_name+" guessed \"" + strSuspects + " in the " + strRooms +
            " with a " + strWeapons + "\"<br/>";
        call_session(user_guess);
        document.getElementById('compute').innerHTML = "Sorry that was an incorrect guess!";
        var incorrect_cards = element_exists(strRooms, strWeapons, strSuspects, computer_card);
        var card = incorrect_cards[Math.floor(Math.random() * incorrect_cards.length)];
        document.getElementById('compute').innerHTML += "The Computer holds the card for " + card + ".<br/>";
        document.getElementById('guess').disabled = true;
        document.getElementById('compute').innerHTML += "Click to continue:" +
            "<input type=\"button\" value=\"Continue\" onclick=\"computer_turn()\"/>";

    }


}

function refresh() {
    sessionStorage.clear();
    var template = "<p>\n" +
        "    Rooms: Kitchen, Study, Living Room, Dining Room, Library, Lounge, Billiards Room, Hall, Ball Room<br/>\n" +
        "    Guests: Mrs. Peacock, Mrs. Green, Miss Scarlet, Colonel Mustard, Professor Plum, Mrs White<br/>\n" +
        "    Weapons: Pistol, Knife, Wrench, Lead Pipe, Candlestick, Revolver <br/>\n" +
        "</p>\n" +
        "\n" +
        "<p>\n" +
        "<FORM id=\"welcome\" onsubmit=\"return emptyFieldCheck()\">\n" +
        "    Name:\n" +
        "    <input type=\"text\" name = \"user_name\" autofocus=\"true\" placeholder=\"name_here\" required=\"required\"/>\n" +
        "    <input type=\"button\" value=\"Enter\" onclick=\"welcomeName()\"/>\n" +
        "</FORM>\n" +
        "<p id=\"select_room\">\n" +
        "\n" +
        "<FORM>\n" +
        "    <label>Guess Room:</label>\n" +
        "    <select name=\"rooms\" id = \"rooms\">\n" +
        "        <option value=\"Kitchen\">Kitchen</option>\n" +
        "        <option value=\"Study\">Study</option>\n" +
        "        <option value=\"Living Room\">Living Room</option>\n" +
        "        <option value=\"Dining Room\">Dining Room</option>\n" +
        "        <option value=\"Lounge\">Lounge</option>\n" +
        "        <option value=\"Billiards Room\">Billiards Room</option>\n" +
        "        <option value=\"Hall\">Hall</option>\n" +
        "        <option value=\"Ball Room\">Ball Room</option>\n" +
        "        <option value=\"Library\">Library</option>\n" +
        "    </select>\n" +
        "\n" +
        "    <br/>\n" +
        "    <label>Guess Suspect:</label>\n" +
        "    <select name=\"suspects\" id = \"suspects\">\n" +
        "        <option value=\"Mrs. Peacock\">Mrs. Peacock</option>\n" +
        "        <option value=\"Mrs. Green\">Mrs. Green</option>\n" +
        "        <option value=\"Miss Scarlet\">Miss Scarlet</option>\n" +
        "        <option value=\"Colonel Mustard\">Colonel Mustard</option>\n" +
        "        <option value=\"Professor Plum\">Professor Plum</option>\n" +
        "        <option value=\"Mrs. White\">Mrs. White</option>\n" +
        "    </select>\n" +
        "    <br/>\n" +
        "    <label>Guess Weapon:</label>\n" +
        "    <select name=\"weapons\" id = \"weapons\">\n" +
        "        <option value=\"Pistol\">Pistol</option>\n" +
        "        <option value=\"Knife\">Knife</option>\n" +
        "        <option value=\"Wrench\">Wrench</option>\n" +
        "        <option value=\"Lead Pipe\">Lead Pipe</option>\n" +
        "        <option value=\"Candlestick\">Candlestick</option>\n" +
        "        <option value=\"Revolver\">Revolver</option>\n" +
        "    </select>\n" +
        "    <br/>\n" +
        "    <input type=\"button\" id = \"guess\" disabled=\"true\" value=\"Guess\" onclick=\"checkForWin()\"/>\n" +
        "</FORM>\n" +
        "<p id ='compute'>\n" +
        "\n" +
        "</p>\n" +
        "<input type=\"button\" id =\"history button\" value = \"Hide History\" onclick=\"show_history()\"><br/>\n" +
        "<div id=\"history\">\n" +
        "\n" +
        "</div>\n" +
        "\n" +
        "<input type=\"button\" id = \"record button\" value = \"Hide Record\" onclick=\"show_record()\"><br/>\n" +
        "<div id=\"record\">\n" +
        "\n" +
        "</div>\n";
    reset();
    document.getElementById('render').innerHTML = template;
    local_storage();
}

function reset() {
    secretkey = {};
    user_card = [];
    computer_card = [];
    user_name = undefined;
    room_shuffle = shuffle(rooms);
    weapon_shuffle = shuffle(weapons);
    suspect_shuffle = shuffle(suspects);
    common_card = randomize_room_cards(room_shuffle, weapon_shuffle, suspect_shuffle);
    common_card = shuffle(common_card);
    user_card = split_array(common_card, 0, Math.floor(common_card.length / 2));
    computer_card = split_array(common_card, Math.floor(common_card.length / 2), common_card.length);
    console.log(secretkey);
    database = [];

}

function modify_choice() {
    var new_room = compare_string(rooms, user_card);
    new_room = shuffle(new_room);
    var new_suspect = compare_string(suspects, user_card);
    new_suspect = shuffle(new_suspect);
    var new_weapon = compare_string(weapons, user_card);
    new_weapon = shuffle(new_weapon);
    document.getElementById('rooms').innerHTML = '';
    document.getElementById('suspects').innerHTML = "";
    document.getElementById('weapons').innerHTML = "";
    for (var i = 0; i < new_room.length; i++) {
        document.getElementById('rooms').innerHTML += "<option value=\"" + new_room[i] + "\">" + new_room[i] + "</option>";
    }
    for (var i = 0; i < new_suspect.length; i++) {
        document.getElementById('suspects').innerHTML += "<option value=\"" + new_suspect[i] + "\">" + new_suspect[i] + "</option><br />";
    }
    for (var i = 0; i < new_weapon.length; i++) {
        document.getElementById('weapons').innerHTML += "<option value=\"" + new_weapon[i] + "\">" + new_weapon[i] + "</option><br />";
    }
}

function compare_string(arr1, arr2) {
    var len1 = arr1.length;
    var arr = [];
    var len2 = arr2.length;
    for (var x = 0; x < len1; x++) {
        arr[arr1[x]] = true;
    }
    for (var y = 0; y < len2; y++) {
        if (!(arr[arr2[y]])) {
            arr[arr2[y]] = true;
        }
        if (arr[arr2[y]]) {
            delete arr[arr2[y]];
        }
    }
    var ret = [];
    for (var z in arr) {
        ret.push(z);
    }
    return ret;
}

function computer_turn() {
    var new_room = compare_string(rooms, computer_card);
    new_room = shuffle(new_room);
    var new_suspect = compare_string(suspects, computer_card);
    new_suspect = shuffle(new_suspect);
    var new_weapon = compare_string(weapons, computer_card);
    new_weapon = shuffle(new_weapon);
    var room_chosen = new_room[Math.floor(Math.random() * new_room.length)];
    var suspect_chosen = new_suspect[Math.floor(Math.random() * new_suspect.length)];
    var weapon_chosen = new_weapon[Math.floor(Math.random() * new_weapon.length)];
    var comp_guess = "The Computer guessed \"" + suspect_chosen + " in the " + room_chosen +
        " with a " + weapon_chosen + "\"<br/>";
    call_session(comp_guess);
    document.getElementById('compute').innerHTML = comp_guess;
    if (room_chosen === secretkey.rooms && weapon_chosen === secretkey.weapons && suspect_chosen === secretkey.suspects) {
        document.getElementById('compute').innerHTML += "Computer made the correct guess! </br>Click to start a new game:";
        document.getElementById('compute').innerHTML += "<input type=\"button\" value=\"New Game\" onclick=\"refresh()\"/>";
        if (domstorage.wins) {
            domstorage.wins = Number(domstorage.wins) + 1;
        }
        local_storage('Computer');
    }
    else {
        document.getElementById('compute').innerHTML += "The Computer made an incorrect guess!";
        var incorrect_cards = element_exists(room_chosen, weapon_chosen, suspect_chosen, user_card);
        var card = incorrect_cards[Math.floor(Math.random() * incorrect_cards.length)];
        document.getElementById('compute').innerHTML += " You holds the card for " + card + ".<br/>";
        document.getElementById('compute').innerHTML += "Click to continue:" +
            "<input type=\"button\" value=\"Continue\" onclick=\"welcomeAgain()\"/>";

    }
}

function element_exists(room, weapon, suspect, cards_to_check) {
    var arr = [], k = 0;
    for (var i = 0; i < cards_to_check.length; i++) {
        if (room === cards_to_check[i]) {
            arr[k++] = room;
        }
        else if (weapon === cards_to_check[i]) {
            arr[k++] = weapon;
        }
        else if (suspect === cards_to_check[i]) {
            arr[k++] = suspect;
        }
    }
    return arr;
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
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function show_history() {
    var x = document.getElementById("history");
    if (x.style.display === "none") {
        document.getElementById('history button').value = "Hide History";
        x.style.display = "block";
    } else {
        document.getElementById('history button').value = "Show History";
        x.style.display = "none";
    }

}

function show_record() {
    var x = document.getElementById("record");
    if (x.style.display === "none") {
        document.getElementById('record button').value = "Hide Record";
        x.style.display = "block";
    } else {
        document.getElementById('record button').value = "Show Record";
        x.style.display = "none";
    }
}


function call_session(player_guess) {

    if (window.sessionStorage) {
        database.push(player_guess);
        sessionStorage.guess = database;
    }

    document.getElementById('history').innerHTML = sessionStorage.guess.replace(/,/g, '');
}

function local_storage(player) {
    document.getElementById('record').innerHTML = "Computer total wins  " + domstorage.wins + ":" + domstorage.losses + "  total losses<br />";
    var names = {};
    names.k = [];

    if (names.k !== undefined && domstorage.getItem('record') && domstorage.user !== undefined) {
        names = JSON.parse(localStorage.getItem("record"));
        for (var i in names.k) {

            document.getElementById('record').innerHTML += names.k[i];
        }
        if (player === 'Computer') {
            var temp_1 = "Computer vs  " + domstorage.user + "," + today() + "  Computer won<br />";
            names.k.push(temp_1);
            document.getElementById('record').innerHTML += temp_1;
        }
        else if ((player === user_name) && (user_name !== undefined)) {
            var temp_2 = "Computer vs  " + domstorage.user + ", " + today() + "  " + domstorage.user + " won<br />";
            names.k.push(temp_2);
            document.getElementById('record').innerHTML += temp_2;
        }
        domstorage.setItem("record", JSON.stringify(names));

    }
    else {
        if (player === 'Computer') {
            temp_1 = "Computer vs  " + domstorage.user + "," + today + "  Computer won<br />";
            names.k.push(temp_1);
            document.getElementById('record').innerHTML += temp_1;

        }
        else if ((player === user_name) && domstorage.user !== undefined) {
            temp_2 = "Computer vs  " + domstorage.user + ", " + today + "  " + domstorage.user + " won<br />";
            names.k.push(temp_2);
            document.getElementById('record').innerHTML += temp_2;
        }
        domstorage.setItem("record", JSON.stringify(names));
    }
    console.log(names)


}

function randomize_room_cards(room_card, weapon_card, suspect_card) {
    var k = 0;
    var common_cards = [];
    for (var i = 0; i < room_card.length; i++) {
        if (i === 0) {
            secretkey.rooms = room_card[i];
        }
        else {
            common_cards[k++] = room_card[i];
        }

    }
    for (var i = 0; i < weapon_card.length; i++) {
        if (i === 0) {
            secretkey.weapons = weapon_card[i];
        }
        else {
            common_cards[k++] = weapon_card[i];
        }
    }
    for (var i = 0; i < suspect_card.length; i++) {
        if (i === 0) {
            secretkey.suspects = suspect_card[i];
        }
        else {
            common_cards[k++] = suspect_card[i];
        }
    }
    return common_cards;
}

function split_array(arr, m, n) {
    var ret = [], k = 0;
    for (var i = m; i < n; i++) {
        ret[k++] = arr[i];

    }
    return ret;
}

