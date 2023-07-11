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
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Col,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  return (
    <>
      <Col xl="1">
        <Navbar className="navbar-top ml-2" expand="md" id="navbar-main">
          <Link className="h1 mr-2" to="admin/workbench">
            <img
              width={"40px"}
              src={require("../../assets/img/icons/home.png")}
              alt="..."
            />
          </Link>
          <Link className="h1 mr-3 mt-2" to="/admin/energy">
            <i className="ni ni-button-power"></i>
          </Link>
          <Link className="h1 mr-2 mt-2" to="/admin/pushdown">
            <i className="ni ni-chart-bar-32"></i>
          </Link>
        </Navbar>
      </Col>
    </>
  );
};

export default AdminNavbar;
