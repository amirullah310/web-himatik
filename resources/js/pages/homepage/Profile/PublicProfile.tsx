export default function PublicProfile({ user }: any) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-600">
          @{user.username}
        </h1>
        <p className="text-gray-600 mt-2">{user.name}</p>
      </div>
    </div>
  );
}
