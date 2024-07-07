import React, { useContext, useEffect, useState } from "react";
import { midiNotes } from "../../Constants/midiNotes";
import {
  SelectedNoteContext,
  SelectedNoteContextType,
} from "../../Context/SelectedNoteContext";

function Keyboard() {
  const { selectedNote, setSelectedNote } =
    useContext<SelectedNoteContextType>(SelectedNoteContext);

  useEffect(() => {
    const handleMouseUp = () => {
      setSelectedNote({ name: "", row: null, col: null });
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleKeyClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    note: string,
    row: number | null,
    col: number | null
  ) => {
    if (e.buttons === 1) {
      setSelectedNote({ name: note, row, col });
    }
  };

  const updateKeyClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    note: string,
    row: number | null,
    col: number | null
  ) => {
    if (e.buttons === 1) {
      setSelectedNote({ name: note, row, col });
    }
  };

  return (
    <div
      className="flex-wrap w-14"
      style={{
        gridTemplateRows: `repeat(72, 1fr)`,
      }}
    >
      {midiNotes.map((note, index) => (
        <div className="relative" key={note}>
          {note.includes("#") ? (
            // Black Keys
            <button
              className={`w-10 absolute  cursor-pointer border border-solid bg-bermuda z-10 ${
                note === selectedNote.name && "bg-dark-mode"
              }`}
              style={{ height: "19px", marginTop: "-8px" }}
              onMouseDown={(e) => handleKeyClick(e, note, index, 4)}
              onMouseUp={(e) => handleKeyClick(e, "", null, null)}
              onMouseEnter={(e) => updateKeyClick(e, note, index, 4)}
              onContextMenu={(e) => e.preventDefault()}
            ></button>
          ) : (
            // White Keys
            <button
              className={`w-full flex justify-end items-center text-xs font-medium p-1 cursor-pointer border border-solid ${
                note === selectedNote.name
                  ? "bg-dark-mode"
                  : note.includes("C") && !note.includes("#")
                  ? "bg-shadeGray"
                  : "bg-white"
              }`}
              //If notes are D,G, or A, make the key bigger (35px) else (28px)
              style={{
                height:
                  note.includes("D") || note.includes("G") || note.includes("A")
                    ? "35px"
                    : "28px",
              }}
              onMouseDown={(e) => handleKeyClick(e, note, index, 4)}
              onMouseUp={(e) => handleKeyClick(e, "", null, null)}
              onMouseEnter={(e) => updateKeyClick(e, note, index, 4)}
              onContextMenu={(e) => e.preventDefault()}
            >
              {note.includes("C") && !note.includes("#") && note}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
