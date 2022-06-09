import { useAppSelector } from "../../store";
import { TUser } from "../../store/users/types";
import { useMemo } from "react";

import { TPublication } from "../../store/publications/types";
import { TTrackingPublication } from "./types";
import { SortModes } from "../../store/settings/types";

export const useTrackings = (): TTrackingPublication[] => {
  const publications = useAppSelector((state) => state.publications.all);

  const user = useAppSelector((state) => state.users.user);
  const users = useAppSelector((state) => state.users.allUsers);
  const trackings = useAppSelector((state) => state.trackings.all);
  const sortMode = useAppSelector((state) => state.settings.sortMode);
  const filter = useAppSelector((state) => state.settings.search);
  const sortByNew = useAppSelector((state) => state.settings.sortByNew);

  const publicationsMap = useMemo(
    () =>
      publications.reduce<Record<string, TPublication>>((acc, pub) => {
        acc[pub.pubID] = pub;
        return acc;
      }, {}),
    [publications]
  );

  const usersMap = useMemo(
    () =>
      users.reduce<Record<string, TUser>>((acc, user) => {
        acc[user.userID] = user;
        return acc;
      }, {}),
    [users]
  );

  const trackingPublications = useMemo(
    () =>
      trackings.map((tracking) => ({
        ...publicationsMap[tracking.pubID],
        dateOUT: tracking.dateOUT,
        dateIN: tracking.dateIN,
        trackID: tracking.trackID,
        fullName: usersMap[tracking.userID]?.fullName || user?.fullName || "",
        userID: tracking?.userID || -1,
      })),
    [trackings, publicationsMap, usersMap]
  );

  const sorted = useMemo(() => {
    if (!publications?.length) {
      return [];
    }

    const publicationsCopy = [...trackingPublications];

    switch (sortMode) {
      case SortModes.dateOut: {
        return publicationsCopy.sort(
          (a, b) =>
            new Date(b.dateOUT || "").getTime() -
            new Date(a.dateOUT || "").getTime()
        );
      }
      case SortModes.dateIn: {
        return publicationsCopy.sort(
          (a, b) =>
            new Date(b.dateIN || "").getTime() -
            new Date(a.dateIN || "").getTime()
        );
      }
      case SortModes.takerName: {
        return publicationsCopy.sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );
      }
      default: {
        return publicationsCopy;
      }
    }
  }, [sortMode, trackingPublications]);

  const filtered = useMemo(() => {
    if (!filter) {
      return sorted;
    }

    return sorted.filter(
      (pub) =>
        pub.pubHeader.toLowerCase().includes(filter) ||
        pub.authors.toLowerCase().includes(filter) ||
        pub.pubType.toLowerCase().includes(filter) ||
        pub.fullName.toLowerCase().includes(filter)
    );
  }, [filter, sorted]);

  return (
    sortByNew ? filtered : [...filtered].reverse()
  ) as TTrackingPublication[];
};
