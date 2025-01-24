import { getAllLibrariesFromJSON } from "./api";

export function getAllLibraries(): any {
  try {
    return getAllLibrariesFromJSON().filter(
      (library: any) =>
        library.latitude &&
        library.longitude &&
        !isNaN(library.latitude) &&
        !isNaN(library.longitude)
    );
  } catch (error) {
    console.error("Error retrieving libraries:", error);
    return [];
  }
}
