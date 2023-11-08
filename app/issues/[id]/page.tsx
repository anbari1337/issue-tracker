import { notFound } from "next/navigation";
import { getIssueById } from "../api/issues";

export default async function Page({ params }: { params: { id: string } }) {
  const issue = await getIssueById(params.id);

  if (!issue) return notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.createdAT.toDateString()}</p>
    </div>
  );
}
