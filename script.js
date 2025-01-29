const N = 4;
let currentNumber = 1;
const examplesDiv = $("#examples");
const blocksContainer = $("#blocks-container");
const checkButton = $("#check-button");

function updateExample() {
  const newExample = $(`
          <div class="example-row">
            <div>${N} × ${currentNumber} = <input type="number" class="answer-input" data-number="${currentNumber}"></div>
          </div>
        `);
  examplesDiv.append(newExample);
  $(".answer-input").last().focus();

  $(".answer-input").on("input", function () {
    checkButton
      .prop("disabled", false)
      .removeClass("right wrong")
      .addClass("active");
  });

  checkButton.prop("disabled", true).removeClass("active right wrong");
}

function addBlocks() {
  const blockRow = $('<div class="block-row"></div>');
  for (let i = 0; i < 4; i++) {
    const block = $('<div class="block"></div>');
    blockRow.append(block);
  }
  blocksContainer.append(blockRow);

  setTimeout(() => {
    blockRow.find(".block").addClass("show");
  }, 10);
}

function checkAnswer() {
  const answerInput = $(".answer-input").last();
  const userValue = parseInt(answerInput.val(), 10);
  const correctValue = N * currentNumber;

  checkButton.removeClass("active");

  if (userValue === correctValue) {
    answerInput.replaceWith(correctValue);
    addBlocks();
    checkButton.addClass("right");

    setTimeout(() => {
      checkButton.removeClass("right");
      currentNumber++;
      updateExample();
    }, 1000);
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
