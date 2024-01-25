const bookDisplay = document.querySelector('.book-display');
const btnBookModal = document.querySelector('#btn-open-modal');
const modalBook = document.querySelector('#modal-book');
const formNewBook = document.forms["new-book"];
const btnCancelModal = formNewBook.elements['modal-cancel'];

const libraryDatabase = [];

function addBookToLibrary(book) {
  libraryDatabase.push(book);
}

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

btnBookModal.addEventListener('click', () => {
  modalBook.showModal();
});

btnCancelModal.addEventListener('click', () => {
  modalBook.close();
});

formNewBook.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = formNewBook.elements['title'].value;
  const author = formNewBook.elements['author'].value;
  const pages = formNewBook.elements['pages'].value;
  const read = formNewBook.elements['read'].value;
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
});

const Bible = new Book('The Bible', 'God', '777');
const gayBook = new Book('The Gay Book', 'Satan', '616', true);
// Just for the record, if anyone is seeing this one commit
// I'm gay and also I kiss people my gender so I am not being
// Literally homophobic I'm being ironically so as a treat

addBookToLibrary(Bible);
addBookToLibrary(gayBook);

libraryDatabase.forEach(book => {
  const bookParagraph = document.createElement('p');
  bookParagraph.textContent = book.info();
  bookDisplay.appendChild(bookParagraph);
})