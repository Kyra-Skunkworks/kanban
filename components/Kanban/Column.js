import { Component } from "React";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

class Column extends Component {
  render() {
    const { column, tasks } = this.props;

    return (
      <Container>
        <Title>{column.title}</Title>
        <Droppable droppableId={column.id}>
          {(provided) => (
            <TaskList {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index}></Task>
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}

export default Column;
