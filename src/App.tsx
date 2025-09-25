import { Link } from "react-router";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border border-blue-500 p-5 w-1/2">
        <h2 className="text-2xl font-semibold">Go To:</h2>
        <ul className="list-disc list ml-5">
          <li>
            <Link
              className="text-blue-600 hover:underline"
              to="/create-candidate"
            >
              Create Candidate
            </Link>
          </li>
          <li>
            <Link
              className="text-blue-600 hover:underline"
              to="/manage-candidate"
            >
              Manage Candidate
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
