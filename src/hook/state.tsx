/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react";

export const ContextState = createContext({});

interface ChildrenProps {
  children?: ReactNode;
}

function ContextStateProvider({ children }: ChildrenProps) {
  const [isFocus, setIsFocus] = useState<string>("usuario");

  return (
    <>
      <ContextState.Provider value={{ isFocus, setIsFocus }}>
        {children}
      </ContextState.Provider>
    </>
  );
}

function useContextState() {
  const context = useContext(ContextState);

  return context;
}

export { ContextStateProvider, useContextState };
