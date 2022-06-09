import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect, useMemo } from "react";

import { fetchAllUsers } from "../../store/users/usersThunks";
import { SortModes } from "../../store/settings/types";

export const useUsers = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users.allUsers);
  const currentUser = useAppSelector((state) => state.users.user);

  const filter = useAppSelector((state) => state.settings.search);
  const sortByNew = useAppSelector((state) => state.settings.sortByNew);
  const sortMode = useAppSelector((state) => state.settings.sortMode);

  const sorted = useMemo(() => {
    if (!users?.length) {
      return [];
    }

    const usersCopy = [...users];

    switch (sortMode) {
      case SortModes.fullName: {
        return usersCopy.sort((a, b) => a.fullName.localeCompare(b.fullName));
      }
      case SortModes.department: {
        return usersCopy.sort((a, b) =>
          a.department.localeCompare(b.department)
        );
      }
      case SortModes.role: {
        return usersCopy.sort((a, b) => a.role.localeCompare(b.role));
      }
      default: {
        return usersCopy;
      }
    }
  }, [sortMode, users]);

  const filtered = useMemo(() => {
    const otherUsers = sorted.filter(
      (user) => user.userID !== currentUser?.userID
    );

    if (!filter) {
      return otherUsers;
    }

    return otherUsers.filter(
      (user) =>
        user.fullName.toLowerCase().includes(filter) ||
        user.email.toLowerCase().includes(filter) ||
        user.phone.toLowerCase().includes(filter) ||
        user.department.toLowerCase().includes(filter)
    );
  }, [filter, sorted]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return sortByNew ? filtered : [...filtered].reverse();
};
