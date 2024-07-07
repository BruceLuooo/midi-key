import React, { ReactNode, createContext, useState } from "react";

type SelectedNote = {
  name: string;
  row: number | null;
  col: number | null;
};

export type SelectedNoteContextType = {
  selectedNote: SelectedNote;
  setSelectedNote: React.Dispatch<React.SetStateAction<SelectedNote>>;
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
  setSelectedNote: () => {}, // Placeholder function
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

  const [isMouseDown, setIsMouseDown] = useState(false);

  return (
    <SelectedNoteContext.Provider value={{ selectedNote, setSelectedNote }}>
      {children}
    </SelectedNoteContext.Provider>
  );
};
