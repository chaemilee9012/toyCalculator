import React, { useState } from 'react';
import styled from 'styled-components';
import Functions from './buttons/Functions';
import Nums from './buttons/Nums';
import Operands from './buttons/Operands';
import ResultWindow from './ResultWindow';

const CalculatorStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  
  form {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    button {
      border: 1px solid #333;
      border-radius: 4px;
      height: 70px;
      outline-style: none;

      &:hover {
        background: #333;
        color: #fff;
      }

      &:active {
        background: #444;
      }
    }
  }
`;

const Calculator = () => {
  const [btnText, setBtnText] = useState(''); // 현재 입력값
  const [operA, setOperA] = useState(''); // 현재 연산자
  const [operB, setOperB] = useState(operA); // 이전 연산자
  const [result, setResult] = useState(0); // 현재 결과
  const [calText, setCalText] = useState(result); // 이전 입력값
  let textContent;

  const _clickNum = e => {
    textContent = e.target.textContent;
    e.preventDefault();
    setBtnText(parseInt(btnText + textContent));
    console.log(btnText);
  };

  const _clickSubmit = e => {
    e.preventDefault();
    // console.log(result);
  }

  const calculate = (operA, btnText, calText) => {
    console.log(btnText, calText);
    switch (operA){ // 이전 연산자를 받아서 switch문으로 각 operand에 따라 계산되도록
    case '+':
      setResult(btnText + calText);
      console.log('+ result', result);
      break;
    case '-':
      setResult(parseInt(btnText - calText));
      console.log('- result', result);
      break;
    case '*':
      setResult(parseInt(btnText * calText));
      console.log('* result', result);
      break;
    case '/':
      setResult(parseInt(btnText / calText));
      console.log('/ result', result);
      break;
    default :
      setResult(btnText);
      console.log('default result', result);
      break;
    }

    return (result);
  };

  const _clickOper = e => { // calText, btnText 연산 실행
    textContent = e.target.textContent;
    e.preventDefault();

    setOperA(textContent);
    console.log('operA', operA);

    calculate(operA, btnText, calText); // 연산
    
    setCalText(result); // 이전에 연산한 값
    console.log('calText', calText);

    setOperB(operA) // 현재 연산자를 다음 연산자로 저장
    console.log('operB', operB);
    console.log('total_result', result);
  }

  const _clickFunc = e => {
    e.preventDefault();

    const clearing = () => {
      console.log('clear');
      setBtnText('');
    };

    const erasing = () => {
      console.log('erase');
      setBtnText(btnText.slice(0, btnText.length - 1));
    };

    switch(e.target.className) {
      case 'clear':
        clearing();
        break;

      case 'erase':
        erasing();
        break;

      default: return;
    }
  };

  return (
    <CalculatorStyled>
      <ResultWindow
        clickRecord={btnText}
        className="ResultWindow"
      />
      <form
        action="/"
        id="calculator"
        method="get"
        name="calculator"
      >
        <Functions
          clickFunc={_clickFunc}
        />
        <Nums
          clickBtn={_clickNum}
          clickSubmit={_clickSubmit}
        />
        <Operands
          clickBtn={_clickOper}
        />
      </form>
    </CalculatorStyled>
  );
};

export default Calculator;