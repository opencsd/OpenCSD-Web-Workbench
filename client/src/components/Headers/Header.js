/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
const TabMenu = styled.ul`
  background: #e9ecef;
  color: #8898aa;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-top: 10px;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    /* justify-content: space-between;
    width: 380px;
    heigth: 30px; */
    width: calc(100% / 5);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background: linear-gradient(87deg, #adb5bd 0, #adaebd 100%) !important;
    color: rgb(21, 20, 20);
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div``;

const Header = () => {
  const [currentTab, clickTab] = useState(0);
  const [menuArr, setMenuArr] = useState([
    { name: "Add Tab", content: "Tab menu ONE" },
  ]);

  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
    if (index === menuArr.length - 1 && menuArr.length <= 10) {
      menuArr[menuArr.length - 1] = {
        name: "New Tab",
        content: "Tab menu ONE",
      };
      if (menuArr.length === 10) setMenuArr([...menuArr]);
      else
        setMenuArr([...menuArr, { name: "Add Tab", content: "Tab menu ONE" }]);
    }
  };
  return (
    <>
      <div className="header bg-lighter pb-2  pt-md-5 ">
        {/* <Row>
          <Col xl="1" className="px-0"></Col>

          <Col xl="10" className="px-0">
            <TabMenu className="my-0">
              {/* <li className="submenu">{menuArr[0].name}</li>
          <li className="submenu">{menuArr[1].name}</li>
          <li className="submenu">{menuArr[2].name}</li>
              {menuArr.map((el, index) => (
                <li
                  key={index}
                  className={
                    index === currentTab ? "submenu focused" : "submenu"
                  }
                  onClick={() => selectMenuHandler(index)}
                >
                  {el.name}
                </li>
              ))}
            </TabMenu>
          </Col>
        </Row> */}
      </div>
      <div className="header bg-gradient-light pb-4  pt-md-5"></div>
    </>
  );
};

export default Header;
