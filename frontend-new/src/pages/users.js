import { httpClient } from "../utils/http";

export default function Users({ users, errorMessage }) {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      {errorMessage && (
        <div className="text-red-800 font-bold bg-red-200 mb-4 p-4">
          {errorMessage}
        </div>
      )}
      <ul>
        {users?.length > 0 &&
          users.map((user) => <li key={user.id}>- {user.name}</li>)}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  let users = null;

  const { sendRequest, errorMessage } = httpClient();
  const responseData = await sendRequest("http://localhost:5000/api/users");
  users = responseData.users;

  return {
    props: {
      users,
      errorMessage,
    },
  };
}
