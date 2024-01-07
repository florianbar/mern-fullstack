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
  let errorMessage = null;

  try {
    const response = await fetch("http://localhost:5000/api/users");
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    users = responseData.users;
  } catch (err) {
    errorMessage = err.message;
  }

  return {
    props: {
      users,
      errorMessage,
    },
  };
}
