import React, { useEffect } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes } from "./ItemTypes";

type NoteProps = {
  id: string;
  note: string;
  row: number;
  col: number;
  length: number;
  handleOnClick: (
    e: React.MouseEvent<HTMLDivElement>,
    note: string,
    row: number,
    col: number
  ) => void;
  handleOnMouseMove: (
    e: React.MouseEvent<HTMLDivElement>,
    note: string,
    row: number | null,
    col: number | null
  ) => void;
  // moveNote: (id: string, row: number, col: number) => void;
};

function Note({
  id,
  note,
  row,
  col,
  length,
  handleOnClick,
  handleOnMouseMove,
}: NoteProps) {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      // "type" is required. It is used by the "accept" specification of drop targets.
      type: ItemTypes.BOX,
      item: { id, note, row, col, length },
      // The collect function utilizes a "monitor" instance (see the Overview for what this is)
      // to pull important pieces of state from the DnD system.
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, note, row, col, length]
  );

  //removes ghost image onDrag
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full bg-white text-sm cursor-pointer"
      style={{
        gridRow: row + 1, // Adding 1 because gridRow is 1-based
        gridColumn: `${col + 1} / span ${length}`, // Adding 1 because gridColumn is 1-based
        zIndex: 1000,
        height: "18.09px",
        opacity: isDragging ? 0 : 1,
      }}
      ref={drag}
      onContextMenu={(e) => handleOnClick(e, note, row, col)}
      onMouseMove={(e) => handleOnMouseMove(e, note, row, col)}
    >
      {note}
    </div>
  );
}

export default Note;
