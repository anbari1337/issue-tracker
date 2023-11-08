import { notFound } from "next/navigation";
import { getIssueById } from "../api/issues";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import Markdown from "react-markdown";

export default async function Page({ params }: { params: { id: string } }) {
  const issue = await getIssueById(params.id);

  if (!issue) return notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap='2' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text className='text-gray-500'>{issue.createdAT.toDateString()}</Text>
      </Flex>
      <Card className='prose mt-5'>
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
}
