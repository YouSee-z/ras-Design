import React, { useState } from "react";
import { Button, Modal } from "antd";

interface Props {
  className: string;
}

export default function Table({ className }: Props) {
  const [open, setopen] = useState(false);
  return (
    <>
      <div>table</div>
    </>
  );
}
