import React, { useState, useEffect } from "react";
import "../css/EnrollInput.css";

function EnrollInput(props) {
  // 输入框中的默认值    保存数据中的键名（每个输入组件传进来的名字不一样）
  // storeData  存放数据的数组
  // onsetStoreData 修改数组里面的对象值
  const { placeholder, storeName, storeData, onsetStoreData } = props;
  const [inputData, setInputData] = useState("");

  useEffect(() => {});
  // 输入框中显示的值
  function change(event) {
    setInputData(event.target.value);
  }

  // 当失去光标时 修改对应storeData中的键名对应的值
  function changStoreData(event) {
    console.log(storeData);
    for (let key in storeData) {
      if (key === storeName) {
        if (storeName === "getWay") {
          storeData[storeName].value = event.target.value;
        } else storeData[key] = event.target.value;
      }
    }
  }
  return (
    <div className="enrollInput">
      <input
        autoComplete="off"
        placeholder={placeholder}
        value={inputData}
        onChange={(event) => {
          change(event);
        }}
        onBlur={(event) => {
          changStoreData(event);
        }}
        type="text"
      />
    </div>
  );
}
export default EnrollInput;
