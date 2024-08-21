export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="w-full text-left">Logout</button>
    </form>
  );
}
