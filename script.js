let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newBtn = document.querySelector('#new-btn');
let msgcontainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turn0 = true;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

for (let box of boxes) {
    box.addEventListener('click', () => {

        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
            box.classList.add('xcolor');
        }

        box.disabled = true;
        checkwinner();
    });
}

function showwinner(winner) {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    disabledbox();
    msgcontainer.classList.remove("hide");
    resetBtn.classList.add("hide");
}

function disabledbox() {
    for (box of boxes) {
        box.disabled = true;
    }
}

function enablebox() {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove('xcolor');
        box.classList.remove('winner-box');
    }
}
function resetgame() {
    turn0 = true;
    enablebox();
    msgcontainer.classList.add('hide');
    resetBtn.classList.remove('hide')
}
function showDraw() {
    msg.innerText = "Match Draw";
    msgcontainer.classList.remove("hide");
    resetBtn.classList.add("hide");
}

resetBtn.addEventListener('click', resetgame);
newBtn.addEventListener('click', resetgame);


function checkwinner() {
    let winnerFound = false;

    for (let pattern of winpatterns) {
        let post1value = boxes[pattern[0]].innerText;
        let post2value = boxes[pattern[1]].innerText;
        let post3value = boxes[pattern[2]].innerText;

        if (post1value !== "" && post2value !== "" && post3value !== "") {

            if (post1value === post2value && post2value === post3value) {

                winnerFound = true;

                showwinner(post1value);

                boxes[pattern[0]].classList.add("winner-box");
                boxes[pattern[1]].classList.add("winner-box");
                boxes[pattern[2]].classList.add("winner-box");

                return;
            }
        }
    }
    if (!winnerFound) {
        let allFilled = true;

        for (let box of boxes) {
            if (box.innerText === "") {
                allFilled = false;
                break;
            }
        }

        if (allFilled) {
            showDraw();
        }
    }
}

