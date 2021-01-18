import React, { useState } from "react";
import "./Option.scss";
export const Option = (props) => {
  // onNotVisibleArea方法 子组件中修改visible的值，
  const {
    visible,
    onNotVisibleArea,
    setCurrErrors,
    optionList,
    onSetSelectValue,
    selectRef,
    onBlur,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(-1);
  // 根据当前点击的元素 调用onNotVisibleArea方法
  // 点击每一项
  function handleItem(e, index) {
    e.stopPropagation();
    setCurrentIndex(index);
    setCurrErrors("");
    onSetSelectValue({ label: e.target.innerHTML, value: "" });
    onNotVisibleArea(false);
  }
  // 点击取消
  function handleCancer() {
    onBlur();
    onSetSelectValue({ label: selectRef.current.value });
    onNotVisibleArea(false);
  }
  // 点击空白部分
  function bindBodyClick() {
    handleCancer();
  }
  if (visible) {
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "scroll";
  }
  return (
    <>
      <div
        onClick={(e) => {
          bindBodyClick();
        }}
        className={visible ? "select_option show" : "select_option hidden"}
      >
        <div className="option">
          <ul>
            {optionList.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={(e) => {
                    handleItem(e, index);
                  }}
                  className={currentIndex === index ? "actived" : "active"}
                >
                  {item}
                </li>
              );
            })}
          </ul>
          <div className="sure" onClick={handleCancer}>
            取消
          </div>
        </div>
      </div>
    </>
  );
};
