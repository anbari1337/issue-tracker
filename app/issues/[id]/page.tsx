import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { getIssueById } from "../api/issues";
import EditButton from "../components/EditButton";
import IssueDetails from "../components/IssueDetails";

export default async function Page({ params }: { params: { id: string } }) {
  const issue = await getIssueById(params.id);

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap='5'>
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditButton issueId={issue.id} />
      </Box>
    </Grid>
  );
}
