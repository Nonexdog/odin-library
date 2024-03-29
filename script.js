const bookDisplay = document.querySelector('.book-display');
const btnBookModal = document.querySelector('#btn-open-modal');
const modalBook = document.querySelector('#modal-book');
const formNewBook = document.forms["new-book"];
const btnCancelModal = formNewBook.elements['modal-cancel'];

const libraryDatabase = [];

function Book(title, author, pages, wasRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.wasRead = wasRead;
}

Book.prototype.info = function() {
  if (this.wasRead) {
    return `${this.title} by ${this.author}, ${this.pages} pages, read.`
  }
  return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`
};

Book.prototype.toggleRead = function() {
  this.wasRead ? this.wasRead = false : this.wasRead = true;
};

function addBookToLibrary(title, author, pages, wasRead) {
  const newBook = new Book(title, author, pages, wasRead);
  libraryDatabase.push(newBook);
}

function toggleBtnReadText(read, button) {
  if (read) {
    button.textContent = 'Read';
  } else {
    button.textContent = 'Not read';
  }
}

function createInfoDiv(book, index) {
  const bookDiv = document.createElement('div');
  const bookInfo = document.createElement('p');
  const btnDiv = document.createElement('div');
  const btnBookRemove = document.createElement('button');
  const btnToggleRead = document.createElement('button');

  btnDiv.classList.add('bookitem-buttons');
  btnBookRemove.textContent = 'Remove';
  btnBookRemove.classList.add('button-remove');
  btnBookRemove.addEventListener('click', () => {
    askForRemove(index);
  })

  if (book.wasRead) {
    btnToggleRead.textContent = 'Read';
  } else {
    btnToggleRead.textContent = 'Not read';
  }
  btnToggleRead.addEventListener('click', () => {
    book.toggleRead();
    toggleBtnReadText(book.wasRead, btnToggleRead);
    bookInfo.textContent = book.info();
  });

  btnDiv.appendChild(btnToggleRead);
  btnDiv.appendChild(btnBookRemove);

  bookInfo.textContent = book.info();
  bookDiv.appendChild(bookInfo);
  bookDiv.appendChild(btnDiv);

  return bookDiv;
}

function createBookElement(book) {
  const bookIndex = libraryDatabase.indexOf(book);
  const bookDiv = document.createElement('div');
  const bookParagraph = document.createElement('p');
  const bookInfoDiv = createInfoDiv(book, bookIndex);
  const btnInfo = document.createElement('button');

  bookParagraph.textContent = book.title;
  bookParagraph.setAttribute('data-index', bookIndex);
  btnInfo.textContent = 'Show info';
  bookDiv.classList.add('bookitem');
  bookInfoDiv.classList.add('hidden');

  btnInfo.addEventListener('click', () => {
    if (bookInfoDiv.classList.contains('hidden')) {
      btnInfo.textContent = 'Hide info';
      bookInfoDiv.classList.replace('hidden', 'info-div');

    } else {
      btnInfo.textContent = 'Show info';
      bookInfoDiv.classList.replace('info-div', 'hidden');
    }
  });

  bookDiv.appendChild(bookParagraph);
  bookDiv.appendChild(btnInfo);
  bookDiv.appendChild(bookInfoDiv);
  bookDisplay.appendChild(bookDiv);
}

function removeBookItem(index) {
  libraryDatabase.splice(index, 1);
  displayBooks();
}

function askForRemove(index) {
  if (window.confirm("Do you want to delete this book?\n(This action is permanent!)")) {
    removeBookItem(index);
  }
}

function displayBooks() {
  while(bookDisplay.firstChild) {
    bookDisplay.removeChild(bookDisplay.firstChild);
  }

  libraryDatabase.forEach(book => {
    createBookElement(book);
  })
}

btnBookModal.addEventListener('click', () => {
  modalBook.showModal();
});

btnCancelModal.addEventListener('click', () => {
  modalBook.close();
  formNewBook.reset();
});

formNewBook.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = formNewBook.elements['title'].value;
  const author = formNewBook.elements['author'].value;
  const pages = formNewBook.elements['pages'].value;
  const read = formNewBook.elements['read'].value == 'yes';
  addBookToLibrary(title, author, pages, read);
  modalBook.close();
  formNewBook.reset();
  displayBooks();
});

addBookToLibrary('The trans birds book from Mexico 🏳️‍⚧️', '@Nonexdog', true)
addBookToLibrary('Birds and birds again Vol.1', 'Viernes Deco', '1337', true);
addBookToLibrary('Birds and birds again Vol.2', 'Viernes Deco', '1337');
addBookToLibrary('Everything about the yellowtailed swallow', 'Shamrock', '78', true);

displayBooks();