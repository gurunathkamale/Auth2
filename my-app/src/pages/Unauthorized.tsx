import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="">
      <h1>Unauthorized</h1>
      <h3>No such routes Found</h3>
      <p>You do not have permission to view this page.</p>
      <Link to={'/'}>Go Home</Link>
    </div>
  );
}

export default Unauthorized;
