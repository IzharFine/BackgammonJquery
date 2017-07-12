var sPlayer = null;
var sParent = "tri";
var sCube1 = null;
var sCube2 = null;
var pTurn = 0;
var isDbl = 0;
var dblVal = 0;
var bOut = 0;
var wOut = 0;
var timeCount = 0;


$(document).ready(init);

function init() {
    createTriangulars();
    var p1Names = prompt("Enter white player name:");
    var p2Names = prompt("Enter black player name:");
    if (p1Names == "")
        p1Names = "White";
    if (p2Names == "")
        p2Names = "Black";
    p1Name.innerHTML = p1Names;
    p2Name.innerHTML = p2Names;
    p1Score.innerHTML = 15-wOut;
    p2Score.innerHTML = 15-bOut;
    myVar = setInterval(myTimer, 1000);
    $('.bP').hover(hoverMovesIn, hoverMovesOut);
    $('.wP').hover(hoverMovesIn, hoverMovesOut);
}

$(document).on('click', "#cube1", dropCubes);
$(document).on('click', "#cube2", dropCubes);
$(document).on('click', ".wP", selectedPlayer);
$(document).on('click', ".bP", selectedPlayer);
$(document).on('dblclick', ".wP", isFinish);
$(document).on('dblclick', ".bP", isFinish);
$(document).on('click', ".rTriangular", checkCubeMove);
$(document).on('click', "#SkipTurn", skipTurn);
$(document).on('click', "#newGame", newGame);



function myTimer() {
    document.getElementById("timer").innerHTML = "Timer: <br>" + timeCount++;
}


function dropCubes() {
    if (sCube1 == null && sCube2 == null) {
        $("#cube1").css("background-color", "white");
        $("#cube2").css("background-color", "white");
        cube1.innerHTML = Math.ceil(Math.random() * 6);
        cube2.innerHTML = Math.ceil(Math.random() * 6);
        sCube1 = cube1.innerHTML;
        sCube2 = cube2.innerHTML;
        if (sCube1 == sCube2) {
            isDbl = 1;
            dblVal = sCube1;
        }
        checkIfBlocked();
        if (bFlag === 0) {
            skipTurn();
            alert("No moves allowed.");
            return;
        }
        //bFlag = 0;
    }
}

function checkIfBlocked()
{
    bFlag = 0;
    if (pTurn % 2 == 0) { // WP
        $("#p2Name").css("background-color", "#783c12");
        $("#p1Name").css("background-color", "yellow");
        if ($('#zevel>.wP').length != 0) {
            if (!($("#tri" + (sCube1 - 1) + ">.bP").length > 1 && $("#tri" + (sCube2 - 1) + ">.bP").length > 1)) {
                bFlag = 1;
            }
        }
        else {
            for (var i = 0; i < 24; i++) {
                if ($("#tri" + i + ">.wP").length != 0) {
                    if (sCube1 != null)
                    {
                        if ($("#tri" + (sCube1 * 1 + i) + ">.bP").length < 2)
                        {
                            bFlag=1;
                            break;
                        }

                    }
                    if (sCube2 != null)
                    {
                        if($("#tri" + (sCube2 * 1 + i) + ">.bP").length < 2)
                        {
                            bFlag = 1;
                            break;
                        }
                    }
                }
            }
        }
    }
    else { // BP
        $("#p1Name").css("background-color", "#783c12");
        $("#p2Name").css("background-color", "yellow");
        if ($('#zevel>.bP').length != 0) {
            if (!($("#tri" + (24 - sCube1) + ">.wP").length > 1 && $("#tri" + (24 - sCube2) + ">.wP").length > 1)) {
                bFlag = 1;
            }
        }
        else {
            for (var i = 0; i < 24; i++) {
                if ($("#tri" + i + ">.bP").length != 0) {
                        if (sCube1 != null)
                        {
                            if($("#tri" + (i - sCube1) + ">.wP").length < 2)
                            {
                                bFlag = 1;
                                break;
                            }
                        }
                        if (sCube2 != null) {
                            if($("#tri" + (i - sCube2) + ">.wP").length < 2)
                            {
                                bFlag = 1;
                                break;
                            }
                        }                 
                }
            }
        }
    }
}

