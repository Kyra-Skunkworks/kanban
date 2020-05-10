import { Component } from "React";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";
import socket from "../../helpers/socket-io";

const Container = styled.div`
  display: flex;
`;

class Kanban extends Component {
  state = {
    tasks: {},
    columns: {},
    columnOrder: [],
  };

  componentDidMount() {
    socket.emit("fetchInitialData");
    socket.on("initialData", (initialData) => this.setState(initialData));
  }

  updateState = (newState) => {
    // TODO: optimize state updating.
    socket.emit("updateState", newState);
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };
      this.setState(newState);
      this.updateState(newState);
    } else {
      const startTaskIds = [...start.taskIds];
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = [...finish.taskIds];
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };

      this.setState(newState);
      this.updateState(newState);
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => this.state.tasks[taskId]
            );
            return (
              <Column key={column.id} column={column} tasks={tasks}></Column>
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}

export default Kanban;
