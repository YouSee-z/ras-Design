import type { FC, PropsWithChildren } from "react";
import { createContext, useContext } from "react";

const IsolatorContext = createContext({});
//@ts-ignore
export const IsolatorProvider: FC<PropsWithChildren<unknown>> = (props) => {
  return (
    <IsolatorContext.Provider value={{}}>
      {props.children}
    </IsolatorContext.Provider>
  );
};

export const IsolatorConsumer: FC<PropsWithChildren<unknown>> = (props) => {
  useContext(IsolatorContext);
  return <>{props.children}</>;
};
