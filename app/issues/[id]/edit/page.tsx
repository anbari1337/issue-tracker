import { notFound } from "next/navigation";
import { getIssueById } from "../../api/issues";
import IssueForm from "../../components/IssueForm";

async function Page({ params }: { params: { id: string } }) {
  const issue = await getIssueById(params.id);

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}

export default Page;
