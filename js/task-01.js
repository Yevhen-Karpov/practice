const input = document.querySelector("input");
const button = document.querySelector("button");
const targetOutput = document.querySelector("#letters");

const stringArr = [];
const state = {
  elementX: 0,
  elementY: 0,
  clicked: false,
  position: -1,
  index: -1,
};

//we create string with random letters

button.addEventListener("click", () => {
  stringArr.splice(0);
  const str = input.value.split("");
  createString(str);
  input.value = "";
});

function createString(str) {
  targetOutput.innerHTML = "";
  for (let i = 0; i < str.length; i++) {
    const div = document.createElement("div");
    div.key = i;
    div.innerText = str[i];
    div.draggable = true;
    div.classList.add("letter");
    div.style.cursor = "grab";
    stringArr.push(div);
    targetOutput.append(...stringArr);
  }
}

// this event listener is for changingin the position of the letter

document.addEventListener("mousemove", ({ pageX, pageY }) => {
  if (state.clicked && state.index >= 0) {
    stringArr[state.index].style.position = "fixed";
    stringArr[state.index].style.top = `${pageY + 10}px`;
    stringArr[state.index].style.left = `${pageX}px`;
  }
});

// this event lister is to find out which letter under the cursor

targetOutput.addEventListener("mouseover", (e) => {
  const elem = e.target;
  state.position = stringArr.indexOf(elem);
});

//this event listener turns off dragging and sets the new position of the letter if we click on the string of letters

document.addEventListener("click", (e) => {
  if (state.clicked && !e.target.classList.contains("letter")) {
    state.clicked = false;
  }

  if (
    e.path.find((el) => el.id === "letters") &&
    state.index >= 0 &&
    !state.clicked
  ) {
    const current = [...targetOutput.children][state.index];
    const sibling = [...targetOutput.children][state.position];

    if (current && sibling) {
      stringArr[state.index] = sibling.cloneNode(true);
      stringArr[state.position] = current.cloneNode(true);
      stringArr[state.index].key = state.index;
      stringArr[state.position].key = state.position;
      stringArr[state.position].style.position = "fixed";
      stringArr[state.position].style.top = `${state.elementY}px`;
      stringArr[state.position].style.left = `${e.pageX}px`;
      stringArr[state.position].style.position = "static";
    }

    [...targetOutput.children].forEach((el) => el.remove());
    targetOutput.append(...stringArr);
  }
  [...targetOutput.children].forEach((el) => {
    el.removeEventListener("click", () => {});
    el.addEventListener("click", handleClick);
  });
});

const handleClick = (e) => {
  if (!state.clicked) {
    state.elementX = e.target.offsetX;
    state.elementY = e.target.offsetY;

    state.clicked = true;
    console.log(e.target.key, "key", e.target.innerHTML);
    state.index = e.target.key;
  } else state.clicked = false;
};
