$(document).ready(function () {
    var timer = document.getElementById('timer');
    var secondsLeft;
    var questionNumber = 0;
    var rightCount = 0;
    var wrongCount = 0;
    var countdown;
    var qnA = [
        ['Which Final Fantasy featured Cloud Strife?',
            'FFIX', 'FFVIII', 'FFVII', 'FFVI', 3
        ],

        ['What was the latest Final Fantasy game?',
            'Final Fantasy Brave Exvius', 'Kingdom Hearts 3', 'FF Type-0', 'FFXV', 4
        ],

        ['Who was the villain of Final Fantasy VI?',
            'Sephiroth', 'Ultima', 'Kefka', 'Arden Izunia', 3
        ],

        ['Which of these is not a Final Fantasy movie?',
            'Kingsglaive', 'Advent Children', 'Spirits Within', 'Lightning Returns', 4
        ],

        ['Chocobos first appeared in what game?',
            'FFI', 'FFII', 'FFIII', 'FF Adventures', 2
        ]
    ];

    // Start the timer
    function timerStart() {
        countdown = setInterval(function () {
            secondsLeft--;
            timer.textContent = secondsLeft;

            //When timer hits zero, show Times Up!
            if (secondsLeft <= 0) {
                clearInterval(countdown);
                $("#aContainer").empty();
                $("#question").html("Times Up!<br>" + "The answer was:<br>" +
                    qnA[questionNumber]
                    [qnA[questionNumber]
                        [qnA[questionNumber].length - 1]
                    ]);
                console.log("Times Up!");
                postQ();
                wrongCount++
            }
        }, 1000);
    };

    // Display question based on numberQuestion int
    function nextQuestion(number) {
        $("#start").empty();
        $('#question').html('<p>' + qnA[number][0] + "</p>");
        for (var i = 1; i < (qnA[number].length - 1); i++) {
            var newQ = $("<li>");
            $(newQ).attr("class", "choice");
            $(newQ).attr("value", i);
            var j = String.fromCharCode(65 + i - 1);
            newQ.html("<p>" + j + ': ' + qnA[number][i] + "</p>");
            $("#aContainer").append(newQ);
            console.log("q added");
        }
    };

    // Reset timer
    function timerReset() {
        secondsLeft = 15;
        timer.textContent = secondsLeft;
    };

    // Start question game
    function startGame() {
        $("#start").css("border", "none");
        $("#start").css("margin-top", "0");
        $("#start").empty();
        timerReset();
        timerStart();
        if (questionNumber < qnA.length) {
            nextQuestion(questionNumber);
        }
        console.log("Q: " + questionNumber + ", A: " + qnA[questionNumber][qnA[questionNumber].length - 1]);
        console.log("start");
    };

    // Return true is user choice is correct, and vice versa
    function checkAnswer(choice, answer) {
        if (choice == answer) {
            return true;
        } else {
            return false;
        }
    };

    // Displays what the answer was
    function answer() {
        $("#aContainer").empty();
        $("#question").html("The answer was:<br>" +
            (qnA[questionNumber]
                [qnA[questionNumber]
                    [qnA[questionNumber].length - 1]
                ]));
        clearInterval(countdown);
    };

    // Displays whether user got answer correct or wrong
    function postQ() {
        questionNumber++
        if (questionNumber == qnA.length) {
            setTimeout(results, 3000);
        } else {
            setTimeout(startGame, 3000);
        }
    };

    function results() {
        questionNumber = 0;
        timerReset();
        $("#aContainer").empty();
        $("#question").html("You got " + rightCount + " correct and " + wrongCount + " wrong!")
        $("#start").text("Start Over?").css("border", ".2em ridge white",
            "border-radius", "5px");
        rightCount = 0;
        wrongCount = 0;
    };

    $("#start").click(function () {
        startGame();
    });

    $("#aContainer").on("click", ".choice", function () {
        console.log("clicked: " + this.value);
        var check = checkAnswer(this.value, qnA[questionNumber][qnA[questionNumber].length - 1]);
        if (check == true) {
            answer();
            rightCount++
            $("#question").prepend("<div style='font-size: 2em;'>Correct!<br></div>");
            postQ();
        } else {
            answer();
            wrongCount++;
            $("#question").prepend("<div style='font-size: 2em;'>Wrong!<br></div>");
            postQ();
        }
    });

});