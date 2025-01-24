import {
  getAuthorOLAPI,
  getBookOLAPI,
  getBooksFromAuthorOLAPI,
  getEditionFromISBNOLAPI,
  getEditionOLAPI,
  getEditionsOLAPI,
  searchBooksOLAPI,
} from "./api";

export async function searchBooks(query: string) {
  try {
    const search: any = await searchBooksOLAPI(query);
    return search.docs.filter((doc: any) => doc.cover_i && doc.author_name);
  } catch (error) {
    console.error("searchBook - Error fetching data from ApiLayer:", error);
    throw error;
  }
}

export async function getBook(worksKey: string) {
  try {
    const book = await getBookOLAPI(worksKey);
    return book;
  } catch (error) {
    console.error("getBook - Error fetching data from ApiLayer:", error);
    throw error;
  }
}

export async function getEditions(worksKey: string) {
  try {
    const editions = await getEditionsOLAPI(worksKey);
    return editions.entries.filter((doc: any) => doc.covers);
  } catch (error) {
    console.error("getEditions - Error fetching data from ApiLayer:", error);
    throw error;
  }
}

export async function getAuthor(authorKey: string) {
  try {
    const author = await getAuthorOLAPI(authorKey);
    return author;
  } catch (error) {
    console.error("getAuthor - Error fetching data from ApiLayer:", error);
    throw error;
  }
}

export async function getEdition(editionKey: string) {
  try {
    const edition = await getEditionOLAPI(editionKey);
    return edition;
  } catch (error) {
    console.error("getEdition - Error fetching data from ApiLayer:", error);
    throw error;
  }
}

export async function getEditionFromISBN(isbn: string) {
  try {
    const edition = await getEditionFromISBNOLAPI(isbn);
    return edition;
  } catch (error) {
    console.error(
      "getEditionFromISBN - Error fetching data from ApiLayer:",
      error
    );
    throw error;
  }
}

export async function getEditionsFromAuthor(authorKey: string) {
  try {
    const books = await getBooksFromAuthorOLAPI(authorKey);
    return books;
  } catch (error) {
    console.error(
      "getEditionFromAuthor - Error fetching data from ApiLayer:",
      error
    );
    throw error;
  }
}
