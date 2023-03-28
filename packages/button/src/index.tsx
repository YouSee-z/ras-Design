import React, { useState } from "react";
import { commonData } from "@rasDesign/utils";
// import "./index.module.sass";

interface Props {
  className: string;
}

export default function Button({ className }: Props) {
  //   test();
  console.log(commonData);
  return (
    <>
      <div className="my-component">table</div>
    </>
  );
}
