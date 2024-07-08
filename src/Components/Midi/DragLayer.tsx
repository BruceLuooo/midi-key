import { useDragLayer } from "react-dnd";
import { midiNotes } from "../../Constants/midiNotes";

export const DragLayer = () => {
  const { isDragging, item, initialOffset, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  if (!currentOffset || !initialOffset) {
    return null;
  } else {
  }

  // Calculate differences in pixels
  const deltaX = currentOffset.x - initialOffset.x;
  const deltaY = currentOffset.y - initialOffset.y;

  const colChange = Math.round(deltaX / 28.92);
  const rowChange = Math.round(deltaY / 18.08);

  function renderItem() {
    return (
      <div
        className="absolute top-0 left-0 w-full bg-white text-sm cursor-pointer"
        style={{
          gridRow: item.row + 1 + rowChange, // Adding 1 because gridRow is 1-based
          gridColumn: `${item.col + 1 + colChange} / span ${item.length}`, // Adding 1 because gridColumn is 1-based
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
