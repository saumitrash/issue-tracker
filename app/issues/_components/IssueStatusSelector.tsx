import { IssueStatusBadge } from "@/app/components";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

interface Props {
  value: string;
  onChange: any;
  defaultValue: Status;
}

const IssueStatusSelector = ({ value, defaultValue, onChange }: Props) => {
  return (
    <Select.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onChange}
    >
      <Select.Trigger placeholder="Status" variant="soft" />

      <Select.Content variant="soft">
        <Select.Item value="OPEN">
          <IssueStatusBadge status="OPEN" />
        </Select.Item>
        <Select.Item value="IN_PROGRESS">
          <IssueStatusBadge status="IN_PROGRESS" />
        </Select.Item>
        <Select.Item value="CLOSED">
          <IssueStatusBadge status="CLOSED" />
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusSelector;
