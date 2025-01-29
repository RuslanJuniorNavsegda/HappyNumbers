const N = 4; // Число для умножения
let currentNumber = 1;
const examplesDiv = $("#examples");
const blocksContainer = $("#blocks-container");
const userInput = $("#user-answer");
const checkButton = $("#check-button");

function updateExample() {
  const newExample = $(`
        <div class="example-row">
          <div>${N} × ${currentNumber} = <input type="number" class="answer-input" data-number="${currentNumber}"></div>
          <div class="block-row" id="blocks-${currentNumber}"></div>
        </div>
      `);
  examplesDiv.append(newExample);
  $(".answer-input").last().focus(); // Автофокус на новый инпут

  $(".answer-input").on("input", function () {
    checkButton.prop("disabled", false).addClass("active");
  });

  userInput.val("");
  checkButton.prop("disabled", true).removeClass("active");
}

function addBlocks() {
  const blockRow = $(`#blocks-${currentNumber}`);
  for (let i = 0; i < 4; i++) {
    // Всегда добавляем 4 блока
    const block = $('<div class="block"></div>');
    blockRow.append(block);
  }

  // Через 10ms запускаем анимацию всех одновременно
  setTimeout(() => {
    blockRow.find(".block").addClass("show");
  }, 10);
}

function checkAnswer() {
  const answerInput = $(".answer-input").last();
  const userValue = parseInt(answerInput.val(), 10);
  const correctValue = N * currentNumber;

  if (userValue === correctValue) {
    answerInput.replaceWith(correctValue);
    addBlocks();
    checkButton.addClass("right");

    setTimeout(() => {
      checkButton.removeClass("right");
      currentNumber++;
      updateExample();
    }, 500);
  } else {
    answerInput.addClass("wrong");
    checkButton.addClass("wrong");

    setTimeout(() => {
      answerInput.removeClass("wrong");
      checkButton.removeClass("wrong");
    }, 1000);
  }
}

checkButton.on("click", checkAnswer);
updateExample();
