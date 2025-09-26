import App from "@/App";
import CreateCandidate from "@/Features/Candidate/Pages/CreateCandidate";
import ManageCandidate from "@/Features/Candidate/Pages/ManageCandidate";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/create-candidate",
    Component: CreateCandidate,
  },
  {
    path: "/manage-candidate",
    Component: ManageCandidate,
  },
]);

export default router;
