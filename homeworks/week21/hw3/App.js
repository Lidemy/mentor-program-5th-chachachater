// import { Board } from "./components";
import React, { useState, useRef, useEffect } from "react";
import "./App.css";
function Form(props) {
  const [state, setState] = useState({
    nickname: null,
    email: null,
    phone: null,
    application: {
      type1: null,
      type2: null,
    },
    question: null,
    advice: null,
  });

  const handleChange = (e) => {
    setState({
      value: e.target.value,
    });
  };

  const handleNicknameChange = (e) => {
    setState({
      ...state,
      nickname: e.target.value,
    });
  };

  const handleMailChange = (e) => {
    setState({
      ...state,
      email: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    setState({
      ...state,
      phone: e.target.value,
    });
  };

  const handleAppliction1Change = (e) => {
    setState({
      ...state,
      application: {
        type1: e.target.checked,
        type2: false,
      },
    });
  };

  const handleAppliction2Change = (e) => {
    setState({
      ...state,
      application: {
        type1: false,
        type2: e.target.checked,
      },
    });
  };

  const handleQuestionChange = (e) => {
    setState({
      ...state,
      question: e.target.value,
    });
  };

  const handleAdviceChange = (e) => {
    setState({
      ...state,
      advice: e.target.value,
    });
  };

  const getNoticeDiv = (id) => {
    return document.getElementById(id);
  };

  const checkForm = (state) => {
    const formData = state;
    const notRequiredList = ["advice"];
    let isValid = true;

    for (const [key, value] of Object.entries(formData)) {
      if (notRequiredList.every((each) => each === key)) {
        continue;
      }
      if (typeof value === "object" && value !== null) {
        if (!value.type1 && !value.type2) {
          isValid = false;
          getNoticeDiv(key).classList.remove("hide");
        } else {
          getNoticeDiv(key).classList.add("hide");
        }
      } else {
        if (!value) {
          isValid = false;
          getNoticeDiv(key).nextElementSibling.classList.remove("hide");
          console.log(getNoticeDiv(key));
        } else {
          getNoticeDiv(key).nextElementSibling.classList.add("hide");
        }
      }
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    const isValid = checkForm(state);
    if (isValid) {
      const application = Object.entries(state.application).filter(
        (each) => each[1]
      );
      alert(
        `
      暱稱:${state.nickname}
      電子郵件:${state.email}
      手機號碼:${state.phone}
      報名類型:${application[0][0]}
      怎麼知道這個活動的？${state.question}
      對活動的一些建議:${state.advice}
      `
      );
    }
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} method="POST" action="#">
      <h1>新拖延運動報名表單</h1>

      <ul>
        <li>活動日期：2020/12/10 ~ 2020/12/11</li>
        <li>活動地點：台北市大安區新生南路二段1號</li>
      </ul>
      <p class="require">
        <sup>*</sup>必填
      </p>

      <section class="basic-information required">
        <label for="nickname">
          暱稱<sup>*</sup>
        </label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          placeholder="您的回答"
          value={state.nickname}
          onChange={handleNicknameChange}
        />
        <div class="notice hide">請輸入暱稱</div>
      </section>

      <section class="basic-information required">
        <label for="email">
          電子郵件<sup>*</sup>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="您的電子郵件"
          value={state.email}
          onChange={handleMailChange}
        />
        <div class="notice hide">請輸入電子郵件</div>
      </section>

      <section class="basic-information required">
        <label for="phone">
          手機號碼<sup>*</sup>
        </label>
        <input
          type="number"
          name="phone"
          id="phone"
          placeholder="您的手機號碼"
          value={state.phone}
          onChange={handlePhoneChange}
        />
        <div class="notice hide">請輸入手機號碼</div>
      </section>

      <section class="type-of-application">
        報名類型<sup>*</sup>
        <section class="required">
          <div class="wrapper">
            <input
              type="radio"
              name="type-of-application"
              value="A"
              id="type1"
              checked={state.application.type1}
              onChange={handleAppliction1Change}
            />
            <label for="type1">躺在床上用想像力實作</label>
          </div>
          <div class="wrapper">
            <input
              type="radio"
              name="type-of-application"
              value="B"
              id="type2"
              checked={state.application.type2}
              onChange={handleAppliction2Change}
            />
            <label for="type2">趴在地上滑手機找現成的</label>
          </div>
          <div class="wrapper">
            <div id="application" class="notice hide">
              請輸選擇報名類型
            </div>
          </div>
        </section>
      </section>

      <section class="question required">
        <label for="question">
          怎麼知道這個活動的？<sup>*</sup>
        </label>
        <input
          type="text"
          name="question"
          id="question"
          placeholder="您的回答"
          value={state.question}
          onChange={handleQuestionChange}
        />
        <div class="notice hide">請輸入訊息來源</div>
      </section>

      <section class="advice">
        <div class="wrapper">
          <label for="advice">
            其他
            <p>對活動的一些建議</p>
          </label>
        </div>
        <input
          type="text"
          name="advice"
          id="advice"
          placeholder="您的回答"
          value={state.adviceValue}
          onChange={handleAdviceChange}
        />
      </section>

      <input class="button" type="submit" value="提交" />
    </form>
  );
}

function App() {
  return <Form />;
}

export default App;
