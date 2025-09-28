import CommonDialog from "@/components/CommonDialog";
import DeleteDialog from "@/components/DeleteDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditCandidate from "@/Features/Candidate/Components/ManageCandidate/EditCandidate";
import SortingArrows from "@/Features/Candidate/Components/ManageCandidate/SortingArrows";
import type {
  ISort,
  TShortlistCandidate,
} from "@/Features/Candidate/types/candidate.type";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useState } from "react";

dayjs.extend(advancedFormat);

interface IProps {
  candidates: TShortlistCandidate[];
  sort: ISort;
  setSort: React.Dispatch<React.SetStateAction<ISort>>;
  handleSorting: (sort: ISort) => void;
  handleDelete: () => void;
  setDeleteId: React.Dispatch<React.SetStateAction<string | null>>;
  editId: string | null;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ShortlistTable = ({
  candidates,
  sort,
  handleSorting,
  handleDelete,
  setDeleteId,
  editId,
  setEditId,
}: IProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="border text-center h-8 relative">
              SL
            </TableHead>
            <TableHead className="border text-center h-8 relative">
              Name
              <SortingArrows
                sort={sort}
                sortBy="firstName"
                handleSorting={handleSorting}
              />
            </TableHead>
            <TableHead className="border text-center h-8 relative w-44">
              Candidate Id
              <SortingArrows
                sort={sort}
                sortBy="candidateId"
                handleSorting={handleSorting}
              />
            </TableHead>
            <TableHead className="border text-center h-8 relative">
              Job Position
              <SortingArrows
                sort={sort}
                sortBy="jobPosition"
                handleSorting={handleSorting}
              />
            </TableHead>
            <TableHead className="border text-center h-8 relative">
              Shortlist Date
            </TableHead>
            <TableHead className="border text-center h-8 relative">
              Interview Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-[#F2F2F2]">
          {candidates.map((candidate, i) => (
            <TableRow className="border-0" key={i}>
              <TableCell className="text-center">{i + 1}</TableCell>
              <TableCell className="text-center">
                {candidate.firstName} {candidate.lastName}
              </TableCell>
              <TableCell className="text-center">
                {candidate.candidateId}
              </TableCell>
              <TableCell className="text-center">
                {candidate.jobPosition}
              </TableCell>
              <TableCell className="text-center">
                {dayjs(candidate.createdAt).format("DD-MMM-YYYY")}
              </TableCell>
              <TableCell className="text-center">
                {dayjs(candidate.interviewDate).format(
                  "hh:mm a, ddd, DD-MMM-YYYY"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteDialog
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        onCofirm={handleDelete}
      />
      <CommonDialog
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        className="max-h-[calc(100vh_-_50px)] w-[calc(100vw_-_50px)] max-w-none sm:max-w-none overflow-y-scroll p-0"
        content={
          <div className="max-h-full">
            <EditCandidate
              data={candidates.find(
                (candidate) => candidate.candidateId === editId
              )}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          </div>
        }
      />
    </>
  );
};

export default ShortlistTable;
