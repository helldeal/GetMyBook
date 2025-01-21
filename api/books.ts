import axios from "axios";
import { OPEN_LIBRARY_URL } from "../constants/Utils";

export async function searchBook(query: string) {
  const url = `${OPEN_LIBRARY_URL}/search.json?title=${encodeURIComponent(
    query
  )}&limit=10&fields=title,key`;
  try {
    const response = await axios.get(url);
    return response.data.docs;
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
  const url = `${OPEN_LIBRARY_URL}${worksKey}/editions.json?limit=10`;
  try {
    const response = await axios.get(url);
    return response.data.entries;
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
