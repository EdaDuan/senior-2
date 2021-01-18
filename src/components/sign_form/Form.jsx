import React, { useState } from "react";
import PropTypes from "prop-types";
// 数据验证
const propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
// 初始化结构
const initState = () => {
  return {
    data: {},
    validators: {},
    errors: {},
    rules: {},
    optionList: {},
  };
};
// 全局树
let FormContext;
const { Provider } = (FormContext = React.createContext());
const Form = (props) => {
  // 表单数据存储结构
  const [formState, setFormState] = useState(initState());
  const [status, setStatus] = useState(false);
  // 提交
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      props.onSubmit(formState.data);
    } else {
      setStatus(true);
    }
  };
  // 为空判断
  const isEmpty = (obj) => {
    if (Object.keys(obj).length === 0) {
      return true; // 如果为空,返回true
    }
    return false;
  };
  const findName = (optionList, label) => {
    for (var key in optionList) {
      //执行相关操作
      if (optionList[key].text === label && optionList[key].require)
        return true;
    }
  };
  // 注册功能  从输入中复制
  const registerInput = ({ name, validators, rules, optionList }) => {
    setFormState((state) => {
      return {
        ...state,
        validators: {
          ...state.validators,
          [name]: validators || [],
        },
        rules: {
          ...state.rules,
          [name]: rules,
        },
        optionList: {
          ...state.optionList,
          [name]: optionList,
        },
      };
    });
  };
  // 输入改变时保存输入框里面的值
  const setFieldValue = (name, value) => {
    setFormState((state) => {
      return {
        ...state,
        data: {
          ...state.data,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: [],
        },
      };
    });
  };
  const setFieldError = (name, error) => {
    setFormState((state) => {
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: error,
        },
      };
    });
  };
  // 输入验证 输入值 整个的数据对象 交叉输入验证
  const validate = () => {
    const { validators } = formState;
    setFormState((state) => ({
      ...state,
      errors: {},
    }));
    if (isEmpty(validators)) {
      return true;
    }
    // validators 验证器
    const formErrors = Object.entries(validators).reduce(
      (errors, [name, validators]) => {
        const { data, rules, optionList } = formState;
        // 从验证函数中拿错误提示消息
        const messages = validators.reduce((result, validator) => {
          const value = data[name];
          const rule = rules[name];
          const list = optionList[name];
          let err = validator(value, rule);
          if (typeof value === "object" && findName(list, value.label)) {
            err = validator(value.value);
          }
          return [...result, ...err];
        }, []);
        if (messages.length > 0) {
          errors[name] = messages;
        }
        return errors;
      },
      {}
    );
    if (isEmpty(formErrors)) {
      return true;
    }
    setFormState((state) => ({
      ...state,
      errors: formErrors,
    }));
    return false;
  };
  const providerValue = {
    data: formState.data,
    errors: formState.errors,
    status: status,
    setStatus: setStatus,
    setFieldValue,
    registerInput,
    setFieldError,
  };
  return (
    <Provider value={providerValue}>
      <form onSubmit={onSubmit}>{props.children}</form>
    </Provider>
  );
};
Form.propTypes = propTypes;
export default Form;
export { FormContext };
