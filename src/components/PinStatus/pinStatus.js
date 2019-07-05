import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { execGql } from "../apolloClient/apolloClient";
import { getPinStatusQuery, setPinStatusQuery } from '../Queries/queries';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

//.....styles..........
const styles = theme => ({
    layout: {
        width: 'auto',
        backgroundColor: '#3f51b5',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 30,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 350,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
});

class PinStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            setPinStatus: '11',
            getPinStatus: '17',
            result1: '',
            result2: '',
            showloading: false
            //   toggleStatus:''
        }
    }


    async setPinStatus(e) {
        var result = '', errorMessage = '', errors = [];
        this.setState({ showloading: true })
        let pin = this.handleChange(e)

        try {
            result = await execGql('mutation', setPinStatusQuery, this.setPinStatusParams(pin))
        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }
        if (!result) {
            this.setState({ errorMessage: errorMessage })
        }
        else {
            console.log(result);
            this.setState({ result1: JSON.stringify(result.data.result), showloading: false })

        }
    }

    setPinStatusParams(pin) {
        var parameters = {
            "gpiopins": [{
                "GPIOPIN": this.state.setPinStatus,
                "STATUS": pin === true ? "ON" : "OFF"
            }]
        }
        return parameters
    }


    async getPinStatus() {
        var result = '', errorMessage = '', errors = [];
        this.setState({ showloading: true })
        try {
            result = await execGql('query', getPinStatusQuery, this.getPinStatusParams())
        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }
        if (!result) {
            this.setState({ errorMessage: errorMessage })
        }
        else {
            console.log(result);
            this.setState({ result2: JSON.stringify(result.data.result), showloading: false })
        }
    }

    getPinStatusParams() {
        var parameters = {
            "gpiopins": [this.state.getPinStatus]
        }
        return parameters
    }
    handleChange = event => {
        console.log("event.target.checked");
        console.log(event.target.checked);
        console.log("event.target.checked end");
        let btnStatus = event.target.checked
        this.setState({ toggleStatus: event.target.checked });
        return btnStatus
    };
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                {/* <CssBaseline /> */}
                <main className={classes.layout}>
                    <Paper className={classes.paper}>


                        <div className={classes.form}>

                            <FormControl margin="normal" required >
                                <InputLabel htmlFor="setPinStatus">Set Pin Status</InputLabel>
                                <Input
                                    id="setPinStatus"
                                    name="setPinStatus"
                                    //  autoComplete="email"
                                    autoFocus
                                    value={this.state.setPinStatus}
                                    onChange={(e) => this.setState({ setPinStatus: e.target.value })} />
                            </FormControl>

                            <FormControl >
                                <Typography component="div">
                                    <Grid component="label" container alignItems="center" spacing={1}>
                                        <Grid item>Off</Grid>
                                        <Grid item>
                                            <Switch
                                                checked={this.state.toggleStatus}
                                                onChange={(e) => this.setPinStatus(e)}
                                                //  value="checkedC"
                                                color="primary"
                                            />
                                        </Grid>
                                        <Grid item>On</Grid>
                                    </Grid>
                                </Typography>
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="setResult">Result</InputLabel>
                                <Input
                                    id="setResult"
                                    name="setResult"
                                    autoComplete="setResult"
                                    autoFocus
                                    value={this.state.result1}
                                    onChange={(e) => this.setState({ result1: e.target.value })} />
                            </FormControl>

<div>
    <br></br>
    <br></br>
    <br></br>
</div>

                            <FormControl margin="normal" required >
                                <InputLabel htmlFor="getPinStatus">Get Pin Status</InputLabel>
                                <Input
                                    id="getPinStatus"
                                    name="getPinStatus"
                                    //  autoComplete="email"
                                    autoFocus
                                    value={this.state.getPinStatus}
                                    onChange={(e) => this.setState({ getPinStatus: e.target.value })} />
                            </FormControl>

                            <FormControl >
                                <Button
                                    type="submit"

                                    variant="raised"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() => this.getPinStatus("get")}>
                                    GET
                               </Button>
                            </FormControl>

                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="setResult">Result</InputLabel>
                                <Input
                                    id="setResult"
                                    name="setResult"
                                    autoComplete="setResult"
                                    autoFocus
                                    value={this.state.result2}
                                    onChange={(e) => this.setState({ result2: e.target.value })} />
                            </FormControl>
                            <Snackbar
                                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                                open={this.state.open}
                                autoHideDuration={3000}
                                onClose={this.handleSnackbarClose}
                                ContentProps={{ 'aria-errormessage': 'message-id', }}
                                message={<span id="message-id" >{this.state.errorMessage}</span>}
                                action={[
                                    <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="secondary"
                                        className={classes.close}
                                        onClick={this.handleSnackbarClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>,
                                ]}
                            />

                        </div>
                    </Paper>
                </main>
            </React.Fragment>


        );

    }
}

PinStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PinStatus);