function createTriangulars() {
    var trCounter = 0;
    for (var i = 0; i < 12; i++) {
        newDiv = document.createElement("div");
        newDiv.className = "rTriangular";
        newDiv.id = "tri" + trCounter; //
        if (trCounter % 2 == 1)
            newDiv.style.borderTop = "200px solid white";
        trCounter++;
        $("#board").append(newDiv);
    }
    trCounter = 23;
    for (var i = 0; i < 12; i++) {
        newDiv = document.createElement("div");
        newDiv.style.borderTop = "0px";
        newDiv.style.borderBottom = "200px solid #f00";
        newDiv.style.top = "112px";
        newDiv.className = "rTriangular";
        newDiv.id = "tri" + trCounter; //
        if (trCounter % 2 == 1) {
            newDiv.style.borderBottom = "200px solid white";
        }
        trCounter--;
        $("#board").append(newDiv);
    }
    createPlayers();
}

function createPlayers() {
    for (var i = 0; i < 2; i++) {
        putPlayer("wP", "#tri0");
        putPlayer("bP", "#tri23");
    }
    for (var i = 0; i < 5; i++) {
        putPlayer("bP", "#tri5");
        putPlayer("wP", "#tri18");
    }
    for (var i = 0; i < 3; i++) {
        putPlayer("bP", "#tri7");
        putPlayer("wP", "#tri16");
    }
    for (var i = 0; i < 5; i++) {
        putPlayer("wP", "#tri11");
        putPlayer("bP", "#tri12");
    }
}

function putPlayer(pColor, place) {
    var newP = document.createElement("div");
    newP.className = pColor;
    if (place.substring(4, place.length) > 11) {
        newP.style.margin = "169px -15px auto";
        if ($(place).children().length == 0) {
            $(place).append(newP);
        }
        else {
            var newMar = parseInt($(place).children().last().css("margin").split("px")[0]) - 34;
            newP.style.margin = newMar + "px -15px auto";
            $(place).append(newP);
        }
    }
    else {
        if ($(place).children().length == 0) {
            $(place).append(newP);
        }
        else {
            var newMar = parseInt($(place).children().last().css("margin").split("px")[0]) + 34;
            newP.style.margin = newMar + "px -15px auto";
            $(place).append(newP);
        }
    }
}

function selectedPlayer() {
    sParent = $(this).parent().attr('id');
    sPlayer = $(this).parent().children("." + this.className).last();
    if (pTurn % 2 == 0) {
        if ($('#zevel>.wP').length != 0 && (sCube1 != null || sCube2 != null)) {
            if (sParent != 'zevel')
                alert("You need to take out your eaten players first.");
        }
    }
    else {
        if ($('#zevel>.bP').length != 0 && (sCube1 != null || sCube2 != null)) {
            if (sParent != 'zevel')
                alert("You need to take out your eaten players first.");
        }
    }
}

function checkCubeMove() {
    var checkExectMove1 = this.id.substring(3, this.id.length);
    var checkExectMove2 = sParent.substring(3, sParent.length);
    if (sPlayer != null && (sCube1 != null || sCube2 != null)) {
        if (pTurn % 2 == 0) {
            if (sPlayer[0].className == "wP") {
                if ($('#zevel>.wP').length != 0) {
                    if (checkExectMove1 == sCube1 - 1 && sPlayer[0].parentNode.id == "zevel") {
                        moveToTri(this, sCube1);
                        return;
                    }
                    else if (checkExectMove1 == sCube2 - 1 && sPlayer[0].parentNode.id == "zevel") {
                        moveToTri(this, sCube2);
                        return;
                    }
                    else {
                        return;
                    }
                }
                if (parseInt(checkExectMove1) - parseInt(sCube1) == parseInt(checkExectMove2)) {
                    moveToTri(this, sCube1);
                }
                else if (parseInt(checkExectMove1) - parseInt(sCube2) == parseInt(checkExectMove2)) {
                    moveToTri(this, sCube2);
                }
            }
        }
        else {
            if (sPlayer[0].className == "bP") {
                if ($('#zevel>.bP').length != 0) {
                    if (checkExectMove1 == (24 - sCube1) && sPlayer[0].parentNode.id == "zevel") {
                        moveToTri(this, sCube1);
                        return;
                    }
                    else if (checkExectMove1 == (24 - sCube2) && sPlayer[0].parentNode.id == "zevel") {
                        moveToTri(this, sCube2);
                        return;
                    }
                    else {
                        return;
                    }
                }
                if (parseInt(checkExectMove1) + parseInt(sCube1) == parseInt(checkExectMove2)) {
                    moveToTri(this, sCube1);
                }
                else if (parseInt(checkExectMove1) + parseInt(sCube2) == parseInt(checkExectMove2)) {
                    moveToTri(this, sCube2);
                }
            }
        }

    }
}

