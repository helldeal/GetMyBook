import axios from "axios";
import { OPEN_LIBRARY_URL } from "../constants/Utils";

export async function searchBook(query: string) {
  const url = `${OPEN_LIBRARY_URL}/search.json?title=${encodeURIComponent(
    query
  )}&limit=100&fields=title,key,cover_i,author_name`;
  try {
    const response = await axios.get(url);
    return response.data.docs.filter(
      (doc: any) => doc.cover_i && doc.author_name
    );
  } catch (error) {
    console.error("searchBook - Error fetching data from OpenLibrary:", error);
    throw error;
  }
}

export async function getBook(worksKey: string) {
  const url = `${OPEN_LIBRARY_URL}${worksKey}.json`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("getBook - Error fetching data from OpenLibrary:", error);
    throw error;
  }
}

export async function getEditions(worksKey: string) {
  const url = `${OPEN_LIBRARY_URL}${worksKey}/editions.json?limit=1000&fields=title,key,covers`;
  try {
    const response = await axios.get(url);
    return response.data.entries.filter((doc: any) => doc.covers);
  } catch (error) {
    console.error("getEditions - Error fetching data from OpenLibrary:", error);
    throw error;
  }
}

export async function getAuthor(authorKey: string) {
  const url = `${OPEN_LIBRARY_URL}${authorKey}.json`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("getAuthor - Error fetching data from OpenLibrary:", error);
    throw error;
  }
}

export async function getEdition(editionKey: string) {
  const url = `${OPEN_LIBRARY_URL}${editionKey}.json`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("getEdition - Error fetching data from OpenLibrary:", error);
    throw error;
  }
}

export async function getEditionFromISBN(isbn: string) {
  const url = `${OPEN_LIBRARY_URL}/isbn/${isbn}.json`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "getEditionFromISBN - Error fetching data from OpenLibrary:",
      error
    );
    throw error;
  }
}
