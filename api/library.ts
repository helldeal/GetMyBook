import data from "./libraries.json";
const librairies = JSON.parse(JSON.stringify(data));

export function getAllLibraries(): any {
  try {
    return librairies.filter(
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

export function getLibraryById(siret: string): any {
  try {
    return librairies.find((library: any) => library.SIRET === siret);
  } catch (error) {
    console.error("Error retrieving library by id:", error);
    return {};
  }
}