function moveToTri(This, sC) {
    if (sPlayer != null && $(This).children().length == 1) {
        if ($(This).children().last().attr('class') != sPlayer[0].className) {
            if ($("#zevel").children().length == 0) {
                $("#zevel").append($(This).children().last());
                $("#zevel").children().last().css("margin", "-200px -15px auto");
            }
            else {
                var newMar = parseInt($("#zevel").children().last().css("margin").split("px")[0]) + 34;
                $(This).children().last().css("margin", newMar + "px -15px auto");
                $("#zevel").append($(This).children().last());
            }
        }
    }
    else if ($(This).children().length > 1) {
        if ($(This).children().last().attr('class') != sPlayer[0].className) {
            return;
        }
    }
    if (sPlayer != null) {
        if (This.id.substring(3, This.id.length) > 11) {
            sPlayer[0].style.margin = "169px -15px auto";
            if ($(This).children().length == 0) {
                yellowRemove();
                $(This).append(sPlayer);
            }
            else {
                if ($(This).children().length < 6) {
                    yellowRemove();
                    var newMar = parseInt($(This).children().last().css("margin").split("px")[0]) - 34;
                    sPlayer[0].style.margin = newMar + "px -15px auto";
                    $(This).append(sPlayer);
                }
                else if ($(This).children().length % 6 == 0) {
                    sPlayer[0].style.backgroundColor = "yellow";
                    $(This).append(sPlayer);
                }
                else {
                    var newMar = parseInt($(This).children().last().css("margin").split("px")[0]) - 34;
                    sPlayer[0].style.backgroundColor = "yellow";
                    sPlayer[0].style.margin = newMar + "px -15px auto";
                    $(This).append(sPlayer);
                }
            }
        }
        else {
            sPlayer[0].style.margin = "-200px -15px auto";
            if ($(This).children().length == 0) {
                yellowRemove();
                $(This).append(sPlayer);
            }
            else {
                if ($(This).children().length < 6) {
                    yellowRemove();
                    var newMar = parseInt($(This).children().last().css("margin").split("px")[0]) + 34;
                    sPlayer[0].style.margin = newMar + "px -15px auto";
                    $(This).append(sPlayer);
                }
                else if ($(This).children().length % 6 == 0) {
                    sPlayer[0].style.backgroundColor = "yellow";
                    $(This).append(sPlayer);
                }
                else {
                    var newMar = parseInt($(This).children().last().css("margin").split("px")[0]) + 34;
                    sPlayer[0].style.backgroundColor = "yellow";
                    sPlayer[0].style.margin = newMar + "px -15px auto";
                    $(This).append(sPlayer);
                }
            }
        }
        sPlayer = null;
        if (sC == sCube1) {
            sCube1 = null;
            if (isDbl == 0)
                $("#cube1").css("background-color", "red");
            else
                $("#cube1").css("background-color", "yellow");
        }
        else {
            sCube2 = null;
            if (isDbl == 0)
                $("#cube2").css("background-color", "red");
            else
                $("#cube2").css("background-color", "yellow");
        }
        if (sCube1 == null && sCube2 == null) {
            if (isDbl == 1) {
                sCube1 = dblVal;
                sCube2 = dblVal;
                isDbl = 0;
            }
            else {
                if (pTurn % 2 == 0) {
                    $("#p1Name").css("background-color", "red");
                }
                else {
                    $("#p2Name").css("background-color", "red");
                }
                pTurn++;

            }
        }
        if (sCube1 != null || sCube2 != null) {
            checkIfBlocked();
            if (bFlag === 0) {
                skipTurn();
                alert("No more moves allowed.");
            }
        }
       
    }
}


