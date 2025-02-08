import { getComicsFromApi, addComicToApi, updateComicInApi, deleteComicFromApi } from "../../infraestructure/api/comic-api/ComicApi";


export function getComicsUseCase() {
  return getComicsFromApi();
}

export function addComicUseCase(comic) {
  return addComicToApi(comic);
}

export function updateComicUseCase(comic) {
  return updateComicInApi(comic);
}

export function deleteComicUseCase(id) {
  return deleteComicFromApi(id);
}
