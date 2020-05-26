// Book Class ; Represent a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class ; Handle UI Tasks
class UI {
  static displayBooks() {
    // const StoredBooks = [
    //   {
    //     title: "Book One",
    //     author: 'John Doe',
    //     isbn: '343434'
    //   }, {
    //     title: "Book Two",
    //     author: 'Ersin Sen',
    //     isbn: '454545'
    //   }
    // ];
    //const books = StoredBooks;
    const books = Store.getBooks();
    // Add books to list
    books.forEach((book) => UI.addBookToList(book));
  }
  // To Add Book to Ui
  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }
  // To delete book from list
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();

    }
  }
  // to show alert if fields are empty
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    // vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }
  // To Clear fields
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

}

// Store Class : Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      // we converted object book to string book name
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;

  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
      localStorage.setItem('books', JSON.stringify(books));
    });
  }
}

// Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event ; Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const titleForm = document.querySelector('#title').value;
  const authorForm = document.querySelector('#author').value;
  const isbnForm = document.querySelector('#isbn').value;

  // Validate
  if (titleForm === '' || authorForm === '' || isbnForm === '') {
    UI.showAlert('Please fill in all fields !!!', 'danger');//info success
  } else {
    // instantiate book
    const instBook = new Book(titleForm, authorForm, isbnForm);

    // Add Book to Ui
    UI.addBookToList(instBook);

    // Add book to storage
    Store.addBook(instBook);

    // Show success message
    UI.showAlert('Book added successfully', 'success');

    // Clear fields
    UI.clearFields();
  }


});

// Event ; Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove from UI
  UI.deleteBook(e.target)
  // Remove from storage
  Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // show delete message
  UI.showAlert("Book removed", 'info');
});