function isFinish() {
    var rangeCheck = parseInt($(this).parent().attr('id').substring(3, $(this).parent().attr('id').length));
    if ($(this).attr('class') == "wP") {
        var wCount = 0;
        for (var i = 23; i > 17; i--) {
            wCount += $("#tri" + i + ">.wP").length;
        }
        if (wCount + wOut != 15)
            return;
        if (parseInt(sCube2) > parseInt(sCube1)) {
            if (rangeCheck + parseInt(sCube1) >= 24) {
                sCube1 = null;
                if (isDbl == 1) {
                    $("#cube1").css("background-color", "yellow");
                }
                else
                    $("#cube1").css("background-color", "red");
            }
            else if (rangeCheck + parseInt(sCube2) >= 24) {
                sCube2 = null;
                if (isDbl == 1) {
                    $("#cube2").css("background-color", "yellow");
                }
                else
                    $("#cube2").css("background-color", "red");
            }
            else {
                return;
            }
        }
        else
        {
            if (rangeCheck + parseInt(sCube2) >= 24) {
                sCube2 = null;
                if (isDbl == 1) {
                    $("#cube2").css("background-color", "yellow");
                }
                else
                    $("#cube2").css("background-color", "red");
            }
            else if (rangeCheck + parseInt(sCube1) >= 24) {
                sCube1 = null;
                if (isDbl == 1) {
                    $("#cube1").css("background-color", "yellow");
                }
                else
                    $("#cube1").css("background-color", "red");
            }
            else {
                return;
            }
        }
        $(this).parent().children().last().remove();
        wOut++;
        p1Score.innerHTML = 15 - wOut;
        if (wOut == 15) {
            if (bOut == 0) {
                alert(p1Name.innerHTML + " won by mars torki the game!");
            }
            else
                alert(p1Name.innerHTML + "  won the game!");
            clearInterval(myVar);
            return;
        }
        else if (sCube1 == null && sCube2 == null) {
            if (isDbl == 1) {
                sCube1 = dblVal;
                sCube2 = dblVal;
                isDbl = 0;
            }
            else
                pTurn++;
        }
        wCount = 0;
    }
    else {
        var wCount = 0;
        for (var i = 0; i < 6; i++) {
            wCount += $("#tri" + i + ">.bP").length;
        }
        if (wCount + bOut != 15)
            return;
        if (parseInt(sCube2) > parseInt(sCube1)) {
            if (rangeCheck - sCube1 < 0) {
                sCube1 = null;
                if (isDbl == 1) {
                    $("#cube1").css("background-color", "yellow");
                }
                else
                    $("#cube1").css("background-color", "red");
            }
            else if (rangeCheck - sCube2 < 0) {
                sCube2 = null;
                if (isDbl == 1) {
                    $("#cube2").css("background-color", "yellow");
                }
                else
                    $("#cube2").css("background-color", "red");
            }
            else {
                return;
            }
        }
        else
        {
            if (rangeCheck - sCube2 < 0) {
                sCube2 = null;
                if (isDbl == 1) {
                    $("#cube2").css("background-color", "yellow");
                }
                else
                    $("#cube2").css("background-color", "red");
            }
            else if (rangeCheck - sCube1 < 0) {
                sCube1 = null;
                if (isDbl == 1) {
                    $("#cube1").css("background-color", "yellow");
                }
                else
                    $("#cube1").css("background-color", "red");
            }
            else {
                return;
            }
        }
        $(this).parent().children().last().remove();
        bOut++;
        p2Score.innerHTML = 15 - bOut;
        if (bOut == 15) {
            if (wOut == 0) {
                alert(p2Name.innerHTML + " won by mars torki the game!");
            }
            else
                alert(p2Name.innerHTML + " won the game!");
            clearInterval(myVar);
            return;
        }
        else if (sCube1 == null && sCube2 == null) {
            if (isDbl == 1) {
                sCube1 = dblVal;
                sCube2 = dblVal;
                isDbl = 0;
            }
            else
                pTurn++;
        }
        wCount = 0;
    }
}

