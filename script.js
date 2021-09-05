const wordbank1 = ["are", "baby", "big", "boot", "bus",
    "come", "dog", "fish", "fox", "good", "here", "is",
    "little", "my", "of", "paint", "pot", "rain", "see",
    "so", "ten", "they", "we", "who", "yes", "all", "as",
    "back", "bird", "box", "by", "cow", "down", "five", "from",
    "got", "hill", "look", "name", "on", "pet", "pup", "red",
    "she", "stay", "that", "this", "wet", "will", "you", "am",
    "at", "ball", "black", "boy", "can", "day", "end", "fly",
    "fun", "green", "inside", "mad", "nine", "orange",
    "pig", "purple", "run", "sing", "stop", "to",
    "what", "with", "zoo", "an", "ate", "be", "blue", "brown",
    "car", "did", "fall", "food", "get", "hat", "in", "jam",
    "no", "out", "pin", "put", "sad", "sit", "sun", "them",
    "top", "where", "work", "and", "away", "bell", "book",
    "bug", "cat", "do", "fan", "for", "go", "he", "into",
    "kite", "mud", "not", "OX", "play", "ran", "say", "six",
    "take", "then", "up", "white", "yellow"];

const wordbank2 = ["do", "to", "today", "of", "said",
    "says", "your", "they", "be", "he", "me", "she", "we",
    "no", "come", "some", "one", "once", "ask", "friend",
    "school", "put", "are", "was", "were", "is", "his", "has",
    "you", "go", "so", "by", "my", "there", "here", "where",
    "love", "push", "pull", "full", "house", "our", "door",
    "poor", "find", "mind", "floor", "because", "kind",
    "behind", "whole", "any", "child", "wild", "most", "both",
    "children", "climb", "only", "old", "many", "clothes",
    "gold", "hold", "told", "every", "great", "break", "steak",
    "busy", "people", "pretty", "beautiful", "after", "fast",
    "last", "past", "father", "class", "water", "again",
    "grass", "pass", "plant", "path", "bath", "hour", "move",
    "prove", "half", "money", "improve", "sugar", "could",
    "would", "sure", "who", "parents", "Christmas", "everybody",
    "even"];

const wordbank3 = ["accident", "actual", "address", "answer",
    "appear", "arrive", "believe", "bicycle", "breath", "breathe",
    "build", "business", "calendar", "caught", "centre", "century",
    "certain", "circle", "complete", "consider", "continue", "decide",
    "describe", "different", "difficult", "disappear", "early",
    "earth", "eighth", "enough", "exercise", "experience",
    "experiment", "extreme", "famous", "favourite", "February",
    "forward", "fruit", "grammar", "group", "guard", "guide", "heard",
    "heart", "height", "history", "imagine", "increase", "important",
    "interest", "island", "knowledge", "learn", "length", "library",
    "material", "medicine", "mention", "minute", "natural", "naughty",
    "notice", "occasion", "often", "opposite", "ordinary", "particular",
    "peculiar", "perhaps", "popular", "position", "possession", "possible",
    "potatoes", "pressure", "probably", "promise", "purpose", "quarter",
    "question", "recent", "regular", "reign", "remember", "sentence",
    "separate", "special", "straight", "strange", "strength", "suppose",
    "surprise", "therefore", "although", "thought", "through", "various",
    "weight", "woman"];

let wordbank = [];

let level = "1";
let word_index = "1";
let word_count = "10";
let score = "0";
let multiple_guesses = false;
let game_ended = false;

let current_word = "hello";

/*global responsiveVoice */

function switcher(sceneToSwitch) {
    let start_scene = document.getElementById("start");
    let level_scene = document.getElementById("level");
    let game_scene = document.getElementById("game");
    let score_scene = document.getElementById("score");

    start_scene.classList.add("hidden");
    level_scene.classList.add("hidden");
    game_scene.classList.add("hidden");
    score_scene.classList.add("hidden");
    document.getElementById("game_modal").classList.add("hidden");

    switch (sceneToSwitch) {
        case "start":
            start_scene.classList.remove("hidden");
            break;
        case "level":
            level_scene.classList.remove("hidden");
            break;
        case "game":
            game_scene.classList.remove("hidden");
            break;
        case "score":
            score_scene.classList.remove("hidden");
            break;
        default:
            start_scene.classList.remove("hidden");
    }

}

