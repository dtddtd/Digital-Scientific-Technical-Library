import { TPublication } from "../../store/publications/types";
import { useAppSelector } from "../../store";
import { useMemo } from "react";
import { SortModes } from "../../store/settings/types";
import { TPublisher } from "../../store/publishers/types";
import { usePublishers } from "./usePublishers";
import { TTrackingPublication } from "../../pages/trackings/types";

export const useSortedPublications = (
  publications: (TPublication | TTrackingPublication)[]
) => {
  const publishers = usePublishers();

  const sortMode = useAppSelector((state) => state.settings.sortMode);
  const filter = useAppSelector((state) => state.settings.search);
  const sortByNew = useAppSelector((state) => state.settings.sortByNew);

  const sorted = useMemo(() => {
    if (!publications?.length) {
      return [];
    }

    const publicationsCopy = [...publications];

    switch (sortMode) {
      case SortModes.addDate: {
        return publicationsCopy.reverse();
      }
      case SortModes.pubName: {
        return publicationsCopy.sort((a, b) =>
          a.pubHeader.localeCompare(b.pubHeader)
        );
      }
      case SortModes.pubDate: {
        return publicationsCopy.sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
        );
      }
      default: {
        return publicationsCopy.reverse();
      }
    }
  }, [sortMode, publications]);

  const searchedPublishers = useMemo(() => {
    if (!filter) {
      return {};
    }

    return publishers.reduce<Record<string, TPublisher>>((acc, pub) => {
      if (pub.publisherName.toLowerCase().includes(filter)) {
        acc[pub.publisherID.toString()] = pub;
      }

      return acc;
    }, {});
  }, [publishers, filter]);

  const filtered = useMemo(() => {
    if (!filter) {
      return sorted;
    }

    // @ts-ignore
    return sorted.filter(
      (pub) =>
        pub.pubHeader.toLowerCase().includes(filter) ||
        pub.authors.toLowerCase().includes(filter) ||
        pub.pubType.toLowerCase().includes(filter) ||
        !!searchedPublishers[pub.publisherID]
    );
  }, [filter, sorted]);

  // @ts-ignore
  return sortByNew ? filtered : [...filtered].reverse();
};
