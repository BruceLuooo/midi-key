import { useContext, useState, useEffect, ButtonHTMLAttributes } from "react";
import { v4 as uuidv4 } from "uuid";
import { midiNotes } from "../../Constants/midiNotes";
import {
  SelectedNoteContextType,
  SelectedNoteContext,
} from "../../Context/SelectedNoteContext";
import { useDrop } from "react-dnd";
import Note from "./Note";
import { DragLayer } from "./DragLayer";
import { ItemTypes } from "./ItemTypes";

type MidiNoteType = {
  id: string;
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
        id: uuidv4(),
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
      // setSelectedNote({ name: note, row, col });
    } else if (e.buttons === 2) {
      let updateMidi = midi.filter(
        (midi) => !(midi.note === note && midi.col === col)
      );
      setMidi(updateMidi);
    }
  };

  const updateNotePosition = (
    id: string,
    note: string,
    row: number,
    col: number
  ) => {
    setMidi((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          // Create a new object with the updated data
          return {
            ...item,
            note: midiNotes[item.row + row],
            row: item.row + row,
            col: item.col + col,
          };
        }
        // Return the original object if no match is found
        return item;
      });
    });
  };

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: MidiNoteType, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number;
          y: number;
        };

        const colChange = Math.round(delta.x / 28.92);
        const rowChange = Math.round(delta.y / 18.08);

        updateNotePosition(item.id, item.note, rowChange, colChange);
        return undefined;
      },
    }),
    [updateNotePosition]
  );

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
      ref={drop}
    >
      {gridItems}
      <DragLayer />
      {midi.map((midi, index) => (
        <Note
          key={midi.id}
          id={midi.id}
          note={midi.note}
          row={midi.row}
          col={midi.col}
          length={midi.length}
          handleOnClick={handleOnClick}
          handleOnMouseMove={handleOnMouseMove}
        />
      ))}
    </div>
  );
}

export default MidiGrid;
