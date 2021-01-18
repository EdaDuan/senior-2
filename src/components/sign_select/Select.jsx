import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import FormHok from "../sign_form/FormHoc";
import { Option } from "../select_option/Option";
import { Input } from "../select_input/Input";
import { FormContext } from "../sign_form/Form";

import "./Select.scss";
const propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
};
const defaultProps = {
  value: "",
};
const Select = (props) => {
  const formContext = useContext(FormContext);
  const { status, setStatus } = formContext || {};
  const { label, name, placeholder, required } = props;
  // 控制option显示/隐藏
  const [visible, setVisible] = useState(false);
  // 存储select的值
  const [selectValue, setSelectValue] = useState({
    label: "",
    value: placeholder,
  });
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [selectOtherValue, setSelectOtherValue] = useState("");
  // 当前选择的菜单项
  const [currentItem, setCurrentItem] = useState(false);
  const [currErrors, setCurrErrors] = useState("");
  // 当前的input框
  const selectRef = useRef(null);
  const findText = (optionList, label) => {
    for (let key in optionList) {
      if (optionList[key].text === label && optionList[key].require) {
        return true;
      }
    }
    return false;
  };
  const getOption = (optionList) => {
    let option = [];
    Object.keys(optionList).forEach(function (index) {
      option.push(optionList[index].text);
    });
    return option;
  };
  useEffect(() => {
    if (status) {
      getValue();
      setStatus(false);
    }
    // 将option中的值存起来
    if (selectValue.label) {
      props.onChange(selectValue);
    }
    // 当有其他选项的时候
    if (props.optionList) {
      let res = props.optionList.find((item) => {
        return item.text === selectValue.label;
      });
      if (res && res.placeholder) {
        setCurrentItem(true);
        setInputPlaceholder(res.placeholder);
      } else {
        setCurrentItem(false);
      }
    }
  }, [selectValue, status]);

  // 为空判断
  const isEmpty = (obj) => {
    if (Object.keys(obj).length === 0) {
      return true; // 如果为空,返回true
    }
    return false;
  };
  const hasError = !isEmpty(props.errors);
  const renderErrors = () => {
    if (!hasError) {
      return null;
    }
    const errors = props.errors.map((errMsg, i) => (
      <li className="selectError" key={i}>
        <i className="icon icon-error"></i>
        <span>{errMsg}</span>
      </li>
    ));
    return <ul> {errors} </ul>;
  };
  const selectData = (e) => {
    setStatus(false);
    setVisible(true);
  };
  // option中点击空白区域
  const onBlur = (e) => {
    if (props.onBlur()) {
      props.onBlur();
    }
  };
  // 二级输入框失焦触发
  const getValue = (value) => {
    setSelectValue({ label: selectValue.label, value: value });
    props.onBlur(selectValue);
    if (findText(props.optionList, selectValue.label) && !value) {
      setCurrErrors("不能为空");
    } else {
      setCurrErrors("");
    }
  };
  // 二级输入框触发的onchange
  const onchang = (data) => {
    setSelectOtherValue(data);
    if (props.onChange) {
      props.onChange({ label: selectValue.label, value: data });
    }
  };
  return (
    <div>
      <div className="form-select-box">
        <div className="form-select-con">
          <div className="form-select-item clearfix">
            <span className="form-select-required">{required}</span>
            <label className="form-select-name">{label}</label>
            <div className="form-select-fl">
              <div className="form-select">
                <input
                  name={name}
                  placeholder={placeholder}
                  value={selectValue.label}
                  readOnly
                  onClick={selectData}
                  ref={selectRef}
                />
              </div>
              <i className="row icon icon-row"></i>
            </div>
          </div>
          {!currErrors ? renderErrors() : null}
        </div>
        {currentItem ? (
          <div>
            <Input
              validators={props.validators}
              placeholder={inputPlaceholder}
              onChange={(data) => {
                onchang(data);
              }}
              onBlur={getValue}
              value={selectOtherValue}
            />
            <li
              className={
                currErrors ? "seletInput errorShow" : "seletInput errorHidden"
              }
            >
              <i className="icon icon-error"></i>
              <span>{currErrors}</span>
            </li>
          </div>
        ) : null}
      </div>
      <Option
        visible={visible}
        setCurrErrors={setCurrErrors}
        onNotVisibleArea={setVisible}
        onSetSelectValue={setSelectValue}
        selectRef={selectRef}
        onBlur={onBlur}
        optionList={getOption(props.optionList)}
      />
    </div>
  );
};
Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
const FormSelect = FormHok(Select);
export { Select };
export default FormSelect;
