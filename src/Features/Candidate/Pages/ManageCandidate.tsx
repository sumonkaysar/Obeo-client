import NumberInput from "@/components/NumberInput";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import CandidateTable from "@/Features/Candidate/Components/ManageCandidate/CandidateTable";
import type {
  ISort,
  TCandidate,
} from "@/Features/Candidate/types/candidate.type";
import { useState } from "react";

const candidatesData: TCandidate[] = [
  {
    _id: "akjgdhsxbva",
    candidateId: "candidate-001",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1-202-555-0147",
    picture:
      "https://new.esensesoftware.com/wp-content/uploads/2020/12/author-3.jpg",
    altPhone: "+1-202-555-0175",
    ssn: "123-45-6789",
    presentAddress: "123 Elm Street, Apt 5B",
    permanentAddress: "456 Maple Avenue",
    state: "California",
    city: "Los Angeles",
    zipCode: "90001",
    examName: "Bachelor of Science in Computer Science",
    institution: "University of California, Los Angeles",
    roll: "CS2015001",
    registrationNo: "UCLA-CS-2015-001",
    result: "3.85 GPA",
    passingYear: "2019",
    companyName: "Tech Solutions Inc.",
    designation: "Frontend Developer",
    joiningDate: "2019-08-01",
    expireDate: "2022-07-31",
    yearsOfExp: "3",
  },
  {
    _id: "akjhdhsxbva",
    candidateId: "candidate-002",
    firstName: "Alice",
    lastName: "Smith",
    email: "alicesmith@example.com",
    phone: "+1-202-555-0188",
    picture:
      "https://topland.websolutionus.com/uploads/website-images/wsus-img-2024-08-21-05-26-52-3513.webp",
    presentAddress: "789 Pine Road",
    permanentAddress: "101 Oak Boulevard",
    state: "New York",
    city: "New York",
    zipCode: "10001",
    examName: "Master of Business Administration",
    institution: "New York University",
    roll: "MBA2017009",
    registrationNo: "NYU-MBA-2017-009",
    result: "3.67 GPA",
    passingYear: "2021",
    companyName: "Global Finance Corp.",
    designation: "Financial Analyst",
    joiningDate: "2021-09-15",
    expireDate: "2023-08-30",
    yearsOfExp: "2",
  },
  {
    _id: "akjgdhsxzva",
    candidateId: "candidate-003",
    firstName: "Michael",
    lastName: "Brown",
    email: "michaelbrown@example.com",
    phone: "+1-202-555-0199",
    picture: "https://captiontools.com/wp-content/uploads/2017/03/testy3-1.png",
    ssn: "987-65-4321",
    presentAddress: "202 Willow Lane",
    state: "Texas",
    city: "Houston",
    zipCode: "77001",
    examName: "Bachelor of Engineering in Mechanical",
    institution: "University of Texas",
    roll: "ME2016005",
    registrationNo: "UT-ME-2016-005",
    result: "First Class",
    passingYear: "2020",
    companyName: "Energy Systems Ltd.",
    designation: "Mechanical Engineer",
    joiningDate: "2020-11-01",
    expireDate: "2025-10-31",
    yearsOfExp: "5",
  },
];

const sortCandidates = (data: TCandidate[], sort: ISort) => {
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

const ManageCandidate = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchingTotal, setSearchingTotal] = useState(0);
  const [entries, setEntries] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<ISort>({
    sortBy: "firstName",
    order: "desc",
  });
  const [candidates, setCandidates] = useState<TCandidate[]>(
    sortCandidates(candidatesData.slice(0, entries), sort)
  );
  const [totalPages, setTotalPages] = useState(
    Math.ceil(candidatesData.length / entries)
  );

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
          prevCandidate.email.toLowerCase().includes(searchTerm) ||
          prevCandidate.candidateId.toLowerCase().includes(searchTerm) ||
          prevCandidate?.ssn?.toLowerCase().includes(searchTerm) ||
          prevCandidate.phone.toLowerCase().includes(searchTerm)
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

  // const handleDelete = () => {
  //   setCandidates((prevCandidates) =>
  //     prevCandidates.filter((candidate) => candidate.candidateId !== deleteId)
  //   );
  // };

  const handleDelete = () => {
    setCandidates((prevCandidates) =>
      prevCandidates.filter((candidate) => candidate.candidateId !== deleteId)
    );
  };

  return (
    <div className="bg-white shadow-md rounded-xs mx-auto border">
      <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
        Manage Candidate
      </h2>
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
        <CandidateTable
          candidates={candidates as TCandidate[]}
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

export default ManageCandidate;
