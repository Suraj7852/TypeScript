"use strict";
var fs = require("fs");
var input = require("readline-sync");
var util = /** @class */ (function () {
    function util() {
    }
    util.prototype.ReadFile = function (path) {
        var hold = fs.readFileSync(path, 'utf8');
        hold = JSON.parse(hold);
        return hold;
    };
    util.prototype.WriteJsonFile = function (path, obj) {
        var json = JSON.stringify(obj);
        fs.writeFileSync(path, json);
    };
    util.prototype.removeInArray = function (arr, index) {
        var arr1 = [];
        var k = 0;
        for (var i = 0; i < arr.length; i++) {
            if (i != index)
                arr1[k++] = arr[i];
        }
        return arr1;
    };
    util.prototype.intInput = function () {
        return input.questionInt();
    };
    util.prototype.stringInput = function () {
        while (true) {
            var inp = /[a-zA-Z_]/;
            var out = input.question();
            if (inp.test(out))
                return out;
            else
                console.log("Input valid string, please.");
        }
    };
    util.prototype.Matrix = function (row, col) {
        try {
            if (!isNaN(row) && !isNaN(col)) {
                var Arr = new Array(row);
                for (var i = 0; i < row; i++) {
                    Arr[i] = new Array(col);
                }
                return Arr;
            }
            throw "Enter a valid input";
        }
        catch (error) {
            return error;
        }
    };
    util.prototype.MatrixPrint = function (row, col, arr) {
        try {
            if (arr != null) {
                for (var i = 0; i < row; i++) {
                    for (var j = 0; j < col; j++) {
                        if (arr[i][j] != undefined)
                            process.stdout.write(arr[i][j] + " ");
                        else
                            process.stdout.write("");
                    }
                    console.log("");
                }
            }
            throw "Array should not be empty:";
        }
        catch (error) {
            return error;
        }
    };
    util.prototype.BubbleSortInt = function (arr) {
        try {
            if (arr != null) {
                var temp = 0;
                for (var i = 0; i < arr.length; i++) {
                    for (var j = i + 1; j < arr.length; j++) {
                        if (arr[i] > arr[j]) {
                            temp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = temp;
                        }
                    }
                }
                return arr;
            }
            throw "array is Empty";
        }
        catch (error) {
            return error;
        }
    };
    return util;
}());
var ut = new util();
module.exports = ut;
