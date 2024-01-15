import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

const About = () => {
  return (
    <Row className='mt-5' style={{marginRight: "0"}}>
        <Col className='text-center'>
            <Button variant='primary' href='https://facebook.com' size='lg'>
                Hello my page
            </Button>
        </Col>
    </Row>
  )
}

export default About