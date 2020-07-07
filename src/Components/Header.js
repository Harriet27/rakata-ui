import React, { useState } from 'react';
import  { Logout } from '../Redux/Action';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const role = useSelector(state => state.auth.role);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar expand="md" light style={{backgroundColor : '#1E2535'}}>
        <NavbarBrand tag={Link} to={'/'} style={{color: 'white'}}>
          Prima Qualiti Rakata
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar style={{float: 'right'}}>
              <DropdownToggle nav caret style={{color: 'white'}}>
                {
                  role === 'admin'
                  ?
                  <div style={{display: 'inline', fontWeight: '500'}}>
                    <FontAwesomeIcon icon={faLock} style={{color: 'white'}} /> {role}
                  </div>
                  :
                  <FontAwesomeIcon icon={faUser} style={{color: 'white'}} />
                }
              </DropdownToggle>
              <DropdownMenu right>
                {
                  role !== 'admin'
                  ?
                  <div>
                    <Link to='/auth'>
                      <DropdownItem>Login</DropdownItem>
                    </Link>
                  </div>
                  :
                  <div>
                    <Link to='/'>
                      <DropdownItem>Dashboard</DropdownItem>
                    </Link>
                    <Link to='/product'>
                      <DropdownItem>View Products</DropdownItem>
                    </Link>
                    <Link to='/' onClick={() => dispatch(Logout())}>
                      <DropdownItem>Log Out</DropdownItem>
                    </Link>
                  </div>
                }
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
