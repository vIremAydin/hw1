import React, {useState, useEffect, useRef} from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import clsx from "clsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import {Search} from "@material-ui/icons";
import {Tooltip} from "@material-ui/core";


const useStyles = makeStyles({
    box: {
        marginTop: "100px",
        marginBottom: "100px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        background: "#E6D7FF",
        width: "80%"
    },
    title: {
        textAlign: "center",
        fontSize: "50px"
    },
    smallTitle: {
        textAlign: "center",
        fontSize: "20px"
    },
    outerBox: {
        marginTop: "auto",
        display: "flex",

        justifyContent: "space-between",
    },
    innerBox: {
        margin: "25px",

    },
    buttonGroup: {
        padding: "0",
        margin: "0",
    },
    button: {},
    formControl: {
        minWidth: 120,

    },
    table: {
        minWidth: 650,
        marginTop: "50px",
    },

    deleteIcon: {
        "&:hover": {
            color: "red",
        }
    },
    head: {
        background: "lightgrey"
    },

    search: {
        position: 'relative',
        backgroundColor: "white",
        marginLeft: 0,
        width: '100%',

    },
    searchIcon: {
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: "10px",
        left: "1px"
    },

});

const Form = () => {
    const classes = useStyles();
    const [userName, setUserName] = useState("");
    const [surname, setSurname] = useState("");
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    const [countryID, setCountryID] = useState("");
    const [countries, setCountries] = useState([]);
    const [isImperialUnit, setIsImperialUnit] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [id, setID] = useState(Math.random);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(allUsers);


    const switchRef = useRef();


    useEffect(() => {
        const results = allUsers.filter(person =>
            person.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, allUsers]);

    useEffect(() => {
        getCountries();
        setAllUsers(JSON.parse(localStorage.getItem('userInformation')));
        setSearchResults(allUsers);
    }, []);

    useEffect(() => {
        const savedUserInfo = localStorage.getItem("userInformation");
        JSON.parse(savedUserInfo)?.isImperialUnit &&
        setIsImperialUnit(JSON.parse(savedUserInfo).isImperialUnit);
    }, []);

    useEffect(() => {
        localStorage.setItem("userInformation", JSON.stringify(allUsers));
        console.log((allUsers));
    }, [allUsers]);

    const surnameHandler = (value) => {
        setSurname(value);
    };

    const userNameHandler = (value) => {
        setUserName(value);
    };

    const weightHandler = (value) => {
        setWeight(value);
    };

    const heightHandler = (value) => {
        setHeight(value);
    };

    const genderHandler = (value) => {
        setGender(value);
    };

    const unitHandler = () => {
        setIsImperialUnit((oldState) => !oldState);
    };

    const countryHandler = (value) => {
        setCountryID(value);

        setCountry(value ? countries[value].countryName : "");
    };

    const getSwitchInfo = () => {
        console.log(switchRef);
    };

    const searchHandler = (value) => {
        setSearchTerm(value);
    }


    const submitHandler = () => {
        const userInfo = {
            surname,
            weight,
            height,
            userName,
            gender,
            isImperialUnit,
            country,
            id,
        };
        setAllUsers(allUsers => userInfo.surname ? [...allUsers, userInfo] : (allUsers));
        if (!surname)
            alert("surname is required");
        //setAllUsers(allUsers =>  [...allUsers, userInfo]);
        setID(Math.random());

    };

    const getCountries = () => {
        axios.get("https://countriesnow.space/api/v0.1/countries").then((res) => {
            const countryArr = res.data.data.map((countryItem, index) => {
                return {countryName: countryItem.country, id: index};
            });

            setCountries(countryArr);
        });
    };

    const removeItem = (id) => {
        //

        setAllUsers(allUsers.filter(item => item.id !== id));

        //
    }

    const clear = () => {
        setAllUsers([]);
    }

    return (
        <Box className={classes.box}>
            <h1 className={classes.title}>Form</h1>

            <Box className={classes.innerBox}>
                <TextField
                    id="name-input"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => userNameHandler(e.target.value)}
                />
            </Box>


            <Box className={classes.innerBox}>
                <TextField
                    fullWidth
                    required
                    id="surname-input"
                    label="Surname"
                    variant="outlined"
                    onChange={(e) => surnameHandler(e.target.value)}
                />
            </Box>

            <Box className={classes.outerBox}>
                <Box className={classes.innerBox}>
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="coutry-label">Country</InputLabel>
                        <Select
                            labelId="country-label"
                            id="country-select"
                            value={countryID}
                            onChange={(e) => countryHandler(e.target.value)}
                        >
                            {countries.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.countryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box className={classes.innerBox}>
                    <FormControl
                        className={clsx(classes.buttonGroup, classes.button)}
                        component="fieldset"
                        fullWidth
                    >
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-label="gender"
                            name="gender1"
                            value={gender}
                            onChange={(e) => genderHandler(e.target.value)}
                        >
                            <FormControlLabel
                                value="female"
                                control={<Radio/>}
                                label="Female"
                            />
                            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                            <FormControlLabel
                                value="other"
                                control={<Radio/>}
                                label="Other"
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
            <Box className={classes.outerBox}>
                <Box className={classes.innerBox}>
                    <TextField
                        label="Weight"
                        type="number"
                        id="weight-input"
                        fullWidth
                        onChange={(e) => weightHandler(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {isImperialUnit ? "Lbs" : "Kg"}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box className={classes.innerBox}>
                    <TextField
                        fullWidth
                        ref={switchRef}
                        label="Height"
                        id="height-input"
                        type="number"
                        onChange={(e) => heightHandler(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {isImperialUnit ? "Inc" : "Cm"}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box className={classes.innerBox}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isImperialUnit}
                                onChange={() => unitHandler()}
                                name="checkedA"
                                inputProps={{"aria-label": "secondary checkbox"}}
                            />
                        }
                        label="Is Unit Imperial"
                        labelPlacement="top"
                    />
                </Box>
            </Box>

            <Box className={classes.outerBox}>
                <Box className={classes.innerBox}>
                    <CustomButton
                        buttonFunction={() => submitHandler()}
                        buttonText={"Submit"}
                    />
                </Box>
                <Box className={classes.innerBox}>
                    <CustomButton
                        buttonFunction={() => getSwitchInfo()}
                        buttonText={"Get Ref Info"}
                    />

                </Box>
            </Box>
            <TableContainer component={Paper}>
                <h3 className={classes.smallTitle}>All Users</h3>

                <Box className={classes.innerBox}>

                    <TextField
                        id="input-with-icon-textfield"
                        label="Search Username"
                        onChange={(e) => searchHandler(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.head}>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Surname</TableCell>
                            <TableCell align="left">Weight</TableCell>
                            <TableCell align="left">Height</TableCell>
                            <TableCell align="left">Gender</TableCell>
                            <TableCell align="left">Country</TableCell>
                            <TableCell align="left">is Imperial Unit</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.userName}
                                </TableCell>
                                <TableCell align="left">{row.surname}</TableCell>
                                <TableCell align="left">{row.weight}</TableCell>
                                <TableCell align="left">{row.height}</TableCell>
                                <TableCell align="left">{row.gender}</TableCell>
                                <TableCell align="left">{row.country}</TableCell>
                                <TableCell align="left">{(row.isImperialUnit) ? "yes" : "no"}</TableCell>
                                <TableCell align="center"><Tooltip title={"Delete"}><span className={classes.deleteIcon}
                                                                style={{cursor: "pointer"}}
                                                                onClick={() => removeItem(row.id)}><DeleteIcon/></span>
                                </Tooltip></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box style={{justifyContent: "center"}} className={classes.outerBox}>

                    <Box className={classes.innerBox}>
                        <CustomButton
                            buttonFunction={() => clear()}
                            buttonText={"Clear"}
                        />
                    </Box>
                </Box>
            </TableContainer>
        </Box>

    );
};

export default Form;
