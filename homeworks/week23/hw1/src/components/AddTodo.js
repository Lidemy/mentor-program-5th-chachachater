import styled from "styled-components";
import { MEDIA_QUERY_MD, MEDIA_QUERY_SM } from "../constansts/style.js";

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
export default function AddTodo(props) {
  return (
    <TodoTitleWrapper className={props.className}>
      <Title>{props.title}</Title>
      <TodoInput
        className="input-block"
        type="text"
        placeholder="to do what? press enter to add todo."
        value={props.inputValues}
        onKeyDown={(e) => {
          props.handleAddTodo(e);
        }}
        onChange={(e) => {
          props.handleInputChange(e);
        }}
      />
      <TodoButtonWrapper>
        <Button
          onClick={() => {
            props.filterAllTodo();
          }}
        >
          All Todo
        </Button>
        <Button
          onClick={() => {
            props.filterFinishedTodo();
          }}
        >
          Finished
        </Button>
        <Button
          onClick={() => {
            props.filterUnFinishedTodo();
          }}
        >
          Unfinished
        </Button>
        <Button
          onClick={() => {
            props.cleanTodo();
          }}
        >
          Clean up
        </Button>
      </TodoButtonWrapper>
    </TodoTitleWrapper>
  );
}
