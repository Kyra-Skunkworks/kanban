import { Component } from "React";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const columns = ["Pending", "In Progress", "Done"];

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook Dinner" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};

class Kanban extends Component {
  state = initialData;

  onDragEnd = (result) => {};

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId) => this.state.tasks[taskId]
          );
          return (
            <Column key={column.id} column={column} tasks={tasks}></Column>
          );
        })}
      </DragDropContext>
    );

    // return (
    //   <DragDropContext>
    //     columns.map((column) => ({/* <Column /> */}
    //     <Droppable>
    //       <Draggable>{column}</Draggable>
    //     </Droppable>
    //     ))
    //   </DragDropContext>
    // );
  }
}

export default Kanban;
