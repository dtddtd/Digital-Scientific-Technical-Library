import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import { fetchAllPublications } from "../../store/publications/publicationsThunks";
import { useSortedPublications } from "./useSortedPublications";

export const usePublications = () => {
  const publications = useAppSelector((state) => state.publications.all);

  const sortedPublications = useSortedPublications(publications);

  return sortedPublications;
};
