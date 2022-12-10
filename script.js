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
  const title = document.querySelector('#book-title').value;
  const author = document.querySelector('#book-author').value;
  const addItem = new Book(title, author);
  return addItem;
}
// Showcase the list of books
function Display(index) {
  const bookList = document.querySelector('.library');
  const items = document.createElement('tr');
  items.classList.add('items');
  items.setAttribute('id', index.bookid);
  items.innerHTML = `<th> "${index.title}" by ${index.author}</th>`;
  const rmbtn = document.createElement('button');
  rmbtn.innerHTML = 'Remove';
  rmbtn.setAttribute('id', 'removebtn');
  rmbtn.addEventListener('click', () => storeBook.remove(index.bookid));
  items.appendChild(rmbtn);
  bookList.appendChild(items);
}
// Add button
const addNewBook = document.getElementById('addbtn');
addNewBook.addEventListener('click', () => {
  const book = getInput();
  storeBook.addBook(book);
});

const add = document.querySelector('.add');
const display = document.querySelector('.display');
const contact = document.querySelector('.contact');
const listLink =document.getElementById('l-link');
const addLink = document.getElementById('a-link');
const contactLink = document.getElementById('c-link');

listLink.addEventListener('click', () => {
  display.style.display='flex'
  contact.style.display = 'none'
  add.style.display = 'none';
});
addLink.addEventListener('click', () => {
  display.style.display='none'
  contact.style.display = 'none'
  add.style.display = 'flex';
});
contactLink.addEventListener('click', () => {
  display.style.display='none'
  contact.style.display = 'flex'
  add.style.display = 'none';
});
window.onload = () => {
  storeBook.books = JSON.parse(localStorage.getItem('DB' || '[]'));
  if (storeBook.books === null) {
    storeBook.books = [];
    return;
  }
  storeBook.books.forEach((item) => Display(item));
  live = () => {
  const date = document.getElementById('date')
  date.innerHTML= Date().slice(0,25)
}
  setInterval(live,1000);
};