import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import './Header.css';
function Header() {
  return (
    <div className='Header'>
<h1>PAGAMENTOS</h1>
<Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
      <Col sm={3} className="header header-nav">
          <img src="./LOGOOFC.jpg" alt="Logo" />
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Gerenciar estoque</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Pacientes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Agenda</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="quarto">Pagamentos</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>{}</Tab.Content>
        </Col>
      </Row>
    </Tab.Container>

    </div>
  );
}

export default Header;