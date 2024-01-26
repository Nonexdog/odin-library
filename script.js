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

function createBookElement(book) {
  const bookDiv = document.createElement('div');
  const bookParagraph = document.createElement('p');
  const btnBookIndex = document.createElement('button');
  const bookIndex = libraryDatabase.indexOf(book);


  btnBookIndex.textContent = bookIndex;
  btnBookIndex.addEventListener('click', () => {
    removeBookItem(bookIndex);
  })

  bookParagraph.textContent = book.info();
  bookParagraph.setAttribute('data-index', bookIndex);

  bookDiv.appendChild(bookParagraph);
  bookDiv.appendChild(btnBookIndex);
  bookDisplay.appendChild(bookDiv);
}

function removeBookItem(index) {
  libraryDatabase.splice(index, 1);
  displayBooks();
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

addBookToLibrary('The Bible', 'God', '777');
addBookToLibrary('The Gay Book', 'Satan', '616', true);
// Just for the record, if anyone is seeing this one commit
// I'm gay and also I kiss people my gender so I am not being
// Literally homophobic I'm being ironically so as a treat

displayBooks();