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
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";

// core components

import Header from "components/Headers/Header.js";
import AdminNavbar from "components/Navbars/AdminNavbar";

//For Demo

const Workbench = (props) => {
  const [locate, setLocate] = useState("Local");
  const [dbms, setDbms] = useState("RDBMS");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const history = useHistory();

  const handleSubmitDemo = async (e) => {
    e.preventDefault();

    try {
      // 로그인 정보를 서버로 전송
      const response = await axios.post(
        "http://localhost:40400/admin/workbench",
        {
          dbms: dbms,
          host: host,
          port: port,
          demo: "O",
        }
      );
      history.push("/admin/energy");
      // 로그인 성공 시 처리
      // 예: 로그인 상태를 관리하는 상태(State) 업데이트 또는 리다이렉트
    } catch (error) {
      console.error(error);
      // 로그인 실패 시 처리
      // 예: 오류 메시지 표시 또는 로그인 실패 상태(State) 업데이트
    }
  };
  const handleSubmitSignin = async (e) => {
    e.preventDefault();

    try {
      // 로그인 정보를 서버로 전송
      const response = await axios.post(
        "http://localhost:40400/admin/workbench",
        {
          dbms: dbms,
          host: host,
          port: port,
          demo: "X",
        }
      );

      history.push("/admin/energy");
      // 로그인 성공 시 처리
      // 예: 로그인 상태를 관리하는 상태(State) 업데이트 또는 리다이렉트
    } catch (error) {
      console.error(error);
      // 로그인 실패 시 처리
      // 예: 오류 메시지 표시 또는 로그인 실패 상태(State) 업데이트
    }
  };

  return (
    <>
      <AdminNavbar />
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="justify-content-center mt-9">
          <img src={require("../assets/img/brand/logo.png")} alt="..." />
        </Row>
        <Row className="mt-5 justify-content-center">
          <Col xl="6">
            <Card className="shadow">
              <CardHeader className="border-1 bg-primary">
                <Row className="align-items-center">
                  <div className="col text-center">
                    <h1 className=" text-white">Login</h1>
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                  <FormGroup>
                    <div className="custom-control custom-control-alternative custom-radio mb-3 align-self-auto">
                      <Input
                        className="custom-control-input"
                        defaultChecked
                        id="RDBMS"
                        name="DBMS"
                        type="radio"
                        value={"RDBMS"}
                        onChange={(e) => setDbms(e.target.value)}
                      />
                      <label
                        className="custom-control-label text-xl font-weight-bold"
                        htmlFor="RDBMS"
                      >
                        RDBMS
                      </label>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-circle-08" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Host"
                        type="text"
                        autoComplete="new-Host"
                        onChange={(e) => setHost(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-tag" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Port"
                        type="text"
                        autoComplete="new-Port"
                        onChange={(e) => setPort(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <ButtonGroup className="col-10">
                      <Button
                        className="px-4 text-lg"
                        outline
                        color="primary"
                        size="lg"
                        value={"Local"}
                        onClick={(e) => setLocate(e.target.value)}
                        active={locate === "Local"}
                      >
                        Local
                      </Button>
                      <Button
                        className="px-4 text-lg"
                        outline
                        color="primary"
                        size="lg"
                        value={"Cloud"}
                        onClick={(e) => setLocate(e.target.value)}
                        active={locate === "Cloud"}
                      >
                        Cloud
                      </Button>
                    </ButtonGroup>
                  </div>

                  <div className="text-center">
                    <Button
                      className=" col-5 mt-5 text-lg "
                      color="success"
                      type="submit"
                      onClick={handleSubmitDemo}
                    >
                      For Demo
                    </Button>
                    <Button
                      className=" col-5  mt-5 text-lg "
                      color="primary"
                      type="button"
                      onClick={handleSubmitSignin}
                    >
                      Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Workbench;
