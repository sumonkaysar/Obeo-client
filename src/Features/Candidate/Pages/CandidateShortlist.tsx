import CommonDialog from "@/components/CommonDialog";
import NumberInput from "@/components/NumberInput";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import AddShortlistForm from "@/Features/Candidate/Components/CandidateShortlist/AddShortlistForm";
import ShortlistTable from "@/Features/Candidate/Components/CandidateShortlist/ShortlistTable";
import type {
  ISort,
  TShortlistCandidate,
  TShortlistCandidateForm,
} from "@/Features/Candidate/types/candidate.type";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const candidatesData: TShortlistCandidate[] = [
  {
    _id: "akjgdhsxbva",
    candidateId: "candidate-001",
    firstName: "John",
    lastName: "Doe",
    jobPosition: "Junior Frontend Developer",
    interviewDate: "2025-09-01T11:00:00.000Z",
    createdAt: "2025-09-28T16:04:37.642Z",
  },
  {
    _id: "akjhdhsxbva",
    candidateId: "candidate-002",
    firstName: "Alice",
    lastName: "Smith",
    jobPosition: "Senior Backend Developer",
    interviewDate: "2025-09-30T11:00:00.000Z",
    createdAt: "2025-09-28T16:04:37.642Z",
  },
  {
    _id: "akjgdhsxzva",
    candidateId: "candidate-003",
    firstName: "Michael",
    lastName: "Brown",
    jobPosition: "Full Stack Web Developer",
    interviewDate: "2025-09-01T13:00:00.000Z",
    createdAt: "2025-09-28T16:04:37.642Z",
  },
];

const sortCandidates = (data: TShortlistCandidate[], sort: ISort) => {
  const sortedCandidates = [...data].sort((a, b) => {
    const key = sort.sortBy;
    const candidate1 = a[key as keyof typeof a] as string;
    const candidate2 = b[key as keyof typeof b] as string;
    return sort.order === "desc"
      ? candidate2.localeCompare(candidate1)
      : candidate1.localeCompare(candidate2);
  });
  return sortedCandidates;
};

const CandidateShortlist = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [searchingTotal, setSearchingTotal] = useState(0);
  const [entries, setEntries] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<ISort>({
    sortBy: "firstName",
    order: "desc",
  });
  const [candidates, setCandidates] = useState<TShortlistCandidate[]>(
    sortCandidates(candidatesData.slice(0, entries), sort)
  );
  const [totalPages, setTotalPages] = useState(
    Math.ceil(candidatesData.length / entries)
  );

  const handleAddShortlist = (data: TShortlistCandidateForm) => {
    toast.success("Candidate added to the shortlist successfully");
    console.log(data);
    setIsAddModalOpen(false);
  };

  const handleEntriesNo = (entriesNo: number) => {
    const totalData =
      searchingTotal > 0 ? searchingTotal : candidatesData.length;
    setEntries(entriesNo);
    setCurrentPage(1);
    setCandidates(sortCandidates(candidatesData.slice(0, entriesNo), sort));
    setTotalPages(Math.ceil(totalData / entriesNo));
  };

  const handleSearching = (searchTerm: string) => {
    if (searchTerm) {
      const searchedCandidates = candidatesData.filter(
        (prevCandidate) =>
          prevCandidate.firstName.toLowerCase().includes(searchTerm) ||
          prevCandidate.lastName.toLowerCase().includes(searchTerm) ||
          prevCandidate.candidateId.toLowerCase().includes(searchTerm) ||
          prevCandidate?.jobPosition?.toLowerCase().includes(searchTerm)
      );

      setSearchingTotal(searchedCandidates.length);
      setCandidates(sortCandidates(searchedCandidates.slice(0, entries), sort));
      setCurrentPage(1);
      setTotalPages(Math.ceil(searchedCandidates.length / entries));
    } else {
      setSearchingTotal(0);
      setCandidates(sortCandidates(candidatesData.slice(0, entries), sort));
      setCurrentPage(1);
      setTotalPages(Math.ceil(candidatesData.length / entries));
    }
  };

  const handleSorting = (newSort: ISort) => {
    setSort(newSort);
    setCandidates(sortCandidates(candidates, newSort));
  };

  const handlePageChanging = (newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
    const newCandidates = candidatesData.slice(
      (newCurrentPage - 1) * entries,
      newCurrentPage * entries
    );
    setCandidates(newCandidates);
  };

  const handleDelete = () => {
    setCandidates((prevCandidates) =>
      prevCandidates.filter((candidate) => candidate.candidateId !== deleteId)
    );
  };

  return (
    <div className="bg-white shadow-md rounded-xs mx-auto border">
      <div className="flex justify-between border-b pt-1 pb-3 px-4">
        <h2 className="text-xl font-semibold">Manage Candidate</h2>
        <div className="flex gap-3">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#007BFF] hover:bg-[#0B76E9] flex items-center gap-1 rounded-xs cursor-pointer"
          >
            <PlusCircle />
            Add Shortlist
          </Button>
          <CommonDialog
            isOpen={isAddModalOpen}
            setIsOpen={setIsAddModalOpen}
            className="max-h-[calc(100vh_-_50px)] w-[calc(100vw_-_50px)] max-w-none sm:max-w-none overflow-y-scroll p-0"
            content={
              <div className="max-h-full">
                <AddShortlistForm handleAddShortlist={handleAddShortlist} />
              </div>
            }
          />
          <Button className="bg-[#007BFF] hover:bg-[#0B76E9] rounded-xs cursor-pointer">
            Manage Shortlist
          </Button>
        </div>
      </div>
      <div className="flex justify-between px-4 py-3">
        <div className="flex gap-2 items-center">
          <label htmlFor="entries">Show</label>
          <NumberInput value={entries} onBlur={handleEntriesNo} />
          <span>entries</span>
        </div>
        <div className="flex gap-2 items-center h-full">
          <label htmlFor="Search">Search:</label>
          <SearchInput onChange={handleSearching} />
        </div>
      </div>
      <div className="px-4 py-3">
        <ShortlistTable
          candidates={candidates}
          sort={sort}
          setSort={setSort}
          handleSorting={handleSorting}
          setDeleteId={setDeleteId}
          handleDelete={handleDelete}
          editId={editId}
          setEditId={setEditId}
        />
      </div>
      <div className="flex justify-end gap-4 px-4 py-3">
        <Button
          onClick={() =>
            currentPage !== 1 && handlePageChanging(currentPage - 1)
          }
          className="bg-[#F2F2F2] text-black rounded-xs hover:bg-[#EEEEEE] cursor-pointer"
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            currentPage !== totalPages && handlePageChanging(currentPage + 1)
          }
          className="bg-[#F2F2F2] text-black rounded-xs hover:bg-[#EEEEEE] cursor-pointer"
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CandidateShortlist;
