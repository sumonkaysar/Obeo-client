import CommonDialog from "@/components/CommonDialog";
import DeleteDialog from "@/components/DeleteDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  TCandidate,
} from "@/Features/Candidate/types/candidate.type";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

interface IProps {
  candidates: TCandidate[];
  sort: ISort;
  setSort: React.Dispatch<React.SetStateAction<ISort>>;
  handleSorting: (sort: ISort) => void;
  handleDelete: () => void;
  setDeleteId: React.Dispatch<React.SetStateAction<string | null>>;
  editId: string | null;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
}

const CandidateTable = ({
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
              Photograph
            </TableHead>
            <TableHead className="border text-center h-8 relative">
              Email
              <SortingArrows
                sort={sort}
                sortBy="email"
                handleSorting={handleSorting}
              />
            </TableHead>
            <TableHead className="border text-center h-8 relative">
              SSN
            </TableHead>
            <TableHead className="border text-center h-8">Phone</TableHead>
            <TableHead className="border text-center h-8">Action</TableHead>
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
                <Avatar className="mx-auto">
                  <AvatarImage src={candidate?.picture} />
                  <AvatarFallback>
                    {candidate.firstName[0]} {candidate.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="text-center">{candidate.email}</TableCell>
              <TableCell className="text-center">{candidate.ssn}</TableCell>
              <TableCell className="text-center">{candidate.phone}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical size={18} className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-4">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                          setIsEditModalOpen(true);
                          setEditId(candidate.candidateId);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-red-500"
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setDeleteId(candidate.candidateId);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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

export default CandidateTable;
