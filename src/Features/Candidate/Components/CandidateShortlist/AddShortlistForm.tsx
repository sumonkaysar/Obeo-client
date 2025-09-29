import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { candidatesData } from "@/Features/Candidate/consts/candidate.const";
import type { TShortlistCandidateForm } from "@/Features/Candidate/types/candidate.type";
import { shortlistCandidateZodSchema } from "@/Features/Candidate/validations/candidate.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";

interface IProps {
  title?: string;
  onSubmit: (data: TShortlistCandidateForm) => void;
  data?: TShortlistCandidateForm;
}

const AddShortlistForm = ({ title, onSubmit, data }: IProps) => {
  const form = useForm<TShortlistCandidateForm>({
    resolver: zodResolver(shortlistCandidateZodSchema),
    defaultValues: {
      candidate: data?.candidate || "",
      jobPosition: data?.jobPosition || "",
      interviewDate: data?.interviewDate
        ? dayjs(data.interviewDate).format("YYYY-MM-DDTHH:mm")
        : "",
    },
  });

  const handleSubmit = async (data: TShortlistCandidateForm) => {
    try {
      onSubmit(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xs mx-auto border">
      <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
        {title || "Add Shortlist"}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 px-6 py-4"
        >
          <FormField
            control={form.control}
            name="candidate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Candidate<span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a candidate to shortlist" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {candidatesData.map((candidate) => (
                      <SelectItem key={candidate._id} value={candidate._id}>
                        {candidate.firstName} {candidate.lastName} (
                        {candidate.candidateId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="sr-only">
                  Select a candidate to shortlist
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobPosition"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Job Position <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Job Position" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Job Position.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interviewDate"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                <FormLabel className="justify-end text-[#212529]">
                  Interview Date <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="Interview Date"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Enter your Interview Date.
                </FormDescription>
                <div />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-6 flex justify-end gap-2">
            <Button className="bg-[#4682B4]">
              {title ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddShortlistForm;
