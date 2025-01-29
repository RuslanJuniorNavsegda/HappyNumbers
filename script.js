const N = 4;
let currentNumber = 1;
const examplesDiv = $("#examples");
const blocksContainer = $("#blocks-container");
const checkButton = $("#check-button");

function updateExample() {
  const newExample = $(`
                <div class="example-row">
                    <div>${N} × ${currentNumber} = 
                        <input type="number" 
                               class="answer-input" 
                               data-number="${currentNumber}">
                    </div>
                </div>
            `);

  examplesDiv.append(newExample);
  setTimeout(() => {
    newExample.css("opacity", 1);
  }, 10);

  $(".answer-input").last().focus();

  $(".answer-input").on("input", function () {
    const isValid = !!this.value && !isNaN(this.value);
    checkButton.prop("disabled", !isValid).toggleClass("active", isValid);
  });
}

function addBlocks() {
  const blockRow = $('<div class="block-row"></div>');
  for (let i = 0; i < 4; i++) {
    const block = $('<div class="block"></div>');
    blockRow.append(block);
  }
  blocksContainer.append(blockRow);

  setTimeout(() => {
    blockRow.css({
      opacity: 1,
      transform: "translateY(0)",
    });
  }, 10);
}

function checkAnswer() {
  const answerInput = $(".answer-input").last();
  const userValue = parseInt(answerInput.val(), 10);
  const correctValue = N * currentNumber;

  if (userValue === correctValue) {
    answerInput.replaceWith(`<span>${correctValue}</span>`);
    checkButton.addClass("right");
    addBlocks();

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
