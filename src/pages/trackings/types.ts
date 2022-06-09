import { TPublication } from "../../store/publications/types";
import { TUser } from "../../store/users/types";
import { TTracking } from "../../store/trackings/types";

export type TTrackingPublication = TPublication &
  Pick<TUser, "fullName" | "userID"> &
  Pick<TTracking, "dateOUT" | "dateIN" | "trackID">;
