import TabsComponent from "@/components/TabsComponent";
import BasicInfoForm from "@/Features/Candidate/Components/CreateCandidate/BasicInfoForm";
import type { TCreateCandidateForm } from "@/Features/Candidate/types/candidate.type";
import { useState } from "react";
import { toast } from "sonner";
import EduInfoForm from "../Components/CreateCandidate/EduInfoForm";
import PastExpForm from "../Components/CreateCandidate/PastExpForm";

const CreateCandidate = () => {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [allData, setAllData] = useState({} as TCreateCandidateForm);

  const handleCreateCandidate = () => {
    toast.success("Candidate created succesfully");
    console.log(activeTab, allData);
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
          handleCreateCandidate={handleCreateCandidate}
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

export default CreateCandidate;
