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
}

function addBookToLibrary(title, author, pages, wasRead) {
  const newBook = new Book(title, author, pages, wasRead);
  libraryDatabase.push(newBook);
}

function displayBooks() {
  while(bookDisplay.firstChild) {
    bookDisplay.removeChild(bookDisplay.firstChild);
  }

  libraryDatabase.forEach(book => {
    const bookParagraph = document.createElement('p');
    bookParagraph.textContent = book.info();
    bookDisplay.appendChild(bookParagraph);
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
});

addBookToLibrary('The Bible', 'God', '777');
addBookToLibrary('The Gay Book', 'Satan', '616', true);
// Just for the record, if anyone is seeing this one commit
// I'm gay and also I kiss people my gender so I am not being
// Literally homophobic I'm being ironically so as a treat

displayBooks();