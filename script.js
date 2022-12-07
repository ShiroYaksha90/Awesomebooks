/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */

// Creat Book class
class Book {
  constructor(title, author) {
    this.bookid = Math.random().toFixed(1);
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  // Add a new book
  addBook(newItem) {
    this.books.push(newItem);
    localStorage.setItem('DB', JSON.stringify(this.books));
    Display(newItem);
  }

  // remove a book
  remove(bookid) {
    const rm = document.getElementById(bookid);
    rm.remove();
    this.books = this.books.filter((x) => x.bookid !== bookid);
    localStorage.setItem('DB', JSON.stringify(this.books));
  }
}

const storeBook = new Library();
// fetch values from input
function getInput() {
  const title = document.querySelector('#book-title');
  const author = document.querySelector('#book-author');
  const addItem = new Book(title.value, author.value);
  return addItem;
}
// Showcase the list of books
function Display(index) {
  const bookList = document.querySelector('.library');
  const items = document.createElement('div');
  items.classList.add('items');
  items.setAttribute('id', index.bookid);
  items.innerHTML = `<p> ${index.title}</p>
    <p> ${index.author}</p>`;
  const rmbtn = document.createElement('button');
  rmbtn.innerHTML = 'Remove';
  rmbtn.addEventListener('click', () => storeBook.remove(index.bookid));
  items.appendChild(rmbtn);
  const hr = document.createElement('hr');
  items.appendChild(hr);
  bookList.appendChild(items);
}
// Add button
const addNewBook = document.getElementById('addbtn');
addNewBook.addEventListener('click', () => {
  const book = getInput();
  storeBook.addBook(book);
});

window.onload = () => {
  storeBook.books = JSON.parse(localStorage.getItem('DB' || '[]'));
  if (storeBook.books === null) {
    storeBook.books = [];
    return;
  }
  storeBook.books.forEach((item) => Display(item));
};