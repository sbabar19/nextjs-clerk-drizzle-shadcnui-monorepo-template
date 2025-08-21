import { getUsers } from "@workspace/backend/users/get-users";
import { Button } from "@workspace/ui/components/button";

export default async function Page() {
  const users = await getUsers();
  console.log(users);

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>

        <Button variant="destructive" size="sm">
          Button
        </Button>
      </div>
    </div>
  );
}
