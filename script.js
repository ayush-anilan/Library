let myLibrary = [];

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

if (localStorage.getItem("books") === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem("books"));
  myLibrary = booksFromStorage;
}

function showBooksInLibrary() {
  localStorage.setItem("books", JSON.stringify(myLibrary));
  const bookList = document.querySelector("#table-body");
  bookList.textContent = "";
  for (let i = 0; i < myLibrary.length; i += 1) {
    const bookRow = document.createElement("tr");
    bookRow.classList.add("book-info");
    bookList.appendChild(bookRow);
    // BOOK TITLE
    const bookTitle = document.createElement("td");
    bookTitle.textContent = myLibrary[i].title;
    bookRow.appendChild(bookTitle);
    // BOOK AUTHOR
    const bookAuthor = document.createElement("td");
    bookAuthor.textContent = myLibrary[i].author;
    bookRow.appendChild(bookAuthor);
    // BOOK PAGES
    const bookPages = document.createElement("td");
    bookPages.textContent = myLibrary[i].pages;
    bookRow.appendChild(bookPages);
    // BOOK REMOVAL BUTTON
    const bookDelete = document.createElement("td");
    const deleteSymbol = document.createElement("i");
    deleteSymbol.classList.add("fas", "fa-trash-alt");
    bookDelete.appendChild(deleteSymbol);
    bookRow.appendChild(bookDelete);
  }
}

function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  myLibrary.push(book);
  showBooksInLibrary();
}

function validateForm(event) {
  event.preventDefault();
  const form = document.querySelector("form");
  const titleInput = document.querySelector("#title");
  const titleErr = document.querySelector(".title");
  const authorInput = document.querySelector("#author");
  const authorErr = document.querySelector(".author");
  const pageInput = document.querySelector("#pages");
  const pageErr = document.querySelector(".pages");

  if (titleInput.value === "") {
    titleErr.style.display = "block";
  } else {
    titleErr.style.display = "block";
  }
  if (authorInput.value === "") {
    authorErr.style.display = "block";
  } else {
    authorErr.style.display = "block";
  }
  if (
    pageInput.value === "" ||
    pageInput.value.match(/[^1-9]/) ||
    pageInput.value <= 0
  ) {
    pageErr.style.display = "block";
  } else {
    pageErr.style.display = "block";
  }
  if (
    titleInput.value !== "" &&
    authorInput.value !== "" &&
    pageInput.value !== ""
  ) {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pageInput.value,
      true
    );
  } else {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pageInput.value,
      false
    );
  }
  form.reset();
}

function listenClicks() {
  document.addEventListener("click", (event) => {
    const { target } = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.id === "addbook") {
      validateForm(event);
    } else if (target.classList.contains("fa-trash-alt")) {
      myLibrary.splice(tr, 1);
    }
    showBooksInLibrary();
  });
}

showBooksInLibrary();
listenClicks();
