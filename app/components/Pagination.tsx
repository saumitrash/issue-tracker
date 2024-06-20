import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  itemCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const totalPages = Math.ceil(itemCount / pageSize);
  if (totalPages === 0) {
    return null;
  }
  return (
    <Flex align="center" gap="3">
      <Text>
        Page {currentPage} of {Math.ceil(itemCount / pageSize)}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <ArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === totalPages}>
        <ArrowRightIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === totalPages}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
