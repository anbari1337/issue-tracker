import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { HiOutlinePencilAlt } from "react-icons/hi";

const EditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Link
        href={`/issues/${issueId}/edit`}
        className='flex items-center gap-1'
      >
        <HiOutlinePencilAlt />
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditButton;
