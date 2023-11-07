import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button>
        <Link href={"/issue/new"}>New Issue</Link>
      </Button>
    </div>
  );
}
