import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const columns = ["Pending", "In Progress", "Done"];

const Kanban = props =>
  columns.map(column => (
    <DragDropContext>
      <Column />
    </DragDropContext>
  ));

export default Kanban;
