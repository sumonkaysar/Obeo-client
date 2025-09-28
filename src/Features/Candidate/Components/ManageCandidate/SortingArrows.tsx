import type { ISort } from "@/Features/Candidate/types/candidate.type";
import { MoveDown, MoveUp } from "lucide-react";

interface IProps {
  sort: ISort;
  handleSorting: (sort: ISort) => void;
  sortBy: string;
}

const SortingArrows = ({ sort, sortBy, handleSorting }: IProps) => {
  return (
    <div
      onClick={() => {
        handleSorting({
          sortBy: sortBy,
          order:
            sort.sortBy === sortBy
              ? sort.order === "asc"
                ? "desc"
                : "asc"
              : "desc",
        });
      }}
    >
      <span className="absolute right-3 top-1/2 -translate-y-1/2">
        <MoveUp
          size={12}
          color={
            sortBy === sort.sortBy && sort.order === "desc" ? "#111" : "#999"
          }
        />
      </span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2">
        <MoveDown
          size={12}
          color={
            sortBy === sort.sortBy && sort.order === "asc" ? "#111" : "#999"
          }
        />
      </span>
    </div>
  );
};

export default SortingArrows;
