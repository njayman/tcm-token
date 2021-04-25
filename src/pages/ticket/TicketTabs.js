import React from "react";
import { Link } from "react-router-dom";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import classnames from "classnames";
import BasicInfo from "./BasicInfoFields/BasicInfo";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "./../../components/panel/panel.jsx";

//import { Collapse, CardHeader, CardBody, Card } from 'reactstrap';
//import Actions from "./../../../src/components/ticket/Action";
//import Card from "./../../../src/components/ticket/Card";
//import Filter from "./../../../src/components/ticket/Filters";
//import Category from "./../../../src/components/ticket/Category";
//import "./../../../src/components/kanban/style.css";

class TicketTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1",
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  toggleCollapse() {
    console.log("lll");
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/tickets">Tickets</Link>
          </li>
        </ol>
        <h1 className="page-header">Ticket-profile</h1>
        <div className="row">
          <div className="col-xl-10">
            <Panel>
              <PanelHeader noButton>Tickets</PanelHeader>
              <PanelBody>
                <h1>Ticket name</h1>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#b6c2c9",
                  }}
                >
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        style={{ background: "#FFC69F" }}
                        className={classnames({
                          active: this.state.activeTab === "1",
                        })}
                        onClick={() => {
                          this.toggleTab("1");
                        }}
                      >
                        <span className="d-sm-none">Basic information</span>
                        <span className="d-sm-block d-none">
                          Basic information
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ background: "#DED99F" }}
                        className={classnames({
                          active: this.state.activeTab === "2",
                        })}
                        onClick={() => {
                          this.toggleTab("2");
                        }}
                      >
                        <span className="d-sm-none">Data Spreadsheet</span>
                        <span className="d-sm-block d-none">
                          Data Spreadsheet
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ background: "#FFC6FF" }}
                        className={classnames({
                          active: this.state.activeTab === "3",
                        })}
                        onClick={() => {
                          this.toggleTab("3");
                        }}
                      >
                        <span className="d-sm-none">Comments</span>
                        <span className="d-sm-block d-none">Comments</span>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        style={{ background: "#FFF5AD" }}
                        className={classnames({
                          active: this.state.activeTab === "4",
                        })}
                        onClick={() => {
                          this.toggleTab("4");
                        }}
                      >
                        <span className="d-sm-none">Reviews</span>
                        <span className="d-sm-block d-none">Reviews</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ background: "#A2F5AD" }}
                        className={classnames({
                          active: this.state.activeTab === "5",
                        })}
                        onClick={() => {
                          this.toggleTab("5");
                        }}
                      >
                        <span className="d-sm-none">Sharing</span>
                        <span className="d-sm-block d-none">Sharing</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ background: "#FFFFC9" }}
                        className={classnames({
                          active: this.state.activeTab === "6",
                        })}
                        onClick={() => {
                          this.toggleTab("6");
                        }}
                      >
                        <span className="d-sm-none">Notes</span>
                        <span className="d-sm-block d-none">Notes</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <div>
                    <div className="btn-group mx-2">
                      <button className="btn btn-default">Action</button>
                      <UncontrolledButtonDropdown>
                        <DropdownToggle caret color="default"></DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>Action 1</DropdownItem>
                          <DropdownItem>Action 2</DropdownItem>
                          <DropdownItem>Action 3</DropdownItem>
                          <DropdownItem divider></DropdownItem>
                          <DropdownItem>Action 4</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                  </div>
                </div>

                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <BasicInfo />
                  </TabPane>
                  <TabPane tabId="2">
                    <h4>Data input in spreadsheet</h4>
                    <p>
                      Nullam ac sapien justo. Nam augue mauris, malesuada non
                      magna sed, feugiat blandit ligula. In tristique tincidunt
                      purus id iaculis. Pellentesque volutpat tortor a mauris
                      convallis, sit amet scelerisque lectus adipiscing.
                    </p>
                  </TabPane>
                  <TabPane tabId="3">
                    <h4>Comments</h4>
                    <p>
                      Nullam ac sapien justo. Nam augue mauris, malesuada non
                      magna sed, feugiat blandit ligula. In tristique tincidunt
                      purus id iaculis. Pellentesque volutpat tortor a mauris
                      convallis, sit amet scelerisque lectus adipiscing.
                    </p>
                  </TabPane>

                  <TabPane tabId="4">
                    <h4>Reviews</h4>
                    <p>
                      Nullam ac sapien justo. Nam augue mauris, malesuada non
                      magna sed, feugiat blandit ligula. In tristique tincidunt
                      purus id iaculis. Pellentesque volutpat tortor a mauris
                      convallis, sit amet scelerisque lectus adipiscing.
                    </p>
                  </TabPane>
                  <TabPane tabId="5">
                    <h4>Sharing</h4>
                    <p>
                      Nullam ac sapien justo. Nam augue mauris, malesuada non
                      magna sed, feugiat blandit ligula. In tristique tincidunt
                      purus id iaculis. Pellentesque volutpat tortor a mauris
                      convallis, sit amet scelerisque lectus adipiscing.
                    </p>
                  </TabPane>
                  <TabPane tabId="6">
                    <h4>Notes</h4>
                    <p>
                      Nullam ac sapien justo. Nam augue mauris, malesuada non
                      magna sed, feugiat blandit ligula. In tristique tincidunt
                      purus id iaculis. Pellentesque volutpat tortor a mauris
                      convallis, sit amet scelerisque lectus adipiscing.
                    </p>
                  </TabPane>
                </TabContent>
              </PanelBody>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketTabs;