function skipTurn() {
    isDbl = 0;
    sCube1 = null;
    sCube2 = null;
    if (pTurn % 2 == 0) {
        $("#p1Name").css("background-color", "red");
    }
    else {
        $("#p2Name").css("background-color", "red");
    }
    pTurn++;
}

function newGame() {
    location.reload();
}

function yellowRemove() {
    if (sPlayer[0].style.backgroundColor == "yellow") {
        if (sPlayer[0].className == 'wP')
            sPlayer[0].style.backgroundColor = "white";
        else
            sPlayer[0].style.backgroundColor = "black";
    }
}

function hoverMovesIn() {
    var exectSpot = ($(this).parent().attr('id').split('tri')[1]);
    if (pTurn % 2 != 0) {
        if ($(this).attr('class') == 'bP') {
            if ($('#zevel>.bP').length != 0) {
                if ($(this).parent().attr('id') != 'zevel') {
                    return;
                }
                if (sCube1 != null)
                    if ($('#tri' + (24 - sCube1) + '>.wP').length <= 1)
                        ($('#tri' + (24 - sCube1)).css('backgroundColor', 'green'));
                if (sCube2 != null)
                    if ($('#tri' + (24 - sCube2) + '>.wP').length <= 1)
                        ($('#tri' + (24 - sCube2)).css('backgroundColor', 'green'));
            }
            else {
                if (sCube1 != null)
                    if ($('#tri' + (exectSpot - sCube1) + '>.wP').length <= 1)
                        ($('#tri' + (exectSpot - sCube1)).css('backgroundColor', 'green'));
                if (sCube2 != null)
                    if ($('#tri' + (exectSpot - sCube2) + '>.wP').length <= 1)
                        ($('#tri' + (exectSpot - sCube2)).css('backgroundColor', 'green'));
            }
        }
    }
    else {
        if ($(this).attr('class') == 'wP') {
            if ($('#zevel>.wP').length != 0) {
                if ($(this).parent().attr('id') != 'zevel') {
                    return;
                }
                if (sCube1 != null)
                    if ($('#tri' + (sCube1 - 1) + '>.bP').length <= 1)
                        ($('#tri' + (sCube1 - 1)).css('backgroundColor', 'green'));
                if (sCube2 != null)
                    if ($('#tri' + (sCube2 - 1) + '>.bP').length <= 1)
                        ($('#tri' + (sCube2 - 1)).css('backgroundColor', 'green'));
            }
            else {
                if (sCube1 != null)
                    if ($('#tri' + parseInt(parseInt(exectSpot) + parseInt(sCube1)) + '>.bP').length <= 1)
                        ($('#tri' + parseInt(parseInt(exectSpot) + parseInt(sCube1))).css('backgroundColor', 'green'));
                if (sCube2 != null)
                    if ($('#tri' + parseInt(parseInt(exectSpot) + parseInt(sCube2)) + '>.bP').length <= 1)
                        ($('#tri' + parseInt(parseInt(exectSpot) + parseInt(sCube2))).css('backgroundColor', 'green'));
            }
        }
    }
}

function hoverMovesOut() {
    var exectSpot = ($(this).parent().attr('id').split('tri')[1]);
    if ($(this).attr('class') == 'bP') {
        ($('#tri' + (exectSpot - sCube1)).css('backgroundColor', ''));
        ($('#tri' + (exectSpot - sCube2)).css('backgroundColor', ''));
        ($('#tri' + (24 - sCube1)).css('backgroundColor', ''));
        ($('#tri' + (24 - sCube2)).css('backgroundColor', ''));
    }
    else {
        ($('#tri' + parseInt(parseInt(exectSpot) + parseInt(sCube1))).css('backgroundColor', ''));
        ($('#tri' + parseInt(parseInt(exectSpot) + parseInt(sCube2))).css('backgroundColor', ''));
        ($('#tri' + (sCube1 - 1)).css('backgroundColor', ''));
        ($('#tri' + (sCube2 - 1)).css('backgroundColor', ''));
    }
}