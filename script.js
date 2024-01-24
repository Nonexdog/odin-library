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

