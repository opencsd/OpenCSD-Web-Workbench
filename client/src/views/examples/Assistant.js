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
import Chart from "chart.js";
// react plugin used to create charts
import { React, useState } from "react";
import classnames from "classnames";
import { Line } from "react-chartjs-2";
import { CSSTransition } from "react-transition-group";

import {
  Badge,
  Card,
  CardHeader,
  Col,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Container,
  Row,
  CardBody,
  Button,
  Table,
  Form,
  Input,
} from "reactstrap";

import { chartOptions, parseOptions } from "variables/charts.js";
// core components
import Header from "components/Headers/Header.js";
import { energychart } from "variables/charts";
const Assistant = () => {
  const [value, setValue] = useState("CSD 1");
  const [energychartData, setenergychartData] = useState("data1");
  const [activeNav, setActiveNav] = useState(1);
  const [analysis, setAnalysis] = useState(false);
  const [ssh, setSSH] = useState(false);
  const [server, setServer] = useState("");
  const [invalid, setInvalid] = useState("");
  const [buttonColors, setButtonColors] = useState([
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
  ]);
  const energyMetric = ["CPU", "MEMORY", "DISK", "NETWORK", "BLOCK COUNT"];
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setenergychartData("data" + index);
  };
  const toggleButtonColor = (buttonName) => {
    const index = parseInt(buttonName.split(" ")[1]) - 1; // 버튼 이름에서 index 추출
    const newButtonColors = [...buttonColors];
    newButtonColors[index] =
      buttonColors[index] === "success" ? "danger" : "success";
    setButtonColors(newButtonColors);
  };

  const handleButtonClick = (e) => {
    let { value: buttonName } = e.target;
    if (buttonName === undefined) {
      buttonName = e.target.name;
    }
    setValue(buttonName);
    toggleButtonColor(buttonName);
  };
  const handleServer = (e) => {
    setServer(e.target.value);
  };
  const ConnetionSSH = (e) => {
    if (ssh === false) setSSH(true);
    else setSSH(false);
  };
  const AnalysisCSD = (e) => {
    const newButtonColors = [
      "success",
      "success",
      "success",
      "success",
      "success",
      "success",
      "success",
      "success",
    ];
    setButtonColors(newButtonColors);
    if (server) {
      setInvalid("");
      setAnalysis(true);
    } else {
      setInvalid("is-invalid");
    }
  };
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-9">
          <Col>
            <Card className="shadow">
              <CardHeader className="bg-transparent border-0">
                <Row className="align-items-center">
                  <h1 className="col-10 mb-0 text-primary">CSD Information</h1>
                  <div className="col-2 text-center"></div>
                </Row>
                <hr className="mt-3 mb-0" />
              </CardHeader>
              <CardBody className="mt-0">
                <Row className="align-items-center mb-4">
                  {/*<div className="col-2 align-items-center text-right">
                    <UncontrolledDropdown nav>
                      <DropdownToggle className="pr-0" nav>
                        Select Server &nbsp;
                        <i className="ni ni-bold-down" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        {Array.from({ length: 8 }, (_, i) => i).map((index) => (
                          <DropdownItem
                            key={index}
                            value={`Server 10.0.0.10${index}`}
                            onClick={handleDropdownClick}
                          >
                            <i
                              className="ni ni-bold-right"
                              key={index}
                              value={`Server 10.0.0.10${index}`}
                              onClick={handleDropdownClick}
                            />
                            <span
                              key={index}
                              value={`Server 10.0.0.10${index}`}
                              onClick={handleDropdownClick}
                            >{`Server 10.0.0.10${index}`}</span>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                        </div>*/}
                  <div className="col-2 text-right">
                    <Form>
                      <Input
                        className={invalid}
                        id="Server"
                        placeholder="Input Server"
                        type="text"
                        onChange={handleServer}
                      />
                    </Form>
                    <Button
                      className="mt-3"
                      color="primary"
                      size="lg"
                      type="submit"
                      onClick={AnalysisCSD}
                    >
                      CSD Analysis
                    </Button>
                  </div>
                  <div className="col-10 text-center">
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((index) => (
                      <Button
                        key={`${index}`}
                        color={buttonColors[index - 1]}
                        outline
                        className="mx-4"
                        value={`CSD ${index}`}
                        onClick={handleButtonClick}
                      >
                        <img
                          name={`CSD ${index}`}
                          alt="placeholder"
                          src={require("../../assets/img/icons/icons8-ssd-64.png")}
                        />
                        <br />
                        CSD {index}
                      </Button>
                    ))}
                  </div>
                </Row>
                <Row className="justify-content-end border-top ">
                  <Button
                    className="mr-6 mt-4"
                    color="success"
                    size="lg"
                    type="button"
                    onClick={ConnetionSSH}
                  >
                    SSH Connection
                  </Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {ssh && (
          <Row className="mt-5">
            <Col xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <h1 className="col mb-0 text-primary">SSH Connection</h1>
                  </Row>
                  <hr className="mt-3 mb-0" />
                </CardHeader>
                <CardBody>
                  <Row className="align-items-center">
                    <h2 className="mb-0 mx-2">Selected CSD</h2>
                    <Badge className="badge-lg text-sm" color="success">
                      {value}
                    </Badge>

                    <span className="ml-3 col-1">Full Recover</span>
                    <div className="mr-5">
                      <label className="custom-toggle mt-3">
                        <input type="checkbox" />
                        <span className="custom-toggle-slider rounded-circle " />
                      </label>
                    </div>
                    <div className="col-6">
                      <div className="progress-wrapper">
                        <div className="progress-info">
                          <div className="progress-label">
                            <span>Recover</span>
                          </div>
                          <div className="progress-percentage">
                            <span>78%</span>
                          </div>
                        </div>
                        <Progress
                          color="gradient-primary"
                          max="100"
                          value="78"
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <Button color="primary">Start Recover</Button>
                    </div>
                  </Row>
                  <Row className="align-items-center text-center mt-2">
                    <iframe
                      src="http://10.0.5.123:8888/?hostname=10.0.5.123&username=root&password=d25zZ3VyMiE="
                      width="100%"
                      height="500px"
                      title="wssh"
                    />
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
        <Row className="mt-5">
          <Col xl="12">
            <CSSTransition
              in={analysis && server}
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              <Card className="bg-default shadow ">
                <CardHeader className="bg-transparent border-0">
                  <Row className="align-items-center">
                    <h1 className="col-2 mb-0 text-white">CSD Metric</h1>
                    <Badge className="badge-lg text-sm" color="white">
                      {value}
                    </Badge>
                  </Row>
                  <hr className="mt-3 mb-0 border-white" />
                </CardHeader>
                <CardBody className="text-center">
                  <Row className="align-items-center">
                    <Col xl="6">
                      {/* <h2 className="text-center text-white bg-darker">
                        CSD Metric
                      </h2>
                      <Row className="text-center">
                        <Col xl="4">
                          <h3 className="text-center text-white ">
                            Work Number
                          </h3>
                          <div className="text-white ">Select CSD</div>
                        </Col>
                        <Col xl="4">
                          <h3 className="text-center text-white ">
                            Current Status
                          </h3>
                          <div className="text-danger font-weight-bold">
                            Block
                          </div>
                        </Col>
                        <Col xl="4">
                          <h3 className="text-center text-white ">
                            Table Info
                          </h3>
                          <div className="text-info font-weight-bold">
                            lineitem
                          </div>
                        </Col>
                      </Row> */}
                      <Table className="align-items-center text-center table-dark">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col" className="text-xs">
                              Metric
                            </th>
                            <th scope="col" className="text-xs">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">CPU</th>
                            <td>1.68</td>
                          </tr>
                          <tr>
                            <th scope="row">Memory</th>
                            <td>30081024</td>
                          </tr>
                          <tr>
                            <th scope="row">Disk</th>
                            <td>327277</td>
                          </tr>
                          <tr>
                            <th scope="row">Network</th>
                            <td>4792200</td>
                          </tr>
                          <tr>
                            <th scope="row">Block Count</th>
                            <td>9</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                    <Col xl="6">
                      <div className="mt-0 mb-3">
                        <Nav className="justify-content-end" pills>
                          {Array.from({ length: 5 }, (_, i) => i + 1).map(
                            (index) => (
                              <NavItem key={`${index}`}>
                                <NavLink
                                  className={classnames("py-2 px-3", {
                                    active: activeNav === index,
                                  })}
                                  href="#pablo"
                                  onClick={(e) => toggleNavs(e, index)}
                                >
                                  <span className="d-none d-md-block">
                                    {energyMetric[index - 1]}
                                  </span>
                                </NavLink>
                              </NavItem>
                            )
                          )}
                        </Nav>
                      </div>
                      <div className="chart ">
                        <Line
                          data={energychart[energychartData]}
                          options={energychart.options}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </CSSTransition>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xl="12">
            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <h1 className="col mb-0 text-primary">CSD Spec</h1>
                </Row>
                <hr className="mt-3 mb-0" />
              </CardHeader>
              <CardBody className="text-center">
                {analysis ? (
                  <Row>
                    <Col xl="6">
                      <Table>
                        <tbody className="text-center">
                          <tr>
                            <th scope="row">CPU Arch</th>
                            <td className="align-items-center">arm 64</td>
                          </tr>
                          <tr>
                            <th scope="row">CPU ModelName</th>
                            <td className="align-items-center">Cortex-A53</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                    <Col xl="6">
                      <Table>
                        <tbody className="text-center">
                          <tr>
                            <th scope="row">CPU core Num</th>
                            <td className="align-items-center">4</td>
                          </tr>
                          <tr>
                            <th scope="row">Operating System</th>
                            <td className="align-items-center">
                              Ubuntu 18.04.5.LTS
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                ) : (
                  <div>Input Server First.</div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Assistant;
