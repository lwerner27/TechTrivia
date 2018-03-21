$(document).ready(function() {
    let randomNum;
    let currentQuestion;
    const url = "https://opentdb.com/api.php?amount=10&category=18&type=multiple"
    let prompt = $("#prompt")
    let answerRow = $("#answer-row")

    $("#next-button-row").hide()
    // Function Declarations
    function playGame() {
        $.ajax({
            url: url,
            method: "GET"
        }).then(function (result) {
            currentQuestion = result.results[0]
            console.log(currentQuestion)
            $("#start-button").remove()
            
            prompt.html(currentQuestion.question)
            
            let answer1 = $("<div>").attr("class", "col s12 m3")
            let answer2 = $("<div>").attr("class", "col s12 m3")
            let answer3 = $("<div>").attr("class", "col s12 m3")
            let answer4 = $("<div>").attr("class", "col s12 m3")

            let answersArr = [answer1, answer2, answer3, answer4]

            let optionsArr = [currentQuestion.correct_answer, currentQuestion.incorrect_answers[0], currentQuestion.incorrect_answers[1], currentQuestion.incorrect_answers[2]]

            for (let i = 0; i < 4; i++) {
                let newButton = $("<a>")
                newButton.attr("class", "waves-effect waves-light btn center answer-button")

                randomNum = Math.floor(Math.random() * answersArr.length)
                newButton.html(optionsArr[randomNum])
                optionsArr.splice(randomNum, 1)


                randomNum = Math.floor(Math.random() * answersArr.length)
                answersArr[randomNum].append(newButton)
                answersArr.splice(randomNum, 1)
            }

            answerRow.append(answer1)
            answerRow.append(answer2)
            answerRow.append(answer3)
            answerRow.append(answer4)

            $(document).on("click", ".answer-button", function () {
                if (this.text === currentQuestion.correct_answer) {
                    prompt.text("Correct!")
                    answerRow.hide()
                    $("#next-button-row").show()
                } else {
                    prompt.html(`Incorrect, the correct answer is: ${currentQuestion.correct_answer}`)
                    answerRow.hide()
                    $("#next-button-row").show()
                }
                

            })
              
        })
    }




    // On Click Listeners
    $("#start-button").on('click', function () {
        playGame()
    })

    $(document).on("click", "#next-button", function () {
        answerRow.empty()
        $("#next-button-row").hide()
        answerRow.show()
        playGame()
    })
})

