import { useEffect, useRef, useContext } from "react";
import Keyboard from "../Keyboard/Keyboard";
import MidiGrid from "../Midi/MidiGrid";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Main() {
  const scrollRef = useRef<HTMLDivElement>(null);

  //Displays the midi keyboard at the middle (C3-C4) during initial load
  useEffect(() => {
    if (scrollRef.current) {
      const middlePosition =
        scrollRef.current.scrollHeight / 2 - scrollRef.current.clientHeight / 2;
      scrollRef.current.scrollTop = middlePosition;
    }
  }, []);

  return (
    <div
      className="flex flex-row w-full h-3/4 overflow-y-scroll overflow-x-scroll"
      ref={scrollRef}
    >
      <Keyboard />
      <DndProvider backend={HTML5Backend}>
        <MidiGrid />
      </DndProvider>
    </div>
  );
}

export default Main;
