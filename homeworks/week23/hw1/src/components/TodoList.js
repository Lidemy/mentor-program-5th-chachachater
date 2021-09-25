import styled from "styled-components";
import { MEDIA_QUERY_MD, MEDIA_QUERY_SM } from "../constansts/style.js";

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

export default function TodoList(props) {
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