//Resets level parameters then loads a new level with the appropriate level wordbank.
function loadGame(lvl) {
    score = 0;
    word_index = 1;
    game_ended = false;

    switch (lvl) {
        case "1":
            level = "1";
            wordbank = wordbank1;
            word_count = 10;
            break;

        case "2":
            level = "2";
            wordbank = wordbank2;
            word_count = 10;
            break;

        case "3":
            level = "3";
            wordbank = wordbank3;
            word_count = 10;
            break;
    }

    getWord();
    switcher('game');
    update_information();
}


function update_information() {
    document.getElementById('game_titles_level').innerHTML = "Level " + level;
    document.getElementById('game_titles_word-index').innerHTML = word_index;
    document.getElementById('game_titles_word-count').innerHTML = word_count;

    document.getElementById('score_title').innerHTML = "Level " + level;
    document.getElementById('score_score').innerHTML = score;
    document.getElementById('score_word-count').innerHTML = word_count;

    document.getElementById('game_debug').innerHTML = current_word;

}

function submit() {
    let value = document.getElementById("game_input_response").value;

    //Checks if value is ONLY alphabet characters
    if (!/[^a-zA-Z]/.test(value)) {
        if (value === current_word) {
            //Iterates the word_index
            word_index = parseInt(word_index) + 1;

            responsiveVoice.speak('correct');
            response("correct");

            //Only adds 1 score if this is the first guess of the word
            if (multiple_guesses === false) {
                score = parseInt(score) + 1;
            }

            //Checks if the word_index has surpassed the amount of words, then ends game
            if (word_index > word_count) {
                game_ended = true;
                switcher("score")
                update_information();
            } else {
                multiple_guesses = false
                setTimeout(() => {
                    getWord();
                }, 2000);
            }
        } else {
            multiple_guesses = true;
            responsiveVoice.speak("incorrect");
            response("incorrect");
            document.getElementById("game_input_response").value = "";
        }
    } else {
        //Shows error message for when there are other characters that arent valid in guess
        response("invalid");
        document.getElementById("game_input_response").value = "";
    }
}

//Controls the feedback text responses
function response(state) {
    let element = document.getElementById('game_feedback_response')

    if (state === "correct") {
        element.classList.remove("red")
        element.classList.add("green")
        element.innerText = "right!"
    } else if (state === "invalid"){
        element.classList.remove("red")
        element.classList.remove("green")
        element.innerText = "make sure you only use letters!"
    } else {
        element.classList.remove("green")
        element.classList.add("red")
        element.innerText = "wrong!"
    }
}

//Calls speech engine
function speak() {
    responsiveVoice.speak(current_word);
}


function getWord() {
    document.getElementById('game_feedback_response').innerHTML = "";
    document.getElementById('game_input_response').value = "";

    //Sets current word to the word with a random index of 0-wordbank.length in wordbank
    current_word = wordbank[Math.floor(Math.random()*wordbank.length)];
    document.getElementById("game_debug").innerHTML = current_word;

    update_information();
    speak();
}

function toggle_modal() {
    let modal = document.getElementById("game_modal");

    if (modal.classList.contains("hidden")) {
        modal.classList.remove("hidden");
    } else {
        modal.classList.add("hidden");
    }
}

function toggle_help() {
    let help = document.getElementById("help");
    let hitbox = document.getElementById("help_hitbox");

    if (help.classList.contains("hidden")) {
        help.classList.remove("hidden");
        hitbox.classList.remove("hidden");
    } else {
        help.classList.add("hidden");
        hitbox.classList.add("hidden");
    }
}

function toggle_debug() {
    let debug = document.getElementById("game_debug");

    if (debug.classList.contains("hidden")) {
        debug.classList.remove("hidden");
    } else {
        debug.classList.add("hidden");
        update_information();
    }
}
