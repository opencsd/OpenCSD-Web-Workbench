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
import axios from "axios";
import Chart from "chart.js";
import { useState } from "react";
// react plugin used to create charts
import { HorizontalBar, Pie } from "react-chartjs-2";
import classnames from "classnames";

import React, { useRef, useEffect } from "react";

import {
  Alert,
  Badge,
  ButtonGroup,
  Card,
  CardHeader,
  CardTitle,
  Col,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  CardBody,
  Button,
  Input,
  Form,
  FormGroup,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";

import { chartOptions, parseOptions } from "variables/charts.js";
import { chartExample5, pushdownchart } from "variables/charts";
// core components
import Header from "components/Headers/Header.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";

const Pushdown = () => {
  //Login Data
  const [loginData, setLoginData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.5.123:40400/login_data");
        setLoginData([
          response.data.DBMS,
          response.data.Host,
          response.data.Port,
          response.data.Demo,
        ]);
      } catch (error) {
        console.error("CSV 파일 가져오기 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const [modal, setModal] = useState(false);
  const [isEffectCheck, setIsEffectCheck] = useState(false);
  const [isGenerateApi, setIsGenerateApi] = useState(false);
  const [isPushdown, setIsPushdown] = useState(false);

  const [AlgorithmSelected, setAlgorithmSelected] =
    useState("CSD Metric Score");
  const [IndexSelected, setIndexSelected] = useState("Use");
  const [DBMSSelected, setDBMSSelected] = useState("MySQL");
  const [BlockSizeSelected, setBlockSizeSelected] = useState("4096");
  const [option, setOption] = useState([]);

  const [snippet, setSnippet] = useState([]);
  const [SSDUsageForcast, setSSDUsageForcast] = useState();
  const [CSDUsageForcast, setCSDUsageForcast] = useState();
  const [HostConservationEffectForcast, setConservationEffectForcast] =
    useState();
  const [error, setError] = useState();
  const [energyUsage, setEnergyUsage] = useState();
  const [HostConservationEffect, setConservationEffect] = useState();
  const [ind, setInd] = useState(0);

  const [tableName, setTableName] = useState("");
  const [whereClause, setWhereClause] = useState("");
  const [columnName, setColumnName] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [valueErr, setValueErr] = useState(false);

  const [template, setShowTemplate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [generate, setGenerate] = useState("");

  const [activeNav, setActiveNav] = useState(true);
  const [activeNav2, setActiveNav2] = useState(true);

  const [value, setValue] = useState("Select Query");
  const [metric, setMetic] = useState("Power (W)");

  const [chartData, setChartdata] = useState(pushdownchart.powerData);
  const Query = useRef();
  const inputRef = useRef();
  const toggleCollapse = () => setIsOpen(!isOpen);
  //pushdown effect check
  useEffect(() => {
    if (value !== "Select Query") {
      if (ind < 10) {
        fetch(`/query/tpch0${ind}.sql`)
          .then((response) => response.text())
          .then((text) => {
            Query.current.value = text;
          });
      } else {
        fetch(`/query/tpch${ind}.sql`)
          .then((response) => response.text())
          .then((text) => {
            Query.current.value = text;
          });
      }
    }
  }, [ind, value]);

  const handelNewQuery = (e) => {
    Query.current.value = "";
    setValue("Select Query");
  };

  const handleEffectCheckClick = (e) => {
    if (!Query.current.value) setValueErr(true);
    else setValueErr(false);
    if (Query.current.value) {
      setIsEffectCheck(true);
      setGenerate(Query.current.value);
      fetch("http://10.0.5.123:40400/query", {
        //회원가입시 입력한 값들이 서버로 전송될 수 있는 주소
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: Query.current.value
            .replace(/[\n\t]/g, " ")
            .replace(/\s{2,}/g, " "),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSnippet(data.snippet);
          setSSDUsageForcast(data.SSDUsageForcast);
          setCSDUsageForcast(data.CSDUsageForcast);
          setConservationEffectForcast(data.ResourceConservationForcast);
          setError(data.pushdownError);
          setEnergyUsage(data.pushdownUsage);
          setConservationEffect(data.PushdownConservationEffect);
        });
    }
  };

  //toggle
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };

  //template
  const showTemp = (e) => {
    setShowTemplate(true);
  };
  const handleInputValue = () => {
    const queryParts = [];
    if (columnName) queryParts.push(`SELECT ${columnName}`);
    if (tableName) queryParts.push(`FROM ${tableName}`);
    if (whereClause) queryParts.push(`WHERE ${whereClause}`);
    if (orderBy) queryParts.push(`ORDER BY ${orderBy}`);
    if (groupBy) queryParts.push(`GroupBy=${groupBy}`);
    const query = queryParts.join("\n");
    inputRef.current.value = query;
  };

  //dropdown
  const handleDropdownClick = (index, e) => {
    setValue(e.target.getAttribute("value"));
    setInd(index);
  };
  const handleMetricDropdown = (e) => {
    setMetic(e.target.getAttribute("value"));
    if (e.target.getAttribute("value") === "Power")
      setChartdata(pushdownchart.powerData);
    else if (e.target.getAttribute("value") === "Network")
      setChartdata(pushdownchart.networkData);
    else setChartdata(pushdownchart.cpuData);
  };

  //For Demo
  const [workbench, setWorkbench] = useState(true);
  const [simulator, setSimulator] = useState(true);
  const [dbConnector, setDBConnector] = useState(false);
  const [SE, setSE] = useState(false);
  const [CSDPushdown, setCSDPushdown] = useState(false);
  const [result, setResult] = useState(false);

  const [currentIns, setCurrentIns] = useState("");
  const [clear, setClear] = useState(["clear", "", "", "", ""]);

  const [host, setHost] = useState(
    "http://10.0.5.123:8888/?hostname=10.0.5.123&username=root&password=d25zZ3VyMiE=&command=clear"
  );

  const handleDemo = (e) => {
    const delay = 2000; // 2초 지연
    switch (e.target.getAttribute("value")) {
      case "Workbench":
        setSimulator(!simulator);
        break;
      case "Simulator":
        setWorkbench(!workbench);
        setCurrentIns("Simulator");
        if (!Query.current.value) setValueErr(true);
        else setValueErr(false);
        setTimeout(() => {
          if (Query.current.value) {
            setIsEffectCheck(true);
            setGenerate(Query.current.value);
            fetch("http://10.0.5.123:40400/query", {
              //회원가입시 입력한 값들이 서버로 전송될 수 있는 주소
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                query: Query.current.value
                  .replace(/[\n\t]/g, " ")
                  .replace(/\s{2,}/g, " "),
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                setSnippet(data.snippet);
                setSSDUsageForcast(data.SSDUsageForcast);
                setCSDUsageForcast(data.CSDUsageForcast);
                setConservationEffectForcast(data.ResourceConservationForcast);
                setError(data.pushdownError);
                setEnergyUsage(data.pushdownUsage);
                setConservationEffect(data.PushdownConservationEffect);
              });
          }
          setDBConnector(!dbConnector);
          clear[1] = "clear";
          setClear(clear);
        }, delay);
        break;
      case "DB Connect Instance":
        setSimulator(!simulator);
        setCurrentIns("DB Connect Instance");
        setHost(
          "http://10.0.5.123:8888/?hostname=10.0.5.123&username=root&password=d25zZ3VyMiE=&command=clear;"
        );
        setTimeout(() => {
          clear[2] = "clear";
          setSE(!SE);
          setCSDPushdown(!CSDPushdown);
        }, delay);
        break;
      case "Storage Engine Instance":
        setDBConnector(!dbConnector);
        setCurrentIns("Storage Engine Instance & CSD Pushdown Work");
        setHost(
          "http://10.0.5.123:8888/?hostname=10.0.5.123&username=root&password=d25zZ3VyMiE=&command=clear"
        );
        setTimeout(() => {
          clear[3] = "clear";
          setResult(!result);
        }, delay);
        break;
      case "CSD Pushdown Work":
        setDBConnector(!dbConnector);
        setCurrentIns("Storage Engine Instance & CSD Pushdown Work");
        setHost(
          "http://10.0.5.123:8888/?hostname=10.0.5.123&username=root&password=d25zZ3VyMiE=&command=clear"
        );
        setTimeout(() => {
          clear[4] = "clear";
          setResult(!result);
        }, delay);
        break;
      case "Result":
        const updateClear = clear.map(() => "");
        setClear(updateClear);
        setCurrentIns("Query Input");
        setWorkbench(true);
        setSimulator(true);
        setDBConnector(true);
        setSE(true);
        setCSDPushdown(true);
        break;
    }
  };

  return (
    <>
      {loginData[3] === "O" && (
        <Row className="header my-4 align-items-center justify-content-center">
          <Button
            className={`mx-2 btn-demo text-lg ${clear[0]}`}
            color="warning"
            size="lg"
            type="button"
            value={"Workbench"}
            disabled={!workbench}
            onClick={handleDemo}
          >
            <img
              width={"40px"}
              src={require("../../assets/img/icons/demo/workbench.png")}
              alt="..."
            />
            {"   "}Workbench
          </Button>
          <i className="ni ni-bold-right"></i>
          <Button
            className={`mx-2 bg-yellow text-white btn-demo  text-lg ${clear[1]}`}
            size="lg"
            type="button"
            value={"Simulator"}
            disabled={!simulator}
            onClick={handleDemo}
          >
            <img
              width={"40px"}
              src={require("../../assets/img/icons/demo/simul.png")}
              alt="..."
            />
            {"   "}Simulator
          </Button>
          <i className="ni ni-bold-right"></i>
          <Button
            className={`mx-2 btn-demo  text-lg ${clear[2]}`}
            color="primary"
            size="lg"
            type="button"
            value={"DB Connect Instance"}
            disabled={!dbConnector}
            onClick={handleDemo}
          >
            <img
              width={"40px"}
              src={require("../../assets/img/icons/demo/dbc.png")}
              alt="..."
            />
            {"   "}DB Connect Instance
          </Button>
          <i className="ni ni-bold-right"></i>
          <Col xl="2" className="text-center px-0">
            <Button
              className={`mx-2 btn-demo text-lg mb-1 ${clear[3]}`}
              color="danger"
              size="lg"
              type="button"
              value={"Storage Engine Instance"}
              disabled={!SE}
              onClick={handleDemo}
            >
              <img
                width={"40px"}
                src={require("../../assets/img/icons/demo/se.png")}
                alt="..."
              />
              {"   "}Storage Engine Instance
            </Button>
            <Button
              className={`mx-2 bg-purple text-white btn-demo  text-lg ${clear[3]}`}
              size="lg"
              type="button"
              value={"CSD Pushdown Work"}
              disabled={!CSDPushdown}
              onClick={handleDemo}
            >
              <img
                width={"40px"}
                src={require("../../assets/img/icons/demo/csd.png")}
                alt="..."
              />
              {"   "}CSD Pushdown Work
            </Button>
          </Col>
          <i className="ni ni-bold-right"></i>
          <Button
            className="mx-2 btn-demo  text-lg"
            color="info"
            size="lg"
            type="button"
            value={"Result"}
            disabled={!result}
            onClick={handleDemo}
          >
            <img
              width={"40px"}
              src={require("../../assets/img/icons/demo/workbench.png")}
              alt="..."
            />
            {"   "}Workbench
          </Button>
          <div>
            <span className="text-lg font-weight-bolder text-darker">
              For Demo
            </span>
          </div>
        </Row>
      )}
      <AdminNavbar />
      <Header />
      {/* Page content */}
      <Container className="mt--7 px-0" fluid>
        {/*<TabMenu className="mt-1" />*/}
        <Row className="mt-7 justify-content-center">
          <Col xl="3" className="px-0">
            {!workbench ? (
              <Card className="bg-light h-100">
                <CardTitle className="h2 py-1 pl-2 mb-0 bg-gradient-light text-darker text-left">
                  <Row className="pl-3">{currentIns}</Row>
                </CardTitle>
                <CardBody
                  className="py-0 px-0 bg-darker overflow-hidden"
                  style={{ minHeight: "25vh" }}
                >
                  <iframe src={host} width="100%" height="100%" title="wssh" />
                </CardBody>
              </Card>
            ) : (
              <Card className="h-100 bg-lighter">
                <CardTitle className="h2 py-1  pl-3 mb-0 bg-lighter">
                  MANAGEMENT
                </CardTitle>
                <CardBody
                  className="h2 bg-lighter mb-0"
                  style={{ minHeight: "25vh" }}
                >
                  <span>Information</span>
                  <hr className="my-2" />
                  <span>Options</span>
                  <hr className="my-2" />
                  <a onClick={toggleCollapse}>
                    <i className="ni ni-bold-down"></i> CSD
                  </a>
                  <Collapse isOpen={isOpen} className="ml-5">
                    <span>
                      CSD 1 <i className="ni ni-check-bold text-success"></i>
                      <br />
                      CSD 2 <i className="ni ni-check-bold text-success"></i>
                      <br />
                      CSD 3{" "}
                      <i className="ni ni-ni ni-fat-remove text-danger"></i>
                      <br />
                      CSD 4 <i className="ni ni-check-bold text-success"></i>
                      <br />
                      CSD 5 <i className="ni ni-check-bold text-success"></i>
                      <br />
                      CSD 6 <i className="ni ni-check-bold text-success"></i>
                      <br />
                      CSD 7{" "}
                      <i className="ni ni-ni ni-fat-remove text-danger"></i>
                      <br />
                      CSD 8 <i className="ni ni-check-bold text-success"></i>
                      <br />
                    </span>
                  </Collapse>

                  <hr className="my-2" />
                </CardBody>
              </Card>
            )}
          </Col>
          <Col xl="7" className="px-0">
            <Card className="bg-light h-100">
              <CardTitle className="h1 py-1 pl-3 mb-0 bg-gradient-light text-darker">
                <Row className="ml-1 align-items-center">
                  Query Input
                  <div className="ml-3 mr-9">
                    <Button
                      color="primary"
                      size="lg"
                      type="button"
                      onClick={handleEffectCheckClick}
                      className="rounded-circle"
                    >
                      <i className="ni ni-button-play" />
                    </Button>
                    <Button
                      color="info"
                      size="lg"
                      type="button"
                      onClick={handelNewQuery}
                    >
                      NEW Query
                    </Button>
                    <Button
                      color="warning"
                      size="lg"
                      type="button"
                      className="ml-2"
                    >
                      Template
                    </Button>
                  </div>
                  <div className="ml-6">
                    <UncontrolledDropdown nav>
                      <DropdownToggle className=" ml-3" split size="sm">
                        {value + " "}
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow">
                        {Array.from({ length: 22 }, (_, i) => i + 1).map(
                          (index) => (
                            <DropdownItem
                              value={`TPC-H ${index}`}
                              onClick={(e) => handleDropdownClick(index, e)}
                            >
                              <i
                                value={`TPC-H ${index}`}
                                onClick={(e) => handleDropdownClick(index, e)}
                                className="ni ni-bold-right"
                              />
                              <span
                                value={`TPC-H ${index}`}
                                onClick={(e) => handleDropdownClick(index, e)}
                              >{`TPC-H ${index}`}</span>
                            </DropdownItem>
                          )
                        )}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </Row>
              </CardTitle>

              <CardBody className="py-0 px-0 h-100">
                {valueErr && (
                  <Alert color="danger">
                    <strong>Danger!</strong> Input Value First!
                  </Alert>
                )}
                <Form className="justify-content-end ml-8 h-100">
                  <Input
                    className="h-100 text-darker"
                    id="Query"
                    type="textarea"
                    innerRef={Query}
                  />
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="2" className="px-0">
            <Card className="bg-light h-100">
              <CardTitle className="h1 py-1 mb-0 bg-gradient-light text-darker text-center">
                Generated API
              </CardTitle>
              <CardBody className="py-0 px-3 bg-darker mh-100 overflow-auto">
                {isEffectCheck && (
                  <span className="text-white">
                    GET/
                    <br />
                    HOST: http://10.0.5.122:34568/
                    <br />
                    Content-Type:application/json
                    <br />
                    {"{"}
                    <br />
                    <span className="text-green">
                      queryID:"TPC-H_01",
                      <br />
                      query:{generate}
                      <br />
                    </span>
                    {"}"}
                  </span>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ maxHeight: "40vh" }}>
          <Col xl="3" className="px-0">
            <Card
              className="bg-white h-100"
              style={{ maxHeight: "40vh", minHeight: "35vh" }}
            >
              <CardTitle className="h2 py-1 pl-3 mb-0 bg-light text-darker">
                <Row className=" h2 pl-3 align-items-center">
                  Option
                  <Nav className="ml-5" pills>
                    <NavItem className="pr-0">
                      <NavLink
                        className={classnames("py-1", {
                          active: activeNav === true,
                        })}
                        href="#pablo"
                        onClick={(e) => toggleNavs(e, true)}
                      >
                        <span className="d-none d-md-block">Option</span>
                        <span className="d-md-none">M</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames("py-1", {
                          active: activeNav === false,
                        })}
                        data-toggle="tab"
                        href="#pablo"
                        onClick={(e) => toggleNavs(e, false)}
                      >
                        <span className="d-none d-md-block">Environment</span>
                        <span className="d-md-none">W</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Row>
              </CardTitle>
              <CardBody className="py-0 px-0 h-100">
                <Table
                  className="align-items-center text-center bg-white"
                  responsive
                  bordered
                >
                  {activeNav ? (
                    <tbody>
                      <tr>
                        <th scope="row">
                          <h3>DBMS</h3>
                        </th>
                        <td>
                          <h4>{option[0]}</h4>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h3>Algorithm</h3>
                        </th>
                        <td>
                          <h4>{option[1]}</h4>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h3>Index</h3>
                        </th>
                        <td>
                          <h4>{option[2]}</h4>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h3>Block Size</h3>
                        </th>
                        <td>
                          <h4>{option[3]}</h4>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <th scope="row">
                          <h3>Network</h3>
                        </th>
                        <td>
                          <h4>1024 KB/s</h4>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h3>CPU</h3>
                        </th>
                        <td>
                          <h4>8 Core</h4>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h3>Memory</h3>
                        </th>
                        <td>
                          <h4>200 G</h4>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xl="7" className="px-0">
            <Card className="bg-white h-50">
              <CardTitle className="h1 py-1 pl-3 mb-0 bg-gradient-light text-darker">
                Query Snippet
              </CardTitle>
              <CardBody className="py-0 px-0 overflow-auto">
                <Table
                  className="align-items-center text-center bg-white "
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" className="text-sm">
                        Num
                      </th>
                      <th scope="col" className="text-sm">
                        Snippet Type
                      </th>
                      <th scope="col" className="text-sm">
                        Projection Colume
                      </th>
                      <th scope="col" className="text-sm">
                        Filter Clause
                      </th>
                      <th scope="col" className="text-sm">
                        Order by
                      </th>
                      <th scope="col" className="text-sm">
                        Group by
                      </th>
                    </tr>
                  </thead>
                  {Array.from({ length: snippet.length }, (_, i) => i).map(
                    (index) => (
                      <tr>
                        <th scope="row">
                          {snippet[index]["Snippet Type"] && index + 1}
                        </th>
                        <td>
                          <h4>{snippet[index]["Snippet Type"]}</h4>
                        </td>
                        <td>
                          <h4>{snippet[index]["Projection Column"]}</h4>
                        </td>
                        <td>
                          <h4>{snippet[index]["Filter Clause"]}</h4>
                        </td>
                        <td>
                          <h4>{snippet[index]["Order by"]}</h4>
                        </td>
                        <td>
                          <h4>{snippet[index]["Group by"]}</h4>
                        </td>
                      </tr>
                    )
                  )}
                </Table>
              </CardBody>
            </Card>
            <Card className="bg-white h-50">
              <CardTitle className="h1 py-1 pl-3 mb-0 bg-gradient-light text-darker">
                <Row className="pl-3 align-items-center">Query Result</Row>
              </CardTitle>
              {isEffectCheck && (
                <CardBody className="py-0 px-0">
                  <Table
                    className="align-items-center text-center bg-white "
                    responsive
                  >
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" className="text-sm">
                          Num
                        </th>
                        <th scope="col" className="text-sm">
                          Snippet Type
                        </th>
                        <th scope="col" className="text-sm">
                          Projection Colume
                        </th>
                        <th scope="col" className="text-sm">
                          Filter Clause
                        </th>
                        <th scope="col" className="text-sm">
                          Order by
                        </th>
                        <th scope="col" className="text-sm">
                          Group by
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <h3>1</h3>
                        </th>
                        <td>Scan</td>
                        <td>5</td>
                        <td>5</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h3>2</h3>
                        </th>
                        <td>Scan</td>
                        <td>3</td>
                        <td>3</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h3>3</h3>
                        </th>
                        <td>Aggregation</td>
                        <td>5</td>
                        <td>0</td>
                        <td>0</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h3>4</h3>
                        </th>
                        <td>Inner Join</td>
                        <td>6</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <h3>5</h3>
                        </th>
                        <td>Aggregation</td>
                        <td>6</td>
                        <td>0</td>
                        <td>2</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              )}
            </Card>
          </Col>
          <Col xl="2" className="px-0">
            <Card
              className="bg-white h-100 overflow-auto"
              style={{ maxHeight: "40vh" }}
            >
              <CardTitle className="h1 py-1 mb-0 bg-gradient-light text-darker text-center">
                Effect Result
              </CardTitle>
              <CardBody className="py-0 px-0">
                {isEffectCheck && (
                  <Table striped responsive>
                    <tbody className="text-center">
                      <tr>
                        <td className="font-weight-bold">
                          <h3>SSD Resource Usage Forcast</h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4>{SSDUsageForcast + " W"}</h4>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <h3>CSD Resource Usage Forcast</h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4>{CSDUsageForcast + " W"}</h4>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <h3>Conservation Effect Forcast</h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4>{HostConservationEffectForcast + " %"}</h4>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <h3>Pushdown T/F</h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 className="text-danger">Pushdown</h4>
                        </td>
                      </tr>
                    </tbody>
                    {isPushdown && (
                      <tbody className="text-center">
                        <tr className="w-100">
                          <td className="font-weight-bold">
                            <h3>Pushdown Resource Usage</h3>
                          </td>
                        </tr>
                        <tr className="w-100">
                          <td>
                            <h4>{energyUsage + " W"}</h4>
                          </td>
                        </tr>
                        <tr className="w-100">
                          <td className="font-weight-bold">
                            <h3>Prediction Error</h3>
                          </td>
                        </tr>
                        <tr className="w-100">
                          <td>
                            <h4>{error + " %"}</h4>
                          </td>
                        </tr>
                        <tr className="w-100">
                          <td className="font-weight-bold">
                            <h3>Conservation Effect</h3>
                          </td>
                        </tr>
                        <tr className="w-100">
                          <td>
                            <h4 className="text-danger">
                              {HostConservationEffect + " %"}
                            </h4>
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </Table>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col xl="12">
            {template && (
              <Card className="shadow">
                <CardHeader className="border-1 pb-2">
                  <h2 className="text-primary">Template API</h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xl="6">
                      <Form>
                        <Row className="mt-3">
                          <Col md="10">
                            <Input
                              id="Table Name"
                              placeholder="Table Name"
                              type="text"
                              onChange={(e) => setTableName(e.target.value)}
                              onKeyPress={handleInputValue}
                            />
                          </Col>
                          <Button
                            className="icon icon-shape bg-dark text-white rounded-circle shadow"
                            type="button"
                            onClick={handleInputValue}
                          >
                            <i className="ni ni-fat-add" />
                          </Button>
                        </Row>
                        <Row className="mt-3">
                          <Col md="10">
                            <Input
                              id="Where"
                              placeholder="Where"
                              type="text"
                              onChange={(e) => setWhereClause(e.target.value)}
                              onKeyPress={handleInputValue}
                            />
                          </Col>
                          <Button
                            className="icon icon-shape bg-dark text-white rounded-circle shadow"
                            type="button"
                            onClick={handleInputValue}
                          >
                            <i className="ni ni-fat-add" />
                          </Button>
                        </Row>
                        <Row className="mt-3">
                          <Col md="10">
                            <Input
                              id="Column"
                              placeholder="Column"
                              type="text"
                              onKeyPress={handleInputValue}
                              onChange={(e) => setColumnName(e.target.value)}
                            />
                          </Col>
                          <Button
                            className="icon icon-shape bg-dark text-white rounded-circle shadow"
                            type="button"
                            onClick={handleInputValue}
                          >
                            <i className="ni ni-fat-add" />
                          </Button>
                        </Row>
                        <Row className="mt-3">
                          <Col xl="6">
                            <Row>
                              <Col md="10">
                                <Input
                                  id="OrderBy"
                                  placeholder="OrderBy"
                                  type="text"
                                  onKeyPress={handleInputValue}
                                  onChange={(e) => setOrderBy(e.target.value)}
                                />
                              </Col>
                              <Button
                                className="icon icon-shape bg-dark text-white rounded-circle shadow"
                                type="button"
                                onClick={handleInputValue}
                              >
                                <i className="ni ni-fat-add" />
                              </Button>
                            </Row>
                          </Col>
                          <Col xl="6">
                            <Row>
                              <Col md="10">
                                <Input
                                  id="GroupBy"
                                  placeholder="GroupBy"
                                  type="text"
                                  onKeyPress={handleInputValue}
                                  onChange={(e) => setGroupBy(e.target.value)}
                                />
                              </Col>
                              <Button
                                className="icon icon-shape bg-dark text-white rounded-circle shadow"
                                type="button"
                                onClick={handleInputValue}
                              >
                                <i className="ni ni-fat-add" />
                              </Button>
                            </Row>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
        {/* {generate && (
          <Row>
            <Col xl="12" className="text-right">
              <img
                src={require("../../assets/img/brand/generate.png")}
                width={"50%"}
                height={"80%"}
                alt="..."
              />
            </Col>
          </Row>
        )} */}
      </Container>
    </>
  );
};

export default Pushdown;
