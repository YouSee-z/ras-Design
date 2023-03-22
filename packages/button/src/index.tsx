import React, { useState } from "react";
import { test } from "@rasDesign/utils";

interface Props {
  className: string;
}

export default function Button({ className }: Props) {
  test();
  const [open, setopen] = useState(false);
  return (
    <>
      <div>table</div>
    </>
  );
}
