import { SortMenu } from "./SortMenu/SortMenu";
import { SearchInput } from "./SearchInput";

export const ControlPanel = () => {
  return (
    <div
      style={{
        padding: "10px 36px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SortMenu />
      <SearchInput />
    </div>
  );
};
