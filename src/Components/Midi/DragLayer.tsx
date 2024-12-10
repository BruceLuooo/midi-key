import { useDragLayer } from "react-dnd";
import { midiNotes } from "../../Constants/midiNotes";
import { useContext, useEffect } from "react";
import {
    SelectedNoteContext,
    SelectedNoteContextType,
} from "../../Context/SelectedNoteContext";

export const DragLayer = () => {
    const { setSelectedNote } =
        useContext<SelectedNoteContextType>(SelectedNoteContext);

    const { isDragging, item, initialOffset, currentOffset } = useDragLayer(
        (monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        })
    );

    const deltaX = (currentOffset?.x ?? 0) - (initialOffset?.x ?? 0);
    const deltaY = (currentOffset?.y ?? 0) - (initialOffset?.y ?? 0);

    const colChange = Math.round(deltaX / 28.92);
    const rowChange = Math.round(deltaY / 18.08);

    // Update selected note only when dragging and item is present
    useEffect(() => {
        if (isDragging && item) {
            setSelectedNote({
                name: midiNotes[item.row + rowChange] || item.note, // Ensure valid note
                row: item.row + rowChange,
                col: item.col + colChange,
            });
        }
    }, [isDragging, item, rowChange, colChange, setSelectedNote]);

    if (!currentOffset || !initialOffset || !isDragging) {
        return null;
    }

    function renderItem() {
        return (
            <div
                className="absolute top-0 left-0 w-full bg-white text-sm cursor-pointer"
                style={{
                    gridRow: item.row + 1 + rowChange, // Adding 1 because gridRow is 1-based
                    gridColumn: `${item.col + 1 + colChange} / span ${
                        item.length
                    }`, // Adding 1 because gridColumn is 1-based
                    zIndex: 1000,
                    height: "18.09px",
                }}
            >
                {midiNotes[item.row + rowChange]}
            </div>
        );
    }

    if (!isDragging) {
        return null;
    }

    return (
        <div>
            <div>{renderItem()}</div>
        </div>
    );
};
