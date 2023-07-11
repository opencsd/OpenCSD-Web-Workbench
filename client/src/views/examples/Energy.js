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
import { Bar, Line } from "react-chartjs-2";

import React, { useRef, useEffect } from "react";

import {
  Alert,
  Card,
  CardTitle,
  Col,
  DropdownMenu,
  DropdownItem,
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
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ButtonGroup,
  ModalFooter,
  Progress,
} from "reactstrap";

import { chartOptions, parseOptions } from "variables/charts.js";
import { energychart, pushdownchart } from "variables/charts";
// core components
import Header from "components/Headers/Header.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";

const Energy = () => {
  const [loginData, setLoginData] = useState([]);

  const [modalSets, setModalSets] = useState(false);
  const toggle = () => {
    setModalSets(!modalSets);
    resetOptions();
  };
  const add = () => {
    toggle();
    if (StorageSelected === "CSD")
      setCustomSet([
        ...customSet,
        {
          Set: [
            StorageSelected,
            DBMSSelected,
            CSDNumSelected,
            CSDKindSelected,
            AlgorithmSelected,
            IndexSelected,
            BlockSizeSelected,
          ],
        },
      ]);
    else
      setCustomSet([
        ...customSet,
        {
          Set: [
            StorageSelected,
            DBMSSelected,
            "X",
            "X",
            AlgorithmSelected,
            IndexSelected,
            BlockSizeSelected,
          ],
        },
      ]);
    setSet(customSet.length);
    setSelectedOptions(customSet.length);
  };

  const [modal, setModal] = useState(false);
  const modify = () => {
    toggle2();
    const updatedOption = [...customSet];
    // 특정 인덱스의 요소 수정
    if (StorageSelected === "CSD")
      updatedOption[set].Set = [
        StorageSelected,
        DBMSSelected,
        CSDNumSelected,
        CSDKindSelected,
        AlgorithmSelected,
        IndexSelected,
        BlockSizeSelected,
      ];
    else
      updatedOption[set].Set = [
        StorageSelected,
        DBMSSelected,
        "X",
        "X",
        AlgorithmSelected,
        IndexSelected,
        BlockSizeSelected,
      ];
    // 상태 업데이트
    setCustomSet(updatedOption);
  };
  const resetOptions = () => {
    setStorageSelected("SSD");
    setDBMSSelected("MySQL");
    setCSDNumSelected("8");
    setCSDKindSelected("NGD");
    setAlgorithmSelected("CSD Metric Score");
    setIndexSelected("Use");
    setBlockSizeSelected("4096");
  };
  const toggle2 = (e) => {
    setModal(!modal);
  };
  const [StorageSelected, setStorageSelected] = useState("SSD");
  const [CSDNumSelected, setCSDNumSelected] = useState("8");
  const [CSDKindSelected, setCSDKindSelected] = useState("NGD");
  const [DBMSSelected, setDBMSSelected] = useState("MySQL");
  const [AlgorithmSelected, setAlgorithmSelected] =
    useState("CSD Metric Score");
  const [IndexSelected, setIndexSelected] = useState("Use");
  const [BlockSizeSelected, setBlockSizeSelected] = useState("4096");
  const [selectedOptions, setSelectedOptions] = useState(0);

  const [set, setSet] = useState(0);
  const handleStorage = (e) => {
    setStorageSelected(e.target.value);
    if (StorageSelected === "SSD" && e.target.value === "CSD") {
      setCSDNumSelected("8");
      setCSDKindSelected("NGD");
    }
  };
  const handleDBMS = (e) => {
    setDBMSSelected(e.target.value);
  };
  const handleCSDCount = (e) => {
    setCSDNumSelected(e.target.value);
  };
  const handleCSDKind = (e) => {
    setCSDKindSelected(e.target.value);
  };
  const handleAlgorithm = (e) => {
    setAlgorithmSelected(e.target.value);
  };
  const handleIndex = (e) => {
    setIndexSelected(e.target.value);
  };
  const handleBlockSize = (e) => {
    setBlockSizeSelected(e.target.value);
  };

  const handleOptionInfo = (index, e) => {
    toggle2();
    setSet(index);
    setStorageSelected(customSet[index].Set[0]);
    setDBMSSelected(customSet[index].Set[1]);
    setCSDNumSelected(customSet[index].Set[2]);
    setCSDKindSelected(customSet[index].Set[3]);
    setAlgorithmSelected(customSet[index].Set[4]);
    setIndexSelected(customSet[index].Set[5]);
    setBlockSizeSelected(customSet[index].Set[6]);
  };

  const handleSelectOption = (index, e) => {
    setSelectedOptions(index);
  };

  const [value, setValue] = useState("Select Query");
  const [source, setSource] = useState("/img/TPC-H 1.png");
  const [tableName, setTableName] = useState("");
  const [whereClause, setWhereClause] = useState("");
  const [columnName, setColumnName] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [analysis, setAnalysis] = useState(false);
  const [template, setShowTemplate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [generate, setGenerate] = useState(false);
  const [open, setOpen] = useState("1");
  const [ind, setInd] = useState(0);
  const [snippet, setSnippet] = useState([]);
  const [valueErr, setValueErr] = useState(false);
  const [optionErr, setOptionErr] = useState(false);

  const [NormalizedQuery, setNormalizedQuery] = useState([]);
  const [CSDEnergyUsageForcast, setCSDEnergyUsageForcast] = useState();
  const [conservationEffectForcast, setConservationEffectForcast] = useState();
  const [efficientOption, setEfficientOption] = useState();
  const [error, setError] = useState();
  const [energyUsage, setEnergyUsage] = useState();
  const [conservationEffect, setConservationEffect] = useState();
  const [isSimul, setIsSimul] = useState(false);

  const [customSet, setCustomSet] = useState([{ Set: [, , , ,] }]);
  const Query = useRef();
  const handleQuerySimul = (e) => {
    if (!selectedOptions) setOptionErr(true);
    else setOptionErr(false);
    if (!Query.current.value) setValueErr(true);
    else setValueErr(false);
    if (value !== "Select Query" && selectedOptions && Query.current.value) {
      setIsSimul(true);
      fetch("http://10.0.5.123:40400/pushdown", {
        //회원가입시 입력한 값들이 서버로 전송될 수 있는 주소
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          queryID: ind,
          query: Query.current.value
            .replace(/[\n\t]/g, " ")
            .replace(/\s{2,}/g, " "),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //const values = Object.values(data); // JSON 데이터의 값들을 배열로 추출
          setGenerate(data.query);
          setSnippet(data.snippet);
          setNormalizedQuery([...NormalizedQuery, data.query]);
        });
    }
  };
  const inputRef = useRef();
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  const [activeNav, setActiveNav] = useState(true);
  const [activeNav2, setActiveNav2] = useState(true);
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };
  const toggleNavs2 = (e, index) => {
    e.preventDefault();
    setActiveNav2(index);
  };
  const changeImage = (value) => {
    setSource("/img/" + value + ".png");
  };
  const analysisQuery = (e) => {
    setAnalysis(true);
  };
  const generateAPI = (e) => {
    setGenerate(true);
  };
  const showTemp = (e) => {
    setShowTemplate(true);
  };
  const handleDropdownClick = (index, e) => {
    setValue(e.target.getAttribute("value"));
    setInd(index);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // CSV 파일 가져오기
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
  const handleToggle = () => {
    setIsOpen(!isOpen);
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

  //For Demo
  const [workbench, setWorkbench] = useState(true);
  const [simulator, setSimulator] = useState(true);
  const [dbConnector, setDBConnector] = useState(false);
  const [SE, setSE] = useState(false);
  const [CSDPushdown, setCSDPushdown] = useState(false);
  const [result, setResult] = useState(false);

  const [currentIns, setCurrentIns] = useState("");
  const [clear, setClear] = useState(["", "", "", ""]);

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
        setTimeout(() => {
          setIsSimul(true);
          if (selectedOptions.length !== 2) setOptionErr(true);
          else setOptionErr(false);
          if (!Query.current.value) setValueErr(true);
          else setValueErr(false);
          if (
            value !== "Select Query" &&
            selectedOptions.length === 2 &&
            Query.current.value
          ) {
            fetch("http://10.0.5.123:40400", {
              //회원가입시 입력한 값들이 서버로 전송될 수 있는 주소
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                queryID: ind,
                query: Query.current.value
                  .replace(/[\n\t]/g, " ")
                  .replace(/\s{2,}/g, " "),
                options: [
                  customSet[selectedOptions[0]],
                  customSet[selectedOptions[1]],
                ],
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                setGenerate(data.query);
                setSnippet(data.snippet);
              });
          }
          setDBConnector(!dbConnector);
          clear[0] = "clear";
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
          clear[1] = "clear";
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
          clear[2] = "clear";
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
          clear[2] = "clear";
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
            className="mx-2 btn-demo text-lg clear"
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
            className={`mx-2 bg-yellow text-white btn-demo  text-lg ${clear[0]}`}
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
            className={`mx-2 btn-demo  text-lg ${clear[1]}`}
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
              className={`mx-2 btn-demo text-lg mb-1 ${clear[2]}`}
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
              className={`mx-2 bg-purple text-white btn-demo  text-lg ${clear[2]}`}
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
          <Col xl="7">
            {!workbench && (
              <Card className="bg-light h-100 mt-5">
                <CardTitle className="h1 py-1 pl-3 mb-0 bg-gradient-light text-darker">
                  <Row className="pl-3">{currentIns}</Row>
                </CardTitle>
                <CardBody
                  className="py-0 px-0 bg-darker"
                  style={{ minHeight: "25vh" }}
                >
                  <iframe src={host} width="100%" height="500px" title="wssh" />
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      )}
      <AdminNavbar />
      <Header />
      {/* Page content */}
      <Container className="mt--7 px-0" fluid>
        <Row className="mt-7 justify-content-center">
          <Col xl="3" className="px-0">
            <Card className="h-100 bg-lighter">
              <CardTitle className="h2 py-1  pl-3 mb-0 bg-lighter">
                MANAGEMENT
              </CardTitle>
              <CardBody className="h2 bg-lighter mb-0">
                <span>Information</span>
                <hr className="my-2" />
                <span>Options</span>
                <hr className="my-2" />
              </CardBody>
            </Card>
          </Col>
          <Col xl="7" className="px-0">
            <Card className="bg-light h-100">
              <CardTitle className="h1 py-1 pl-3 mb-0 bg-gradient-light text-darker">
                <Row className="ml-1 align-items-center">
                  Query Input
                  <div className="ml-3 mr-9">
                    <Button
                      color="info"
                      size="lg"
                      type="button"
                      onClick={(e) => {
                        Query.current.value = "";
                        setValue("Select Query");
                      }}
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
                    <Button
                      color="primary"
                      size="lg"
                      type="button"
                      onClick={handleQuerySimul}
                    >
                      Simulate
                    </Button>
                    <Button
                      color="dark"
                      size="lg"
                      type="button"
                      className="ml-3 align-items-center"
                      onClick={toggle}
                    >
                      New Option
                      <i className="ni ni-settings-gear-65 ml-2" />
                    </Button>
                    <Modal
                      centered
                      isOpen={modalSets}
                      toggle={toggle}
                      size="lg"
                    >
                      <ModalHeader toggle={toggle}>
                        Set Simulator Option
                      </ModalHeader>
                      <ModalBody>
                        <Form>
                          <Row>
                            <Col md="6">
                              <Row className="align-tiems-center ml-2">
                                <Label className="h3">Storage : </Label>
                                <ButtonGroup className="ml-3">
                                  <Button
                                    color="light"
                                    outline
                                    size="sm"
                                    value={"SSD"}
                                    onClick={handleStorage}
                                    active={StorageSelected === "SSD"}
                                  >
                                    SSD
                                  </Button>
                                  <Button
                                    color="light"
                                    outline
                                    size="sm"
                                    value={"CSD"}
                                    onClick={handleStorage}
                                    active={StorageSelected === "CSD"}
                                  >
                                    CSD
                                  </Button>
                                </ButtonGroup>
                              </Row>
                            </Col>
                            <Col md="6">
                              <FormGroup row>
                                <Label for="DBMS" sm="3" className="h3">
                                  DBMS :
                                </Label>
                                <Col sm="9">
                                  <Input
                                    id="DBMS"
                                    placeholder="DBMS"
                                    type="text"
                                    onChange={handleDBMS}
                                    defaultValue={"MySQL"}
                                  />
                                </Col>
                              </FormGroup>
                            </Col>
                          </Row>
                          {StorageSelected === "CSD" && (
                            <Row>
                              <Col md="6">
                                <FormGroup row>
                                  <Label for="CSD Count" sm="4" className="h3">
                                    CSD Count :
                                  </Label>
                                  <Col sm="8">
                                    <Input
                                      id="CSD Count"
                                      type="number"
                                      onChange={handleCSDCount}
                                      defaultValue={"8"}
                                    />
                                  </Col>
                                </FormGroup>
                              </Col>
                              <Col md="6">
                                <Row className="align-tiems-center ml-2">
                                  <Label className="h3">CSD Kind : </Label>
                                  <ButtonGroup className="ml-3">
                                    <Button
                                      color="light"
                                      outline
                                      size="sm"
                                      value={"NGD"}
                                      onClick={handleCSDKind}
                                      active={CSDKindSelected === "NGD"}
                                    >
                                      NGD
                                    </Button>
                                    <Button
                                      color="light"
                                      outline
                                      size="sm"
                                      value={"Scaleflux"}
                                      onClick={handleCSDKind}
                                      active={CSDKindSelected === "Scaleflux"}
                                    >
                                      Scaleflux
                                    </Button>
                                  </ButtonGroup>
                                </Row>
                              </Col>
                            </Row>
                          )}
                          <Row>
                            <Col md="12">
                              <Row className="align-tiems-center ml-2">
                                <Label className="h3">
                                  Scheduling Algorithm :{" "}
                                </Label>
                                <ButtonGroup className="ml-5 px-4">
                                  <Button
                                    className="px-4"
                                    color="light"
                                    outline
                                    size="sm"
                                    value={"CSD Metric Score"}
                                    onClick={handleAlgorithm}
                                    active={
                                      AlgorithmSelected === "CSD Metric Score"
                                    }
                                  >
                                    CSD Metric Score
                                  </Button>
                                  <Button
                                    className="px-4"
                                    color="light"
                                    outline
                                    size="sm"
                                    value={"Block Count"}
                                    onClick={handleAlgorithm}
                                    active={AlgorithmSelected === "Block Count"}
                                  >
                                    Block Count
                                  </Button>
                                  <Button
                                    className="px-4"
                                    color="light"
                                    outline
                                    size="sm"
                                    value={"Minimum Overlap SST"}
                                    onClick={handleAlgorithm}
                                    active={
                                      AlgorithmSelected ===
                                      "Minimum Overlap SST"
                                    }
                                  >
                                    Minimum Overlap SST
                                  </Button>
                                </ButtonGroup>
                              </Row>
                            </Col>
                          </Row>
                          <Row className="mt-4">
                            <Col md="6">
                              <Row className="align-tiems-center ml-2">
                                <Label className="h3">Using Index : </Label>
                                <ButtonGroup className="ml-3">
                                  <Button
                                    color="light"
                                    outline
                                    size="sm"
                                    value={"Use"}
                                    onClick={handleIndex}
                                    active={IndexSelected === "Use"}
                                  >
                                    ACTIVE
                                  </Button>
                                  <Button
                                    color="light"
                                    outline
                                    size="sm"
                                    value={"Disuse"}
                                    onClick={handleIndex}
                                    active={IndexSelected === "Disuse"}
                                  >
                                    INACTIVE
                                  </Button>
                                </ButtonGroup>
                              </Row>
                            </Col>
                            <Col md="6">
                              <FormGroup row>
                                <Label for="BlockSize" sm="4" className="h3">
                                  Block Size :{" "}
                                </Label>
                                <Col sm="8">
                                  <Input
                                    id="BlockSize"
                                    placeholder="Block Size"
                                    type="text"
                                    onChange={handleBlockSize}
                                    defaultValue={"4096"}
                                  />
                                </Col>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </ModalBody>
                      <ModalFooter>
                        <Button block color="primary" onClick={add}>
                          ADD
                        </Button>
                      </ModalFooter>
                    </Modal>
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
              <CardBody className="py-0 px-0">
                {optionErr && (
                  <Alert color="danger">
                    <strong>Danger!</strong> Select Option First
                  </Alert>
                )}
                {valueErr && (
                  <Alert color="danger">
                    <strong>Danger!</strong> Input Value First!
                  </Alert>
                )}
                <Form className="justify-content-end ml-8 h-100">
                  <Input
                    className="h-100 text-darker"
                    id="Query"
                    rows="19"
                    type="textarea"
                    innerRef={Query}
                  />
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="2" className="px-0">
            <Card className="bg-light h-100">
              <CardTitle className="h1 py-1  pl-3 mb-0 bg-gradient-light text-darker">
                Custom Sets List
              </CardTitle>
              <CardBody className="py-0 px-0 bg-white ">
                <Table
                  className="align-items-center text-center bg-white"
                  responsive
                  bordered
                >
                  <tbody>
                    {Array.from(
                      { length: customSet.length - 1 },
                      (_, i) => i + 1
                    ).map((index) => (
                      <tr>
                        <th scope="row" className="w-75">
                          <Button
                            className="mt-1 "
                            color="light"
                            size="lg"
                            block
                            type="button"
                            onClick={(e) => handleOptionInfo(index, e)}
                          >
                            CSD Option {index}
                          </Button>
                        </th>
                        <td className="w-25">
                          <Button
                            className="btn-icon btn-2"
                            color="success"
                            type="button"
                            outline={index !== selectedOptions}
                            onClick={(e) => handleSelectOption(index, e)}
                          >
                            <i className="ni ni-check-bold text-xl" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Modal centered isOpen={modal} toggle={toggle2} size="lg">
                  <ModalHeader toggle={toggle2}>
                    Set Simulator Option
                  </ModalHeader>
                  <ModalBody>
                    <Form>
                      <Row>
                        <Col md="6">
                          <Row className="align-tiems-center ml-2">
                            <Label className="h3">Storage : </Label>
                            <ButtonGroup className="ml-3">
                              <Button
                                color="light"
                                outline
                                size="sm"
                                value={"SSD"}
                                onClick={handleStorage}
                                active={StorageSelected === "SSD"}
                              >
                                SSD
                              </Button>
                              <Button
                                color="light"
                                outline
                                size="sm"
                                value={"CSD"}
                                onClick={handleStorage}
                                active={StorageSelected === "CSD"}
                              >
                                CSD
                              </Button>
                            </ButtonGroup>
                          </Row>
                        </Col>
                        <Col md="6">
                          <FormGroup row>
                            <Label for="DBMS" sm="3" className="h3">
                              DBMS :
                            </Label>
                            <Col sm="9">
                              <Input
                                id="DBMS"
                                placeholder="DBMS"
                                type="text"
                                onChange={handleDBMS}
                                defaultValue={DBMSSelected}
                              />
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      {StorageSelected === "CSD" && (
                        <Row>
                          <Col md="6">
                            <FormGroup row>
                              <Label for="CSD Count" sm="4" className="h3">
                                CSD Count :
                              </Label>
                              <Col sm="8">
                                <Input
                                  id="CSD Count"
                                  type="number"
                                  onChange={handleCSDCount}
                                  defaultValue={
                                    StorageSelected === "CSD" &&
                                    CSDNumSelected === "X"
                                      ? "8"
                                      : CSDNumSelected
                                  }
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <Row className="align-tiems-center ml-2">
                              <Label className="h3">CSD Kind : </Label>
                              <ButtonGroup className="ml-3">
                                <Button
                                  color="light"
                                  outline
                                  size="sm"
                                  value={"NGD"}
                                  onClick={handleCSDKind}
                                  active={CSDKindSelected === "NGD" || "X"}
                                >
                                  NGD
                                </Button>
                                <Button
                                  color="light"
                                  outline
                                  size="sm"
                                  value={"Scaleflux"}
                                  onClick={handleCSDKind}
                                  active={CSDKindSelected === "Scaleflux"}
                                >
                                  Scaleflux
                                </Button>
                              </ButtonGroup>
                            </Row>
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col md="12">
                          <Row className="align-tiems-center ml-2">
                            <Label className="h3">
                              Scheduling Algorithm :{" "}
                            </Label>
                            <ButtonGroup className="ml-5 px-4">
                              <Button
                                className="px-4"
                                color="light"
                                outline
                                size="sm"
                                value={"CSD Metric Score"}
                                onClick={handleAlgorithm}
                                active={
                                  AlgorithmSelected === "CSD Metric Score"
                                }
                              >
                                CSD Metric Score
                              </Button>
                              <Button
                                className="px-4"
                                color="light"
                                outline
                                size="sm"
                                value={"Block Count"}
                                onClick={handleAlgorithm}
                                active={AlgorithmSelected === "Block Count"}
                              >
                                Block Count
                              </Button>
                              <Button
                                className="px-4"
                                color="light"
                                outline
                                size="sm"
                                value={"Minimum Overlap SST"}
                                onClick={handleAlgorithm}
                                active={
                                  AlgorithmSelected === "Minimum Overlap SST"
                                }
                              >
                                Minimum Overlap SST
                              </Button>
                            </ButtonGroup>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col md="6">
                          <Row className="align-tiems-center ml-2">
                            <Label className="h3">Using Index : </Label>
                            <ButtonGroup className="ml-3">
                              <Button
                                color="light"
                                outline
                                size="sm"
                                value={"Use"}
                                onClick={handleIndex}
                                active={IndexSelected === "Use"}
                              >
                                ACTIVE
                              </Button>
                              <Button
                                color="light"
                                outline
                                size="sm"
                                value={"Disuse"}
                                onClick={handleIndex}
                                active={IndexSelected === "Disuse"}
                              >
                                INACTIVE
                              </Button>
                            </ButtonGroup>
                          </Row>
                        </Col>
                        <Col md="6">
                          <FormGroup row>
                            <Label for="BlockSize" sm="4" className="h3">
                              Block Size :{" "}
                            </Label>
                            <Col sm="8">
                              <Input
                                id="BlockSize"
                                placeholder="Block Size"
                                type="text"
                                onChange={handleBlockSize}
                                defaultValue={BlockSizeSelected}
                              />
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button block color="primary" onClick={modify}>
                      MODIFY
                    </Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center h-50vh overflow-visible">
          <Col xl="3" className="px-0">
            <Card className="bg-white  h-100">
              <CardTitle className="h2 py-1 pl-3 mb-0 bg-light text-darker">
                <Row className="pl-3 justify-content-center">
                  CSD Option {" " + selectedOptions}
                </Row>
              </CardTitle>
              <CardBody className="py-0 px-0">
                <Table
                  className="align-items-center text-center bg-white"
                  responsive
                  bordered
                >
                  <tbody>
                    <tr>
                      <th scope="row">
                        <h3>Storage</h3>
                      </th>
                      <td>
                        <h4>{customSet[selectedOptions].Set[0]}</h4>
                      </td>
                    </tr>

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
                        <h3>DBMS</h3>
                      </th>
                      <td>
                        <h4>{customSet[selectedOptions].Set[1]}</h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <h3>CSD Count</h3>
                      </th>
                      <td>
                        <h4>{customSet[selectedOptions].Set[2]}</h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <h3>CSD Kind</h3>
                      </th>
                      <td>
                        <h4>{customSet[selectedOptions].Set[3]}</h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <h3>Algorithm</h3>
                      </th>
                      <td>
                        <h4>{customSet[selectedOptions].Set[4]}</h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <h3>Index</h3>
                      </th>
                      <td>
                        <h4>{customSet[selectedOptions].Set[5]}</h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <h3>Block Size</h3>
                      </th>
                      <td>
                        <h4>{customSet[selectedOptions].Set[6]}</h4>
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
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xl="9" className="px-0">
            <Card className="bg-white h-25vh">
              <CardTitle className="h1 py-1 pl-3 mb-0 bg-gradient-light text-darker">
                <Row className="pl-3 align-items-center">
                  Pushdown Effect Check
                </Row>
              </CardTitle>
              <CardBody className="py-0 px-0">
                {isSimul && (
                  <Row className="h-100">
                    <Col xl="6">
                      <div className="chart h-100">
                        {/* Chart wrapper */}
                        <Bar
                          data={pushdownchart.powerData}
                          options={pushdownchart.options}
                        />
                      </div>
                    </Col>
                    <Col xl="6">
                      <div className="chart h-100">
                        {/* Chart wrapper */}
                        <Line
                          data={energychart.data}
                          options={energychart.options}
                        />
                      </div>
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
            <Card className="bg-white h-25vh">
              <CardTitle className="h1 py-1 pl-3 mb-0 bg-gradient-light text-darker">
                Query Result
              </CardTitle>
              <CardBody className="py-0 px-0 overflow-auto">
                <Table
                  className="align-items-center text-center bg-white"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" className="text-sm w-50">
                        Normaized Query
                      </th>
                      <th scope="col" className="text-sm">
                        Requests
                      </th>
                      <th scope="col" className="text-sm">
                        AVG Latency
                      </th>
                      <th scope="col" className="text-sm">
                        Total Time
                      </th>
                      <th scope="col" className="text-sm">
                        Percent Time
                      </th>
                      <th scope="col" className="text-sm">
                        Rows/Query
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(
                      { length: NormalizedQuery.length },
                      (_, i) => i
                    ).map((index) => (
                      <tr>
                        <td>
                          <Row>
                            <Col xl="1">
                              <Input type="checkbox" />
                            </Col>
                            <Col xl="10">
                              {NormalizedQuery[index].length < 105
                                ? NormalizedQuery[index]
                                : NormalizedQuery[index].slice(0, 95) + "..."}
                            </Col>
                          </Row>
                        </td>
                        <td>
                          <Progress
                            max="100"
                            value={index * 10}
                            color="primary"
                            style={{ height: "20px", width: "60px" }}
                          />
                        </td>
                        <td>
                          <Progress
                            max="100"
                            value={100 - index * 10}
                            color="primary"
                            style={{ height: "20px", width: "60px" }}
                          />
                        </td>
                        <td>
                          <Progress
                            max="100"
                            value={100 - index * 10}
                            color="primary"
                            style={{ height: "20px", width: "60px" }}
                          />
                        </td>
                        <td>
                          <Progress
                            max="100"
                            value={100 - index * 10}
                            color="primary"
                            style={{ height: "20px", width: "60px" }}
                          />
                        </td>
                        <td>
                          <Progress
                            max="100"
                            value={100 - index * 10}
                            color="primary"
                            style={{ height: "20px", width: "60px" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          {/*<Col xl="2" className="px-0">
            <Card className="bg-white h-100">
              <CardTitle className="h1 py-1 mb-0 bg-gradient-light text-darker text-center">
                Effect Result
              </CardTitle>
              <CardBody className="py-0 px-0">
                {isSimul && (
                  <Table striped responsive>
                    <tbody className="text-center">
                      <tr>
                        <td className="font-weight-bold">
                          <h3>Set 1 Energy Usage Forcast</h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4>{SSDEnergyUsageForcast + " W"}</h4>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <h3>Set 2 Energy Usage Forcast</h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4>{CSDEnergyUsageForcast + " W"}</h4>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <h3>Energy Conservation Effect Forcast</h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4>{conservationEffectForcast + " %"}</h4>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-weight-bold">
                          <h3>Efficient Option</h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 className="text-danger">{efficientOption}</h4>
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
                          <h3>Energy Conservation Effect</h3>
                        </td>
                      </tr>
                      <tr className="w-100">
                        <td>
                          <h4 className="text-danger">
                            {conservationEffect + " %"}
                          </h4>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </CardBody>
            </Card>
                </Col>*/}
        </Row>

        {/* Query snippet
        <Card className="bg-white h-50">
              <CardTitle className="h1 py-1 pl-3 mb-0 bg-gradient-light text-darker">
                Query Snippet
              </CardTitle>
              <CardBody className="py-0 px-0">
                <Table
                  className="align-items-center text-center bg-white"
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
                  </tbody>
                </Table>
              </CardBody>
            </Card> */}

        {/* <Row className="mt-5">
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
                    <Col xl="6">
                      <Form>
                        <h3 className="mb-2">Generated Query</h3>
                        <Input
                          id="exampleFormControlTextarea1"
                          innerRef={inputRef}
                          placeholder="Write a large text here ..."
                          rows="9"
                          type="textarea"
                          disabled
                        />
                        <div className="mt-4">
                          <Button
                            block
                            color="primary"
                            size="lg"
                            type="button"
                            onClick={generateAPI}
                          >
                            Generate API
                          </Button>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row> */}
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

export default Energy;
