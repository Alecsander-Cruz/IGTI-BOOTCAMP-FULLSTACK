window.addEventListener('load', start);

// global variables

var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

// functions

function start() {
  console.log('Olá, a página foi totalmente carregada!');
  preventFunctionSubmit();
  //
  inputName = document.querySelector('#inputName');
  activateInput();
  render();
}

function preventFunctionSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  //
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      render();
      isEditing = false;
      clearInput();
    }
  }

  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';

    button.addEventListener('click', deleteName);

    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;

      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  // criar ul
  // fazer (n) li's, conforme tamanho de globalNames
  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}