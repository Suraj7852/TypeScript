"use strict";
exports.__esModule = true;
var util = require("../utility");
function shuffle(deck) {
    var currentIndex = deck.length, tempVal, randomIndex;
    while (0 != currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempVal = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = tempVal;
    }
    return deck;
}
function Distribution(deck) {
    var player1 = [];
    var player2 = [];
    var player3 = [];
    var player4 = [];
    var index1 = 0, index2 = 0, index3 = 0, index4 = 0, suffIndex = 0;
    for (var i = 0; i < 9; i++) {
        player1[index1++] = deck[suffIndex++];
        player2[index2++] = deck[suffIndex++];
        player3[index3++] = deck[suffIndex++];
        player4[index4++] = deck[suffIndex++];
    }
    var AllPlayer = {
        player1: player1,
        player2: player2,
        player3: player3,
        player4: player4
    };
    return AllPlayer;
}
var deck = ["C-02", "C-03", "C-04", "C-05", "C-06", "C-07", "C-08", "C-09", "C-10", "C-JACK", "C-KING", "C-QUEEN", "C-ACE",
    "H-02", "H-03", "H-04", "H-05", "H-06", "H-07", "H-08", "H-09", "H-10", "H-JACK", "H-KING", "H-QUEEN", "H-ACE",
    "D-02", "D-03", "D-04", "D-05", "D-06", "D-07", "D-08", "D-09", "D-10", "D-JACK", "D-KING", "D-QUEEN", "D-ACE",
    "S-02", "S-03", "S-04", "S-05", "S-06", "S-07", "S-08", "S-09", "S-10", "S-JACK", "S-KING", "S-QUEEN", "S-ACE"];
var final = Distribution(shuffle(deck));
process.stdout.write("player1: " + final.player1 + " \n");
var arr1 = util.Matrix(3, 3);
var k = 0;
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        arr1[i][j] = final.player1[k++];
    }
}
util.MatrixPrint(3, 3, arr1);
console.log("---------------------------------------------------");
process.stdout.write("player2: " + final.player2 + " \n");
var arr2 = util.Matrix(3, 3);
var k = 0;
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        arr2[i][j] = final.player2[k++];
    }
}
util.MatrixPrint(3, 3, arr2);
console.log("---------------------------------------------------");
process.stdout.write("player3: " + final.player3 + " \n");
var arr3 = util.Matrix(3, 3);
var k = 0;
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        arr3[i][j] = final.player3[k++];
    }
}
util.MatrixPrint(3, 3, arr3);
console.log("---------------------------------------------------");
process.stdout.write("player4: " + final.player4 + " \n");
var arr4 = util.Matrix(3, 3);
var k = 0;
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        arr4[i][j] = final.player4[k++];
    }
}
util.MatrixPrint(3, 3, arr4);
console.log("---------------------------------------------------------");
console.log("Player1 after sorting\n" + util.BubbleSortInt(final.player1));
console.log("---------------------------------------------------------");
console.log("Player2 after sorting\n" + util.BubbleSortInt(final.player2));
console.log("---------------------------------------------------------");
console.log("Player3 after sorting\n" + util.BubbleSortInt(final.player3));
console.log("---------------------------------------------------------");
console.log("Player4 after sorting\n" + util.BubbleSortInt(final.player4));
