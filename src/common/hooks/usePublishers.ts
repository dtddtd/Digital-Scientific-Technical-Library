import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import { fetchAllPublishers } from "../../store/publishers/publishersThunks";

export const usePublishers = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllPublishers());
  }, []);

  return useAppSelector((state) => state.publishers.all);
};
