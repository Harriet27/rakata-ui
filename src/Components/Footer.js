import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { useSelector } from 'react-redux';

const Footer = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <div>
      <div style={styles.pageContainer}>
        <MDBFooter className="font-small pt-3 mt-4">
          <MDBContainer fluid className="text-center">
            <MDBRow>
              <MDBCol>
                <h5 className="title">
                  {
                    role === 'admin'
                    ?
                    <a href="/product" style={styles.home}>Prima Qualiti Rakata</a>
                    :
                    <a href="/" style={styles.home}>Prima Qualiti Rakata</a>
                  }
                </h5>
                <p>
                  We're Here to Serve <br/> 
                  Providing You With the Products to Keep Your Production Moving
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()} Copyright: <a href="/auth" style={styles.link}>Rakata.co</a>
            </MDBContainer>
          </div>
        </MDBFooter>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    position: 'absolute',
    display: 'block',
    justifyContent: 'space-around',
    backgroundColor: '#1E2535',
    color: 'white',
    height: '190px',
    width: '100%',
    marginTop: '10px',
  },
  home: {
    color: 'white',
    textDecoration: 'none',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
};

export default Footer;
