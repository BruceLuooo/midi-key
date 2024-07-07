import { useContext, useState, useEffect, ButtonHTMLAttributes } from "react";
import { midiNotes } from "../../Constants/midiNotes";
import {
  SelectedNoteContextType,
  SelectedNoteContext,
} from "../../Context/SelectedNoteContext";

type MidiNoteType = {
  note: string;
  row: number;
  col: number;
  length: number;
};

type Midi = MidiNoteType[];

function MidiGrid() {
  const { selectedNote, setSelectedNote } =
    useContext<SelectedNoteContextType>(SelectedNoteContext);

  const [cols, setCols] = useState(64);
  const [noteLength, setNoteLength] = useState(4);
  const [midi, setMidi] = useState<Midi>([]);

  useEffect(() => {
    const handleMouseUp = () => {
      setSelectedNote({ name: "", row: null, col: null });
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleOnClick = (
    e: React.MouseEvent<HTMLDivElement>,
    note: string,
    row: number,
    col: number
  ) => {
    // Handles left click on MIDI grid
    if (e.buttons === 1) {
      setSelectedNote({ name: note, row, col });

      let addMidi = {
        note,
        row,
        col,
        length: noteLength,
      };

      setMidi([...midi, addMidi]);
    } else if (e.buttons === 2) {
      e.preventDefault();
      let updateMidi = midi.filter(
        (midi) => !(midi.note === note && midi.col === col)
      );

      setMidi(updateMidi);
    }
  };

  const handleOnMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    note: string,
    row: number | null,
    col: number | null
  ) => {
    if (e.buttons === 1) {
      setSelectedNote({ name: note, row, col });
    } else if (e.buttons === 2) {
      let updateMidi = midi.filter(
        (midi) => !(midi.note === note && midi.col === col)
      );
      setMidi(updateMidi);
    }
  };

  // Generates grid rows and columns for each MIDI note, creating buttons for each grid cell.
  const gridItems = midiNotes.flatMap((note, rowIndex) =>
    Array.from({ length: cols }).map((_, colIndex) => (
      <div
        key={`${rowIndex}-${colIndex}`}
        className={`${
          selectedNote.name === note ? "bg-dark-mode" : "bg-gray-600"
        } cursor-pointer border border-solid text-xs`}
        style={{ height: "18.09px", zIndex: 1 }}
        onMouseDown={(e) => handleOnClick(e, note, rowIndex, colIndex)}
        onMouseMove={(e) => handleOnMouseMove(e, note, rowIndex, colIndex)}
        onContextMenu={(e) => e.preventDefault()}
      ></div>
    ))
  );

  return (
    <div
      className="relative grid w-full"
      style={{
        gridTemplateRows: `repeat(72, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
    >
      {gridItems}
      {midi.map((midi, index) => (
        <div
          key={index}
          className="absolute top-0 left-0 w-full bg-white text-sm cursor-pointer"
          style={{
            gridRow: midi.row + 1, // Adding 1 because gridRow is 1-based
            gridColumn: `${midi.col + 1} / span ${midi.length}`, // Adding 1 because gridColumn is 1-based
            zIndex: 1000,
            height: "18.09px",
          }}
          onMouseMove={(e) =>
            handleOnMouseMove(e, midi.note, midi.row, midi.col)
          }
          onContextMenu={(e) => handleOnClick(e, midi.note, midi.row, midi.col)}
        >
          {midi.note}
        </div>
      ))}
    </div>
  );
}

export default MidiGrid;
