import React, {Component} from 'react';
import {TextField, Button, Container, Divider} from '@material-ui/core';
import {Card, CardHeader, CardContent} from '@material-ui/core';

import { useLocation } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import {saveAs} from 'file-saver';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import GetAppIcon from '@material-ui/icons/GetApp';
import {Row, Col} from 'react-bootstrap';
import {Paper, withStyles, Grid} from '@material-ui/core';
import { axiosIntance } from '../../../config'
import "../../loader.css";
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 1.5,
  },
  padding: {
    padding: theme.spacing.unit,
  },
});

class Experience extends Component {
constructor(props){
  super(props);
  this.createAndDownloadPDF=this.createAndDownloadPDF.bind(this);
}
  state={isLoading:true};
  continue = e => {
    e.preventDefault ();
    this.props.nextStep ();
  };

  back = e => {
    e.preventDefault ();
    this.props.prevStep ();
  };

  createAndDownloadPDF = () => {
    const id=(this.props.history.location.pathname.split("/"))[2];
    this.setState({isLoading:false});
    axiosIntance
      .post (`/auth/create-pdf/${id}`, this.props.values)
      .then (() => {
        console.log(this.state);  
        
        console.log(this.state);  
        axiosIntance
          .get (`/auth/fetch-pdf/${id}`, {responseType: 'arraybuffer'})
          .then (res => {
            this.setState({isLoading:true});
            const pdfBlob = new Blob ([res.data], {type: 'application/pdf'});
            saveAs (pdfBlob, `${this.props.values.firstname}'s Resume.pdf`);
          })
          .catch (err => {
            this.setState({isLoading:true});
            console.log (err);
          });
      })
      
    };
    // axiosIntance.get('/check').then(()=>{
    //   console.log("working");
    // })
    // const user = {
    //   username: "nitik77",
    //   email: "nitiknarang77@gmail.com",
    //   password: "nitik123@NN",
    // };
//     axiosIntance.get("/auth/check" ).then(()=>{
// console.log("yes")
//     })
//       .catch (err => {
        
//         console.log (err);
//       });
//   };

  render () {
    const {values} = this.props;
    const {classes} = this.props;
    

    return (
      
      <Paper className={classes.padding}>
        <Card>
          <CardHeader title="Extra Details" />
        </Card>
        <CardContent>
          <div className={classes.margin}>
            <Grid container spacing={2} alignItems="center" lg={12}>
              <Grid
                item
                xs={12}
                lg={4}
                alignItems="flex-end"
                alignContent="flex-end"
              >
                <h5>
                  <CheckCircleIcon />
                  <span className="pl-3">Skills/Languages</span>
                </h5>
              </Grid>
              <Grid item xs={0} lg={8} />
              <br />
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill1"
                  label="Skill 1"
                  style={{width: '90%'}}
                  value={values.skill1}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill2"
                  label="Skill 2"
                  style={{width: '90%'}}
                  value={values.skill2}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill3"
                  label="Skill 3"
                  style={{width: '90%'}}
                  value={values.skill3}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill4"
                  label="Skill 4"
                  style={{width: '90%'}}
                  value={values.skill4}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>

              <Grid item md={4} sm={6} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="skill5"
                  label="Skill 5"
                  style={{width: '90%'}}
                  value={values.skill5}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>

              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Skill 6"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="skill6"
                  value={values.skill6}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Divider />
            <br />
            <Grid container spacing={2} alignItems="flex-start" lg={12}>
              <Grid
                item
                xs={12}
                lg={4}
                alignItems="flex-end"
                alignContent="flex-end"
              >
                <h5>
                  <CheckCircleIcon />
                  <span className="pl-3">Interest</span>
                </h5>
              </Grid>
              <Grid item xs={0} lg={8} />
              <br />
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 1"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="interest1"
                  value={values.interest1}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 2"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="interest2"
                  value={values.interest2}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 3"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="interest3"
                  value={values.interest3}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 4"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="interest4"
                  value={values.interest4}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 5"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="interest5"
                  value={values.interest5}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  label="Interest 6"
                  variant="outlined"
                  style={{width: '90%'}}
                  name="interest6"
                  value={values.interest6}
                  onChange={this.props.handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="start" />,
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </CardContent>
        <Container className={classes.margin}>
          <Row>
            <Col xs={4} />
            <Col xs={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.back}
                startIcon={<NavigateBeforeIcon />}
              >
                Back
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant="contained"
                disabled
                color="secondary"
                onClick={this.continue}
                endIcon={<NavigateNextIcon />}
              >
                Next
              </Button>
            </Col>
            <Col xs={4} />
          </Row>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={this.createAndDownloadPDF}
            endIcon={<GetAppIcon />}
          >
            Download Resume
          </Button>
          {this.state.isLoading?(<h1></h1>):<div className="loader">Loading...</div>}
        </Container>
        <p className="text-center text-muted">Page 4</p>
      </Paper>
      
      
      
    );
  }
}

export default withStyles (styles) ( withRouter(Experience));