import React, {Component} from 'react';
import {
    Container,
    Navbar,
    NavbarBrand,
    NavItem,
    Nav,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from 'reactstrap';
import { connect } from 'react-redux';
import { setCountry } from "../actions";
import { TiLocation } from "react-icons/ti";


class Searchbar extends Component {
    constructor(props){
      super(props);

      this.state ={
        selectedCountry: "India"
      }

      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
      this.setState({
        selectedCountry: e.target.value
      });
      this.props.setCountry(e.target.id);
    }
  
      render() {
        return (<div>
            <Navbar color="success" light expand="md">
              <Container fluid>
              <NavbarBrand href="/">News</NavbarBrand> 
                <Nav className="ml-auto" navbar>
                   <NavItem className="locationIcon"><TiLocation/></NavItem>
                   <UncontrolledDropdown nav inNavbar>
                     <DropdownToggle nav>
                      {this.state.selectedCountry}
                     </DropdownToggle>
                     <DropdownMenu right>
                     <DropdownItem onClick={this.handleClick} id="us" value="USA">
                        USA
                      </DropdownItem>
                      <DropdownItem onClick={this.handleClick} id="in" value="India">
                        India
                      </DropdownItem>
                      <DropdownItem onClick={this.handleClick} id="gb" value="United Kingdom">
                        United Kingdom
                      </DropdownItem>
                      <DropdownItem onClick={this.handleClick} id="ca" value="Canada">
                        Canada    
                      </DropdownItem>
                     </DropdownMenu>
                   </UncontrolledDropdown>
                </Nav>
              </Container>
            </Navbar>
        </div>);
    }
}

export default connect(null,{setCountry})(Searchbar);