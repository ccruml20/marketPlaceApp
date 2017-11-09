"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProjects} from '../../actions/projectsActions';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

import ProjectItem from './projectsItem';
import ProjectsForm from './projectsForm';
import Cart from './cart';


class ProjectsList extends React.Component {
  componentDidMount() {
    //Dispatch action
    this.props.getProjects()
  }
  render() {
    const projectsList = this.props.projects.map((projectArr)=>{
      return (
        <Col xs={12}  sm={6} md={4} key={projectArr._id}>
          <ProjectItem
            _id= {projectArr._id}
            title= {projectArr.title}
            description={projectArr.description}
            images={projectArr.images}
            price={projectArr.price}/>
          </Col>
        )
      })
      return(
        <Grid>
          <Row>
            <Carousel>
              <Carousel.Item>
                <img width={1600} height={500} alt="1600x500" src="/images/home_001.jpg" />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={1600} height={500} alt="1600x500" src="/images/home_002.jpg" />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Row>
          <Row>
            <Cart />
          </Row>
          <Row style={{marginTop: '15px'}}>
            {projectsList}
          </Row>
        </Grid>
      )
    }
  }
  function mapStateToProps(state){
    return {
      projects: state.projects.projects
    }
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      getProjects:getProjects,
    }, dispatch)
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
