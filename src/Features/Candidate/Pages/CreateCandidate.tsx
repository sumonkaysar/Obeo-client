import TabsComponent from "@/components/TabsComponent";
import CreateCandidateForm from "@/Features/Candidate/Components/CreateCandidate/CreateCandidateForm";
import type { TBasicInfo } from "@/Features/Candidate/types/candidate.type";
import { useState } from "react";

const CreateCandidate = () => {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [allData, setAllData] = useState({} as TBasicInfo);
  const tabs = [
    {
      label: "Basic Information",
      value: "basic-info",
      content: (
        <CreateCandidateForm
          allData={allData}
          setAllData={setAllData}
          setActiveTab={setActiveTab}
        />
      ),
    },
    {
      label: "Educational Information",
      value: "edu-info",
      content: <div>Edu info form</div>,
    },
    {
      label: "Past Experience",
      value: "past-exp",
      content: <div>Past Exp form</div>,
    },
  ];

  console.log(activeTab, allData);

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
