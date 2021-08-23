import styled from "styled-components";
import { MEDIA_QUERY_MD, MEDIA_QUERY_SM } from "./constansts/style.js";

const TodoItemWrapper = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 10px 10px;
  align-items: center;
  justify-content: space-between;
  & + & {
    margin-top: 20px;
  }
`;
const TodoContent = styled.div`
  color: ${(props) => props.theme.colors.font};
  ${MEDIA_QUERY_MD} {
    font-size: 16px;
  }
  ${MEDIA_QUERY_SM} {
    font-size: 12px;
  }
  // 透過三源運算子來修改
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
  `}
`;
const TodoButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Button = styled.button`
  padding: 5px;
  margin-top: 5px;
  & + & {
    margin-left: 10px;
  }
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.first_button};
  ${MEDIA_QUERY_MD} {
    font-size: 16px;
  }
  ${MEDIA_QUERY_SM} {
    font-size: 12px;
  }
`;
const DeletedButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.second_button};
  color: ${(props) => props.theme.colors.button_font};
`;

function TodoItem(props) {
  return (
    <TodoItemWrapper className={props.className}>
      <TodoContent
        $size={props.size}
        data-todo-id={props.todo.id}
        $isDone={props.todo.isDone}
      >
        {props.content}
      </TodoContent>
      <TodoButtonWrapper>
        <Button
          onClick={() => {
            props.handleIsDoneButton(props.todo.id);
          }}
        >
          {props.todo.isDone ? "已完成" : "未完成"}
        </Button>
        <DeletedButton
          onClick={() => {
            props.handleDeleteTodo(props.todo.id);
          }}
        >
          刪除
        </DeletedButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}

const TodoTitleWrapper = styled.div`
  width: 70%;
  margin: 20px auto;
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 10px 10px;
  flex-direction: column;
`;
const Title = styled.div`
  ${MEDIA_QUERY_MD} {
    font-size: 36px;
  }
  ${MEDIA_QUERY_SM} {
    font-size: 24px;
  }
  text-align: center;
`;
const TodoInput = styled.input`
  ${MEDIA_QUERY_MD} {
    font-size: 16px;
  }
  ${MEDIA_QUERY_SM} {
    font-size: 12px;
  }
  margin: 10px;
`;

function TodoTitle(props) {
  return (
    <TodoTitleWrapper className={props.className}>
      <Title>{props.title}</Title>
      <TodoInput
        className="input-block"
        type="text"
        placeholder="to do what? press enter to add todo."
        onKeyDown={(e) => {
          props.handleAddTodo(e);
        }}
        onChange={(e) => {
          props.handleInputChange(e);
        }}
      />
      <TodoButtonWrapper
        onClick={(e) => {
          props.handleButtonClick(e);
        }}
      >
        <Button className="all-btn">All Todo</Button>
        <Button className="completed-btn">Completed Todo</Button>
        <Button className="umcompleted-btn">Uncompleted Todo</Button>
        <Button className="clean-btn">Clean up Todo</Button>
      </TodoButtonWrapper>
    </TodoTitleWrapper>
  );
}

export { TodoItem, TodoTitle };
