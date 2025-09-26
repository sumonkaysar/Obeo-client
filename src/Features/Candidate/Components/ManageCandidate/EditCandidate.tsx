import TabsComponent from "@/components/TabsComponent";
import BasicInfoForm from "@/Features/Candidate/Components/CreateCandidate/BasicInfoForm";
import EduInfoForm from "@/Features/Candidate/Components/CreateCandidate/EduInfoForm";
import PastExpForm from "@/Features/Candidate/Components/CreateCandidate/PastExpForm";
import type {
  TCandidate,
  TCreateCandidateForm,
} from "@/Features/Candidate/types/candidate.type";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  data?: TCandidate;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCandidate = ({ data, setIsEditModalOpen }: IProps) => {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [allData, setAllData] = useState((data || {}) as TCreateCandidateForm);

  const handleUpdateCandidate = () => {
    toast.success("Candidate updated succesfully");
    console.log(activeTab, allData);
    setIsEditModalOpen(false);
  };

  const tabs = [
    {
      label: "Basic Information",
      value: "basic-info",
      content: (
        <BasicInfoForm
          allData={allData}
          setAllData={setAllData}
          setActiveTab={setActiveTab}
          title="Edit Candidate"
        />
      ),
    },
    {
      label: "Educational Information",
      value: "edu-info",
      content: (
        <EduInfoForm
          allData={allData}
          setAllData={setAllData}
          setActiveTab={setActiveTab}
          title="Edit Candidate"
        />
      ),
    },
    {
      label: "Past Experience",
      value: "past-exp",
      content: (
        <PastExpForm
          allData={allData}
          setAllData={setAllData}
          setActiveTab={setActiveTab}
          handleCandidateData={handleUpdateCandidate}
          title="Edit Candidate"
        />
      ),
    },
  ];

  return (
    <div className="bg-[#F4F4F5] p-2">
      <TabsComponent
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default EditCandidate;
