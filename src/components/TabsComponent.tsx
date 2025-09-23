import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ReactNode } from "react";

interface ITab {
  label: string;
  value: string;
  content: ReactNode;
}

interface ITabsComponentProps {
  tabs: ITab[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const TabsComponent = ({
  tabs,
  activeTab,
  setActiveTab,
}: ITabsComponentProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="bg-transparent gap-1 p-0">
        {tabs.map((tab, i) => (
          <TabsTrigger
            key={i}
            value={tab.value}
            className="bg-[#4682B4] text-white rounded-t-sm rounded-b-none font-normal data-[state=active]:bg-[#0E0D0D]"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, i) => (
        <TabsContent key={i} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsComponent;
