import { Table } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";
import IssuesToolbar from "./components/IssuesToolbar";

const IssueLoadingPage = () => {
  const issues = Array(5).fill(0);
  return (
    <div>
      <IssuesToolbar />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue, index) => (
            // I used index here as a key because there will no operation because it's just a loading page !
            <Table.Row key={index}>
              <Table.RowHeaderCell>
                <Skeleton />
                <div className='block md:hidden'>
                  <Skeleton />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssueLoadingPage;
