// 16. Dodaj wydarzenie publiczne
// POST student-meeting-service:8080/api/events

// REQUEST HEADER:
// "User-Token": "" //String, token autoryzacyjny użytkownika

// RQUEST BODY:
// {
//     "name": "", //String
//     "locationId": "", //String
//     "description": "", //String, opcjonalne
//     "startDate": "2012-04-23T18:25:43.511Z" //Date
// }

import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import "./EventsPage.module.css"
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import moment from "moment"

function addEvent(token, body) {
    return  axios
        .post('http://3.68.195.28/api/events', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }, body)
}

const EventsAdd = (props) => {

    const [name, setName] = useState('');
    const [localization, setLocalization] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(dayjs('2012-04-23T18:25:43.511Z'));
    const [user, setUser] = useState({});

    useEffect(()=> {
        let user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, [])

    const handleChange = (newValue) => {
        console.log(newValue)
        setStartDate(dayjs(newValue));
    };

    const handleSubmit = () => {
        console.log('submit')
        let payload = {
            name: name,
            locationId: localization,
            description: description,
            startDate: moment(startDate).format()
        }
        console.log(user.token)
        console.log(payload)
        addEvent(user.token, payload)
    }

    return(

        /// я использовал материал
        /// поправить навЛинк и лейаут в целом
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <NavLink className="NavLinkBtn" to="/profile/events">
                        <Icon
                            icon="akar-icons:arrow-left"
                            color="#122c34"
                            width="300"
                            height="300"
                        />
                        Wróć do wydarzen
                    </NavLink>
                    <Box
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <TextField onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Nazwa" variant="outlined" />
                        <TextField onChange={(e) => setLocalization(e.target.value)} id="outlined-basic" label="Lokalizacja" variant="outlined" />
                        <TextField onChange={(e) => setDescription(e.target.value)} id="outlined-basic" label="Opis" variant="outlined" />

                        <DateTimePicker
                            label="Date&Time picker"
                            value={startDate}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Button onClick={(e) => {
                            handleSubmit();
                        }}> Dodaj wydarzenie</Button>
                    </Box>

                </div>
            </LocalizationProvider>

        </>
    )
}

export default EventsAdd;