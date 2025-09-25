import App from "@/App";
import { createBrowserRouter } from "react-router";
import CreateCandidate from "../Features/Candidate/Pages/CreateCandidate";
import ManageCandidate from "../Features/Candidate/Pages/ManageCandidate";

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
