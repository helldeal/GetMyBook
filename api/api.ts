import axios from "axios";
import { OPEN_LIBRARY_URL } from "../constants/Utils";
import data from "./libraries.json";
const librairies = JSON.parse(JSON.stringify(data));

export function getAllLibrariesFromJSON(): any {
  try {
    return librairies;
  } catch (error) {
    console.error("Error retrieving libraries:", error);
    return [];
  }
}

export function getLibraryByIdFromJSON(siret: string): any {
  try {
    return librairies.find((library: any) => library.SIRET === siret);
  } catch (error) {
    console.error("Error retrieving library by id:", error);
    return {};
  }
}

export async function searchBooksOLAPI(query: string) {
  const url = `${OPEN_LIBRARY_URL}/search.json?title=${encodeURIComponent(
    query
  )}&limit=100&fields=title,key,cover_i,author_name`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("searchBook - Error fetching data from OpenLibrary:", error);
    throw error;
  }
}

export async function getBookOLAPI(worksKey: string) {
  const url = `${OPEN_LIBRARY_URL}${worksKey}.json`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("getBook - Error fetching data from OpenLibrary:", error);
    throw error;
  }
}

export async function getEditionsOLAPI(worksKey: string) {
  const url = `${OPEN_LIBRARY_URL}${worksKey}/editions.json?limit=1000&fields=title,key,covers`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("getEditions - Error fetching data from OpenLibrary:", error);
    throw error;
  }
}

export async function getAuthorOLAPI(authorKey: string) {
  const url = `${OPEN_LIBRARY_URL}${authorKey}.json`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("getAuthor - Error fetching data from OpenLibrary:", error);
    throw error;
  }
}

export async function getEditionOLAPI(editionKey: string) {
  const url = `${OPEN_LIBRARY_URL}${editionKey}.json`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("getEdition - Error fetching data from OpenLibrary:", error);
    throw error;
  }
}

export async function getEditionFromISBNOLAPI(isbn: string) {
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

export async function getBooksFromAuthorOLAPI(authorKey: string) {
  const url = `${OPEN_LIBRARY_URL}${authorKey}/works.json?limit=1000`; //https://openlibrary.org/authors/OL1394244A/works.json?limit=1000
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "getEditionFromAuthor - Error fetching data from OpenLibrary:",
      error
    );
    throw error;
  }
}
