import axios from "axios";

export async function searchBook(query: string) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    query
  )}&limit=10`;
  try {
    const response = await axios.get(url);
    return response.data.docs;
  } catch (error) {
    console.error("Error fetching data from OpenLibrary:", error);
    throw error;
  }
}

export async function getBook(worksKey: string) {
  const url = `https://openlibrary.org${worksKey}.json`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from OpenLibrary:", error);
    throw error;
  }
}
