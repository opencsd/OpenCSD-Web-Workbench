/*!chart

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
  PopoverBody,
  UncontrolledPopover,
  Spinner,
} from "reactstrap";

import { chartOptions, parseOptions } from "variables/charts.js";
import {
  energychart,
  pushdowneffectcheckchart,
  querychart,
  pushdownchart,
} from "variables/charts";
// core components
import Header from "components/Headers/Header.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import useDidMountEffect from "components/Hooks/useDidMountEffect.js";

const Energy = () => {
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

  //Query Input
  const [value, setValue] = useState("Select Query");
  const [ind, setInd] = useState(0);
  const [valueErr, setValueErr] = useState(false);
  const [optionErr, setOptionErr] = useState(false);
  const [barChart, setBarChart] = useState({});
  const [lineChart, setLineChart] = useState({});
  const [Data, setData] = useState([]);

  const Query = useRef();

  const handleDropdownClick = (index, e) => {
    setValue(e.target.getAttribute("value"));
    setInd(index);
  };

  const handleQuerySimul = (e) => {
    if (!selectedOption) setOptionErr(true);
    else setOptionErr(false);
    if (!Query.current.value) setValueErr(true);
    else setValueErr(false);
    if (selectedOption && Query.current.value) {
      setNormalizedQuery([...NormalizedQuery, Query.current.value]);
      setOptionResult([
        ...optionResult,
        [...customSet[selectedOption].Set, selectedOption],
      ]);
      fetch("http://10.0.5.123:40400/pushdown", {
        //회원가입시 입력한 값들이 서버로 전송될 수 있는 주소
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          environment: {
            storage: userEnv[0],
            net: userEnv[1],
            dbms: userEnv[2],
            csdCount: userEnv[3],
            csdKind: userEnv[4],
            algorithm: userEnv[5],
            index: userEnv[6],
            blockSize: userEnv[7],
          },
          queryID: ind - 1,
          options: {
            net: customSet[selectedOption].Set[0],
            dbms: customSet[selectedOption].Set[1],
            csdCount: customSet[selectedOption].Set[2],
            csdKind: customSet[selectedOption].Set[3],
            algorithm: customSet[selectedOption].Set[4],
            index: customSet[selectedOption].Set[5],
            blockSize: customSet[selectedOption].Set[6],
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setData([...Data, data]);
        });
    }
  };

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

  //Option Modal
  const [userEnv, setUserEnv] = useState([
    "CSD",
    "145",
    "MySQL",
    "8",
    "NGD",
    "CSD Metric Score",
    "Use",
    "4096",
  ]);
  const [NetSelected, setNetSelected] = useState("145");
  const [CSDNumSelected, setCSDNumSelected] = useState("8");
  const [CSDKindSelected, setCSDKindSelected] = useState("NGD");
  const [DBMSSelected, setDBMSSelected] = useState("MySQL");
  const [AlgorithmSelected, setAlgorithmSelected] =
    useState("CSD Metric Score");
  const [IndexSelected, setIndexSelected] = useState("Use");
  const [BlockSizeSelected, setBlockSizeSelected] = useState("4096");
  const [addModal, setAddModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [snippetModal, setSnippetModal] = useState(false);
  const [pushdownModal, setPushdownModal] = useState(false);
  const [weightModal, setWeightModal] = useState(false);

  const handleNet = (e) => {
    setNetSelected(e.target.value);
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

  //(Add)
  const resetOptions = () => {
    setNetSelected("145");
    setDBMSSelected("MySQL");
    setCSDNumSelected("8");
    setCSDKindSelected("NGD");
    setAlgorithmSelected("CSD Metric Score");
    setIndexSelected("Use");
    setBlockSizeSelected("4096");
  };

  const toggle = () => {
    setAddModal(!addModal);
    resetOptions();
  };

  const add = () => {
    toggle();
    setCustomSet([
      ...customSet,
      {
        Set: [
          NetSelected,
          DBMSSelected,
          CSDNumSelected,
          CSDKindSelected,
          AlgorithmSelected,
          IndexSelected,
          BlockSizeSelected,
        ],
      },
    ]);
    setSelectedOptions(customSet.length);
  };

  //(Modify)
  const toggle2 = (e) => {
    setModifyModal(!modifyModal);
  };
  const modify = () => {
    toggle2();
    const updatedOption = [...customSet];
    updatedOption[set].Set = [
      NetSelected,
      DBMSSelected,
      CSDNumSelected,
      CSDKindSelected,
      AlgorithmSelected,
      IndexSelected,
      BlockSizeSelected,
    ];
    setCustomSet(updatedOption);
  };

  //(Result)

  const toggle3 = (e) => {
    setResultModal(!resultModal);
  };

  //(Snippet)
  const toggle4 = (e) => {
    setSnippetModal(!snippetModal);
  };

  //(Pushdown)
  const toggle5 = (e) => {
    setPushdownModal(!pushdownModal);
  };

  //(Weight)
  const toggle6 = (e) => {
    setWeightModal(!weightModal);
  };

  //OptionSet Handling
  const [customSet, setCustomSet] = useState([{ Set: [, , , ,] }]);
  const [selectedOption, setSelectedOptions] = useState(0);
  const [set, setSet] = useState(0);
  const [optionResult, setOptionResult] = useState([]);

  const handleOptionInfo = (index, e) => {
    toggle2();
    setSet(index);
    if (index !== -1) {
      setNetSelected(customSet[index].Set[0]);
      setDBMSSelected(customSet[index].Set[1]);
      setCSDNumSelected(customSet[index].Set[2]);
      setCSDKindSelected(customSet[index].Set[3]);
      setAlgorithmSelected(customSet[index].Set[4]);
      setIndexSelected(customSet[index].Set[5]);
      setBlockSizeSelected(customSet[index].Set[6]);
    }
  };

  const handleSelectOption = (index, e) => {
    setSelectedOptions(index);
  };

  //Selected Query
  const [NormalizedQuery, setNormalizedQuery] = useState([]);
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [QueryOption, setQueryOption] = useState([, , , , , , , 0]);
  const [selectedData, setSelectedData] = useState([]);
  const [currentResult, setCurrentResult] = useState();
  const [resultChart, setResultChart] = useState({});
  const [resultMetric, setResultMetric] = useState("CPU");

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };

  const handleResultMetric = (e) => {
    setResultMetric(e.target.getAttribute("value"));
  };

  const handleResultOptions = (index, e) => {
    setQueryOption(optionResult[index]);
    Query.current.value = NormalizedQuery[index];
    setCurrentResult(index);
    const requestBody = {
      data: Data[index],
      index: index,
    };
    fetch("http://10.0.5.123:40400/resultChart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // 응답 처리
        setResultChart(data);
      })
      .catch((error) => {
        // 오류 처리
        console.error(error);
      });
    toggle3();
  };

  //Result Chart
  const [CPU, setCPU] = useState();
  const [Net, setNet] = useState();
  const [Power, setPower] = useState();
  const [Time, setTime] = useState();
  const [weight, setWeight] = useState([]);

  useDidMountEffect(() => {
    setWeight([CPU, Net, Power, Time]);
  }, [CPU, Net, Power, Time]);
  useDidMountEffect(() => {
    const updateSelectedData = checkedInputs.map((index) => Data[index]);
    setSelectedData(updateSelectedData);
  }, [checkedInputs]);
  useDidMountEffect(() => {
    if (selectedData.length > 0) {
      fetch("http://10.0.5.123:40400/charts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: selectedData,
          index: checkedInputs,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // 응답 처리
          setBarChart(data.bar);
          setLineChart(data.line);
        })
        .catch((error) => {
          // 오류 처리
          console.error(error);
        });
    }
  }, [selectedData]);

  const handleWeight = () => {
    const updatedLineChart = {
      ...lineChart,
    };

    for (const [key, value] of Object.entries(updatedLineChart)) {
      if (value.labels.includes("Score")) {
        // labels에 "Score"가 이미 존재하면 마지막 인덱스의 값을 교체합니다.
        updatedLineChart[key] = {
          ...value,
          datasets: value.datasets.map((dataset) => ({
            ...dataset,
            data: [
              ...dataset.data.slice(0, -1),
              100 -
                Math.round(
                  dataset.data
                    .slice(0, 4)
                    .map((val, i) => val * weight[i])
                    .reduce((total, val) => total + val, 0)
                ),
            ],
          })),
        };
      } else {
        // labels에 "Score"가 없으면 뒤에 추가합니다.
        updatedLineChart[key] = {
          ...value,
          labels: [...value.labels, "Score"],
          datasets: value.datasets.map((dataset) => ({
            ...dataset,
            data: [
              ...dataset.data,
              100 -
                Math.round(
                  dataset.data
                    .map((val, i) => val * weight[i])
                    .reduce((total, val) => total + val, 0)
                ),
            ],
          })),
        };
      }
    }
    console.log(updatedLineChart);
    setLineChart(updatedLineChart);
    toggle6();
  };

  //Template
  const [template, setShowTemplate] = useState(false);
  const [tableName, setTableName] = useState("");
  const [whereClause, setWhereClause] = useState("");
  const [columnName, setColumnName] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [groupBy, setGroupBy] = useState("");

  const inputRef = useRef();

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

  //Snippet Info
  const [snippet, setSnippet] = useState([]);

  //Result
  // const [isSimul, setIsSimul] = useState(false);
  // const [CSDEnergyUsageForcast, setCSDEnergyUsageForcast] = useState();
  // const [conservationEffectForcast, setConservationEffectForcast] = useState();
  // const [efficientOption, setEfficientOption] = useState();
  // const [error, setError] = useState();
  // const [energyUsage, setEnergyUsage] = useState();
  // const [conservationEffect, setConservationEffect] = useState();

  //Chart
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  const [metric, setMetric] = useState("CPU");
  const [storage, setStorage] = useState("Total");
  const handleMetric = (e) => {
    setMetric(e.target.getAttribute("value"));
  };
  const handleStorageChart = (e) => {
    setStorage(e.target.getAttribute("value"));
  };

  //Others
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

  //For Demo
  const [workbench, setWorkbench] = useState(true);
  const [simulator, setSimulator] = useState(true);
  const [dbConnector, setDBConnector] = useState(false);
  const [SE, setSE] = useState(false);
  const [CSDPushdown, setCSDPushdown] = useState(false);
  const [result, setResult] = useState(false);

  const [currentIns, setCurrentIns] = useState("Console Log");
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
        setTimeout(() => {
          if (!selectedOption) setOptionErr(true);
          else setOptionErr(false);
          if (!Query.current.value) setValueErr(true);
          else setValueErr(false);
          if (selectedOption && Query.current.value) {
            setNormalizedQuery([...NormalizedQuery, Query.current.value]);
            setOptionResult([
              ...optionResult,
              [...customSet[selectedOption].Set, selectedOption],
            ]);
            fetch("http://10.0.5.123:40400/pushdown", {
              //회원가입시 입력한 값들이 서버로 전송될 수 있는 주소
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                environment: {
                  storage: userEnv[0],
                  net: userEnv[1],
                  dbms: userEnv[2],
                  csdCount: userEnv[3],
                  csdKind: userEnv[4],
                  algorithm: userEnv[5],
                  index: userEnv[6],
                  blockSize: userEnv[7],
                },
                queryID: ind - 1,
                options: {
                  net: customSet[selectedOption].Set[0],
                  dbms: customSet[selectedOption].Set[1],
                  csdCount: customSet[selectedOption].Set[2],
                  csdKind: customSet[selectedOption].Set[3],
                  algorithm: customSet[selectedOption].Set[4],
                  index: customSet[selectedOption].Set[5],
                  blockSize: customSet[selectedOption].Set[6],
                },
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                setData([...Data, data]);
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
        <Row className="mt-7 justify-content-center">
          <Col xl="3" className="px-0">
            {!workbench ? (
              <Card className="bg-light h-100">
                <CardTitle className="h2 py-1 pl-2 mb-0 bg-gradient-light text-darker text-left">
                  <Row className="pl-3">{currentIns}</Row>
                </CardTitle>
                <CardBody className="py-0 px-0 bg-darker overflow-hidden">
                  <iframe src={host} width="100%" height="100%" title="wssh" />
                </CardBody>
              </Card>
            ) : (
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
            )}
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
                    <Modal centered isOpen={addModal} toggle={toggle} size="lg">
                      <ModalHeader toggle={toggle}>
                        Set Simulator Option
                      </ModalHeader>
                      <ModalBody>
                        <Form>
                          <Row>
                            <Col md="6">
                              <FormGroup row>
                                <Label for="Network" sm="3" className="h3">
                                  Net :
                                </Label>
                                <Col sm="9">
                                  <Input
                                    id="Network"
                                    placeholder="Network"
                                    type="text"
                                    onChange={handleNet}
                                    defaultValue={"145"}
                                  />
                                </Col>
                              </FormGroup>
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
                    <tr>
                      <th scope="row" colSpan={2} className="w-75">
                        <Button
                          className="mt-1 "
                          color="warning"
                          size="lg"
                          block
                          type="button"
                          onClick={(e) => handleOptionInfo(-1)}
                        >
                          User Environment
                        </Button>
                      </th>
                    </tr>
                    {Array.from(
                      { length: customSet.length - 1 },
                      (_, i) => i + 1
                    ).map((index) => (
                      <tr>
                        <th scope="row" className="w-75">
                          <Button
                            className="mt-1 "
                            color="primary"
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
                            outline={index !== selectedOption}
                            onClick={(e) => handleSelectOption(index, e)}
                          >
                            <i className="ni ni-check-bold text-xl" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Modal centered isOpen={modifyModal} toggle={toggle2} size="lg">
                  <ModalHeader toggle={toggle2}>
                    Show Simulator Option
                  </ModalHeader>
                  {set === -1 ? (
                    <ModalBody>
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
                              <h4>{userEnv[0]}</h4>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <h3>Net</h3>
                            </th>
                            <td>
                              <h4>{userEnv[1]} Mbps</h4>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <h3>DBMS</h3>
                            </th>
                            <td>
                              <h4>{userEnv[2]}</h4>
                            </td>
                          </tr>
                          {userEnv[0] === "CSD" && (
                            <tr>
                              <th scope="row">
                                <h3>CSD Count</h3>
                              </th>
                              <td>
                                <h4>{userEnv[3]}</h4>
                              </td>
                            </tr>
                          )}
                          {userEnv[0] === "CSD" && (
                            <tr>
                              <th scope="row">
                                <h3>CSD Kind</h3>
                              </th>
                              <td>
                                <h4>{userEnv[4]}</h4>
                              </td>
                            </tr>
                          )}
                          <tr>
                            <th scope="row">
                              <h3>Algorithm</h3>
                            </th>
                            <td>
                              <h4>{userEnv[5]}</h4>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <h3>Index</h3>
                            </th>
                            <td>
                              <h4>{userEnv[6]}</h4>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <h3>Block Size</h3>
                            </th>
                            <td>
                              <h4>{userEnv[7]}</h4>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </ModalBody>
                  ) : (
                    <ModalBody>
                      <Form>
                        <Row>
                          <Col md="6">
                            <FormGroup row>
                              <Label for="Network" sm="3" className="h3">
                                Net :
                              </Label>
                              <Col sm="9">
                                <Input
                                  id="Network"
                                  placeholder="Network"
                                  type="text"
                                  onChange={handleNet}
                                  defaultValue={NetSelected}
                                />
                              </Col>
                            </FormGroup>
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
                                  disabled
                                  onChange={handleDBMS}
                                  defaultValue={DBMSSelected}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                        </Row>
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
                                  disabled
                                  onChange={handleCSDCount}
                                  defaultValue={CSDNumSelected}
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
                                  disabled
                                  onChange={handleBlockSize}
                                  defaultValue={BlockSizeSelected}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  )}
                  <ModalFooter>
                    {set === -1 ? (
                      <Button block color="light" onClick={toggle2}>
                        CLOSE
                      </Button>
                    ) : (
                      <Button block color="primary" onClick={modify}>
                        MODIFY
                      </Button>
                    )}
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
                  CSD Option {" " + QueryOption[QueryOption.length - 1]}
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
                        <h3>Network</h3>
                      </th>
                      <td
                        className={
                          QueryOption[0] ? "text-center" : "text-right"
                        }
                      >
                        <h4>{QueryOption[0]} Mbps</h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <h3>DBMS</h3>
                      </th>
                      <td>
                        <h4>{QueryOption[1]}</h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <h3>CSD Count</h3>
                      </th>
                      <td>
                        <h4>{QueryOption[2]}</h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <h3>CSD Kind</h3>
                      </th>
                      <td>
                        <h4>{QueryOption[3]}</h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <h3>Algorithm</h3>
                      </th>
                      <td>
                        <h4>{QueryOption[4]}</h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <h3>Index</h3>
                      </th>
                      <td>
                        <h4>{QueryOption[5]}</h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <h3>Block Size</h3>
                      </th>
                      <td>
                        <h4>{QueryOption[6]}</h4>
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
              <CardBody className="py-0 px-0 align-items-end">
                {checkedInputs.length > 0 && (
                  <div className="h-100">
                    <Row
                      style={{ height: "10%" }}
                      className="align-items-center"
                    >
                      <Col xl="6">
                        <UncontrolledDropdown nav>
                          <DropdownToggle className=" ml-3" split size="sm">
                            {metric + " "}
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow">
                            <DropdownItem onClick={handleMetric} value="CPU">
                              <i
                                onClick={handleMetric}
                                value="CPU"
                                className="ni ni-bold-right"
                              />
                              <span onClick={handleMetric} value="CPU">
                                CPU
                              </span>
                            </DropdownItem>
                            <DropdownItem onClick={handleMetric} value="Net">
                              <i
                                onClick={handleMetric}
                                value="Net"
                                className="ni ni-bold-right"
                              />
                              <span onClick={handleMetric} value="Net">
                                Net
                              </span>
                            </DropdownItem>
                            <DropdownItem onClick={handleMetric} value="Power">
                              <i
                                onClick={handleMetric}
                                value="Power"
                                className="ni ni-bold-right"
                              />
                              <span onClick={handleMetric} value="Power">
                                Power
                              </span>
                            </DropdownItem>
                            <DropdownItem onClick={handleMetric} value="Time">
                              <i
                                onClick={handleMetric}
                                value="Time"
                                className="ni ni-bold-right"
                              />
                              <span onClick={handleMetric} value="Time">
                                Time
                              </span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Col>
                      <Col xl="6">
                        <Row className="align-items-center">
                          <Col xl="2">
                            <UncontrolledDropdown nav>
                              <DropdownToggle className=" ml-3" split size="sm">
                                {storage + " "}
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow">
                                <DropdownItem
                                  onClick={handleStorageChart}
                                  value="SE"
                                >
                                  <i
                                    onClick={handleStorageChart}
                                    value="SE"
                                    className="ni ni-bold-right"
                                  />
                                  <span onClick={handleStorageChart} value="SE">
                                    SE
                                  </span>
                                </DropdownItem>
                                <DropdownItem
                                  onClick={handleStorageChart}
                                  value="CSD"
                                >
                                  <i
                                    onClick={handleStorageChart}
                                    value="CSD"
                                    className="ni ni-bold-right"
                                  />
                                  <span
                                    onClick={handleStorageChart}
                                    value="CSD"
                                  >
                                    CSD
                                  </span>
                                </DropdownItem>
                                <DropdownItem
                                  onClick={handleStorageChart}
                                  value="Total"
                                >
                                  <i
                                    onClick={handleStorageChart}
                                    value="Total"
                                    className="ni ni-bold-right"
                                  />
                                  <span
                                    onClick={handleStorageChart}
                                    value="Total"
                                  >
                                    Total
                                  </span>
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </Col>
                          <Col xl="10" className="text-right">
                            {" "}
                            <Button
                              color="info"
                              size="sm"
                              className="text-sm"
                              onClick={toggle6}
                            >
                              Weights Setting
                            </Button>
                          </Col>
                          <Modal
                            centered
                            isOpen={weightModal}
                            toggle={toggle6}
                            size="sm"
                          >
                            <ModalHeader toggle={toggle6}>
                              Weight Setting
                            </ModalHeader>
                            <ModalBody>
                              <Form className="justify-content-center">
                                <FormGroup row className="align-items-center">
                                  <Label className="col-3 ml-5 text-right">
                                    CPU:
                                  </Label>
                                  <Input
                                    className="col-3"
                                    id="CPU"
                                    type="number"
                                    onChange={(e) =>
                                      setCPU(e.target.value / 100)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup row className="align-items-center">
                                  <Label className="col-3 ml-5 text-right">
                                    Net:
                                  </Label>
                                  <Input
                                    className="col-3"
                                    id="NET"
                                    type="number"
                                    onChange={(e) =>
                                      setNet(e.target.value / 100)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup row className="align-items-center">
                                  <Label className="col-3 ml-5 text-right">
                                    Pow:
                                  </Label>
                                  <Input
                                    className="col-3"
                                    id="POWER"
                                    type="number"
                                    onChange={(e) =>
                                      setPower(e.target.value / 100)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup row className="align-items-center">
                                  <Label className="col-3 ml-5 text-right">
                                    Time:
                                  </Label>
                                  <Input
                                    className="col-3"
                                    id="TIME"
                                    type="number"
                                    onChange={(e) =>
                                      setTime(e.target.value / 100)
                                    }
                                  />
                                </FormGroup>
                              </Form>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="light"
                                size="lg"
                                block
                                className="text-lg"
                                onClick={handleWeight}
                              >
                                Calculate
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </Row>
                      </Col>
                    </Row>
                    <Row style={{ height: "90%" }}>
                      <Col xl="6">
                        <div className="chart h-100">
                          {/* Chart wrapper */}
                          <Bar
                            data={barChart[metric]}
                            options={pushdowneffectcheckchart.options}
                          />
                        </div>
                      </Col>
                      <Col xl="6">
                        <div className="chart h-100">
                          {/* Chart wrapper */}
                          <Line
                            data={lineChart[storage]}
                            options={energychart.options}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
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
                      <th scope="col" className="text-lg w-50">
                        Normalized Query
                      </th>
                      <th
                        scope="col"
                        className="text-lg"
                        style={{ width: "12.5%" }}
                      >
                        CPU
                      </th>
                      <th
                        scope="col"
                        className="text-lg"
                        style={{ width: "12.5%" }}
                      >
                        Network
                      </th>
                      <th
                        scope="col"
                        className="text-lg"
                        style={{ width: "12.5%" }}
                      >
                        Power
                      </th>
                      <th
                        scope="col"
                        className="text-lg"
                        style={{ width: "12.5%" }}
                      >
                        Time
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
                              <Input
                                type="checkbox"
                                className="mt-2"
                                key={index}
                                onChange={(e) => {
                                  changeHandler(e.target.checked, index);
                                }}
                                checked={
                                  checkedInputs.includes(index) ? true : false
                                }
                                disabled={
                                  !checkedInputs.includes(index) &&
                                  checkedInputs.length >= 6
                                    ? true
                                    : false
                                }
                              />
                            </Col>
                            <Col
                              xl="11"
                              className="btn btn-sm text-lg text-darker"
                              onClick={(e) => handleResultOptions(index)}
                            >
                              {NormalizedQuery[index].length <= 60
                                ? NormalizedQuery[index]
                                : NormalizedQuery[index].slice(0, 60) + "..."}
                            </Col>
                          </Row>
                        </td>
                        <td className="text-lg">
                          {Data.length > index ? (
                            Data[index].effectCheck.reduce(
                              (total, item) => total + item.cpuForcast,
                              0
                            )
                          ) : (
                            <Spinner color="secondary">Loading...</Spinner>
                          )}
                        </td>
                        <td className="text-lg">
                          {Data.length > index ? (
                            Data[index].effectCheck.reduce(
                              (total, item) => total + item.netForcast,
                              0
                            )
                          ) : (
                            <Spinner color="secondary">Loading...</Spinner>
                          )}
                        </td>
                        <td className="text-lg">
                          {Data.length > index ? (
                            Data[index].effectCheck.reduce(
                              (total, item) => total + item.powerForcast,
                              0
                            )
                          ) : (
                            <Spinner color="secondary">Loading...</Spinner>
                          )}
                        </td>
                        <td className="text-lg">
                          {Data.length > index ? (
                            Data[index].effectCheck.reduce(
                              (total, item) => total + item.timeForcast,
                              0
                            )
                          ) : (
                            <Spinner color="secondary">Loading...</Spinner>
                          )}
                        </td>
                        <td className="text-lg">
                          <Col xl="3" className="text-right">
                            <Button
                              className="btn-icon btn-2 pl-0 pr-0 py-0"
                              color="transparent"
                              id={`popover${index}`}
                              type="button"
                            >
                              <span className="btn-inner--icon text-xl">
                                <i className="ni ni-fat-add" />
                              </span>
                            </Button>
                          </Col>
                        </td>
                        <UncontrolledPopover
                          placement="top"
                          target={`popover${index}`}
                        >
                          <PopoverBody>
                            <ButtonGroup className="ml-3">
                              <Button
                                color="info"
                                outline
                                size="sm"
                                value={"Snippet"}
                                onClick={toggle4}
                                active
                              >
                                Snippet
                              </Button>
                              <Button
                                color="primary"
                                outline
                                size="sm"
                                value={"Pushdown"}
                                onClick={toggle5}
                                disabled={userEnv[0] === "SSD"}
                                active={userEnv[0] === "CSD"}
                              >
                                Pushdown
                              </Button>
                            </ButtonGroup>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Modal centered isOpen={resultModal} toggle={toggle3} size="xl">
                  <ModalHeader toggle={toggle3}>Query Analysis</ModalHeader>
                  <ModalBody>
                    <Row className="align-items-center">
                      <Col xl="6">
                        <UncontrolledDropdown nav>
                          <DropdownToggle className=" ml-3" split size="sm">
                            {resultMetric + " "}
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow">
                            <DropdownItem
                              onClick={handleResultMetric}
                              value="CPU"
                            >
                              <i
                                onClick={handleResultMetric}
                                value="CPU"
                                className="ni ni-bold-right"
                              />
                              <span onClick={handleResultMetric} value="CPU">
                                CPU
                              </span>
                            </DropdownItem>
                            <DropdownItem
                              onClick={handleResultMetric}
                              value="Net"
                            >
                              <i
                                onClick={handleResultMetric}
                                value="Net"
                                className="ni ni-bold-right"
                              />
                              <span onClick={handleResultMetric} value="Net">
                                Net
                              </span>
                            </DropdownItem>
                            <DropdownItem
                              onClick={handleResultMetric}
                              value="Power"
                            >
                              <i
                                onClick={handleResultMetric}
                                value="Power"
                                className="ni ni-bold-right"
                              />
                              <span onClick={handleResultMetric} value="Power">
                                Power
                              </span>
                            </DropdownItem>
                            <DropdownItem
                              onClick={handleResultMetric}
                              value="Time"
                            >
                              <i
                                onClick={handleResultMetric}
                                value="Time"
                                className="ni ni-bold-right"
                              />
                              <span onClick={handleResultMetric} value="Time">
                                Time
                              </span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <div className="chart">
                          {/* Chart wrapper */}
                          <Bar
                            data={resultChart[resultMetric]}
                            options={pushdowneffectcheckchart.options}
                          />
                        </div>
                      </Col>
                      <Col xl="6">
                        <Table striped responsive>
                          <thead className="text-center thead-light">
                            <tr>
                              <th scope="col">Metric</th>
                              <th scope="col">SSD</th>
                              <th scope="col">CSD</th>
                              <th scope="col">Simulating</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            <tr>
                              <th scope="row">CPU</th>
                              <td className="font-weight-bold">
                                {Data.length > currentResult ? (
                                  Data[0].userSSD.userCPU
                                ) : (
                                  <Spinner color="secondary">
                                    Loading...
                                  </Spinner>
                                )}
                              </td>
                              <td className="font-weight-bold">
                                {Data.length > currentResult ? (
                                  Data[0].userCSD.reduce(
                                    (total, item) => total + item.userCPU,
                                    0
                                  )
                                ) : (
                                  <Spinner color="secondary">
                                    Loading...
                                  </Spinner>
                                )}
                              </td>
                              <td className="font-weight-bold">
                                {Data.length > currentResult ? (
                                  Data[currentResult].effectCheck.reduce(
                                    (total, item) => total + item.cpuForcast,
                                    0
                                  )
                                ) : (
                                  <Spinner color="secondary">
                                    Loading...
                                  </Spinner>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Net</th>
                              <td className="font-weight-bold">
                                {Data.length > currentResult ? (
                                  Data[0].userSSD.userNet
                                ) : (
                                  <Spinner color="secondary">
                                    Loading...
                                  </Spinner>
                                )}
                              </td>
                              <td className="font-weight-bold">
                                {Data.length > currentResult ? (
                                  Data[0].userCSD.reduce(
                                    (total, item) => total + item.userNet,
                                    0
                                  )
                                ) : (
                                  <Spinner color="secondary">
                                    Loading...
                                  </Spinner>
                                )}
                              </td>
                              <td className="font-weight-bold">
                                {Data.length > currentResult ? (
                                  Data[currentResult].effectCheck.reduce(
                                    (total, item) => total + item.netForcast,
                                    0
                                  )
                                ) : (
                                  <Spinner color="secondary">
                                    Loading...
                                  </Spinner>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Power</th>
                              <td className="font-weight-bold">
                                {Data.length > currentResult ? (
                                  Data[0].userSSD.userPower
                                ) : (
                                  <Spinner color="secondary">
                                    Loading...
                                  </Spinner>
                                )}
                              </td>
                              <td className="font-weight-bold">
                                {Data.length > currentResult ? (
                                  Data[0].userCSD.reduce(
                                    (total, item) => total + item.userPower,
                                    0
                                  )
                                ) : (
                                  <Spinner color="secondary">
                                    Loading...
                                  </Spinner>
                                )}
                              </td>
                              <td className="font-weight-bold">
                                {Data.length > currentResult ? (
                                  Data[currentResult].effectCheck.reduce(
                                    (total, item) => total + item.powerForcast,
                                    0
                                  )
                                ) : (
                                  <Spinner color="secondary">
                                    Loading...
                                  </Spinner>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Time</th>
                              <td className="font-weight-bold">
                                {Data.length > currentResult ? (
                                  Data[0].userSSD.userTime
                                ) : (
                                  <Spinner color="secondary">
                                    Loading...
                                  </Spinner>
                                )}
                              </td>
                              <td className="font-weight-bold">
                                {Data.length > currentResult ? (
                                  Data[0].userCSD.reduce(
                                    (total, item) => total + item.userTime,
                                    0
                                  )
                                ) : (
                                  <Spinner color="secondary">
                                    Loading...
                                  </Spinner>
                                )}
                              </td>
                              <td className="font-weight-bold">
                                {Data.length > currentResult ? (
                                  Data[currentResult].effectCheck.reduce(
                                    (total, item) => total + item.timeForcast,
                                    0
                                  )
                                ) : (
                                  <Spinner color="secondary">
                                    Loading...
                                  </Spinner>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter className="text-right">
                    <Button color="light" onClick={toggle3}>
                      CLOSE
                    </Button>
                  </ModalFooter>
                </Modal>
                <Modal isOpen={snippetModal} toggle={toggle4} size="xl">
                  <ModalHeader toggle={toggle4}>Snippet</ModalHeader>
                  <ModalBody>
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
                        {Array.from(
                          { length: snippet.length },
                          (_, i) => i
                        ).map((index) => (
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
                        ))}
                      </tbody>
                    </Table>
                  </ModalBody>
                  <ModalFooter className="text-right">
                    <Button color="light" onClick={toggle4}>
                      CLOSE
                    </Button>
                  </ModalFooter>
                </Modal>
                <Modal
                  centered
                  isOpen={pushdownModal}
                  toggle={toggle5}
                  size="xl"
                >
                  <ModalHeader toggle={toggle5}>Pushdown Analysis</ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col xl="8">
                        <div className="chart">
                          {/* Chart wrapper */}
                          <Bar
                            data={pushdownchart.data}
                            options={pushdownchart.options}
                          />
                        </div>
                      </Col>
                      <Col xl="4">
                        <div className="overflow-hidden"></div>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter className="text-right">
                    <Button color="light" onClick={toggle5}>
                      CLOSE
                    </Button>
                  </ModalFooter>
                </Modal>
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
                </Table>*/}

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
