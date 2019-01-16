$("#begin").on("click",function(){
    $("#begin").remove();
    game.loadQuestions(); 
})

$(document).on("click", ".answer-button",function(e){
    game.clicked(e);
})

$(document).on("click", "#reset", function(){
    game.reset();
})

var questions = [{
    question: "What type of guitar did Jimi Hendrix famously play?",
    answers: ["Gibson Les Paul", "Fender Jaguar", "Fender Stratocastor", "Danelectro Stingray"],
    correctAnswer: "Fender Stratocastor",
    image: "assets/images/jimi.gif" 
},{
    question: "What is Americas favorite food?",
    answers: ["Tacos", "Lasagna", "Mac and Cheese", "Hamburgers"],
    correctAnswer: "Tacos",
    image: "assets/images/taco.gif"
},{
    question: "Who is the writer and artist of Calvin and Hobbes?",
    answers: ["Bill Waterson", "Roald Dahl", "Charles Schultz", "Jim Davis"],
    correctAnswer: "Bill Waterson",
    image: "assets/images/calvin.gif"
},{
    question: "Who has won the most Oscars of all time?",
    answers: ["Meryl Streep", "Tom Hanks", "Katherine Hepburn", "Viola Davis"],
    correctAnswer: "Katherine Hepburn",
    image: "assets/images/katherine.gif"
},{
    question: "What country is believed to be where coffee originated from?",
    answers: ["Ethiopia", "Oman", "Italy", "Seattle"],
    correctAnswer: "Ethiopia",
    image:"assets/images/coffee.gif"
},{
    question: "What country did Pho originate from?",
    answers: ["China", "Vietnam", "Los Angeles","India"],
    correctAnswer: "Vietnam",
    image: "assets/images/pho.gif"
},{
    question: "What branch of the US Government has the ability to override the veto of another?",
    answers: ["Legislative", "Executive", "Judicial", "Space Force"],
    correctAnswer: "Legislative",
    image: "assets/images/bill.gif"
},{
    question: "What band wrote the album Marquee Moon?",
    answers: ["Sonic Youth", "Nirvana", "Television", "Butthole Surfers"],
    correctAnswer: "Television",
    image: "assets/images/tv.gif"
},{
    question: "Who plays the guitar solo in The Beatles song While My Guitar Gently Weeps?",
    answers: ["George Harrison", "Eric Clapton", "Paul McCartney", "Eddie Vedder"],
    correctAnswer: "Eric Clapton",
    image: "assets/images/eric.gif"
},{
    question: "What dog breed is famous for not having a bark?",
    answers: ["Basenji", "Poodle", "Beagle", "Rhodesian Ridgeback"],
    correctAnswer: "Basenji",
    image: "assets/images/dog.gif"
}];

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    
    
    countdown: function(){
        game.counter--;
        $("#counter").html(game.counter);
        if(game.counter <= 0){
            console.log("You Have No TIME LEFT!!!");
            game.timeUp();
        }
    },
    
    
    loadQuestions: function(){
        timer = setInterval(game.countdown, 1000);
        $("#subwrapper").html("<h2> Time Remaining: <span id='counter'> 30 </span> </h2>");
        $("#subwrapper").append("<h2>" + questions[game.currentQuestion].question + "</h2>");
        for(var i=0; i < questions[game.currentQuestion].answers.length; i++){
            $("#subwrapper").append('<button class = "answer-button" id = "button-'+ i + '" data-name= "' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + "</button>");
        }
    },
    
    
    nextQuestion: function(){
        game.counter = 30;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestions();
    },

    
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $("#subwrapper").html("<h2>NO TIME</h2>");
        $("#subwrapper").append("<h3> The Correct Answer Is " + questions[game.currentQuestion].correctAnswer + "</h3>");
        $("#subwrapper").append("<img src= '" + questions[game.currentQuestion].image + "' width='250px'' height='250px' />" );
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }   else{
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    
    
    results: function(){
        clearInterval(timer);
        $("#subwrapper").html("<h2> Finished!!! </h2>");
        $("#subwrapper").append("<h3>Correct: " + game.correct+ "</h3>");
        $("#subwrapper").append("<h3>Incorrect: " + game.incorrect+ "</h3>");
        $("#subwrapper").append("<h3>Unanswered: " + game.unanswered+ "</h3>");
        $("#subwrapper").append("<button id=reset> RESET</button>");

    },
    
    
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answerCorrect();
        } else{
            game.answerIncorrect();
        }
    },
    
    
    answerCorrect: function(){
        console.log("You got it!!!");
        clearInterval(timer);
        game.correct++;
        $("#subwrapper").html("<h2>You Guessed Wisely</h2>");
        $("#subwrapper").append("<img src= '" + questions[game.currentQuestion].image + "' width='250px'' height='250px' />" );
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }   else{
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    
    
    answerIncorrect: function(){
        console.log("You Failed!!!");
        clearInterval(timer);
        game.incorrect++;
        $("#subwrapper").html("<h2>You Guessed Poorly</h2>");
        $("#subwrapper").append("<h3> The Correct Answer Is " + questions[game.currentQuestion].correctAnswer + "</h3>");
        $("#subwrapper").append("<img src= '" + questions[game.currentQuestion].image + "' width='250px'' height='250px' />" );
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }   else{
            setTimeout(game.nextQuestion, 3*1000);
        }
    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestions();
    },

}