import React, { ReactNode, createContext, useState } from "react";

type SelectedNote = {
  name: string;
  row: number | null;
  col: number | null;
};

type cols = {
  col: number;
};

export type SelectedNoteContextType = {
  selectedNote: SelectedNote;
  setSelectedNote: React.Dispatch<React.SetStateAction<SelectedNote>>;
  cols: number;
  setCols: React.Dispatch<React.SetStateAction<number>>;
};

type Props = {
  children: ReactNode;
};

const initialSelectedNoteContext: SelectedNoteContextType = {
  selectedNote: {
    name: "",
    row: null,
    col: null,
  },
  setSelectedNote: () => {}, // Placeholder function,
  cols: 64,
  setCols: () => {}, // Placeholder function,
};

export const SelectedNoteContext = createContext<SelectedNoteContextType>(
  initialSelectedNoteContext
);

export const SelectedNoteProvider = ({ children }: Props) => {
  const [selectedNote, setSelectedNote] = useState<SelectedNote>({
    name: "",
    row: null,
    col: null,
  });

  // Initial amount of columns displayed.
  const [cols, setCols] = useState(64);

  return (
    <SelectedNoteContext.Provider
      value={{ selectedNote, setSelectedNote, cols, setCols }}
    >
      {children}
    </SelectedNoteContext.Provider>
  );
};
