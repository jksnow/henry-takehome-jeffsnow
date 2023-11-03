import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Provider, ProviderSchedule } from "../data";

type ProviderViewProps = {
  providersData: Provider[];
  handleAddProviderSchedule: (providerSchedule: any) => void;
  handleConfirmReservation: (clientId: string, startTime: Dayjs) => void;
};

type NewProviderSchedule = {
  id: string;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
};

const ProviderView: React.FC<ProviderViewProps> = ({
  providersData,
  handleAddProviderSchedule,
  handleConfirmReservation,
}) => {
  const [showNewScheduleForm, setShowNewScheduleForm] =
    useState<boolean>(false);

  const [startTime, setStartTime] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [endTime, setEndTime] = React.useState<Dayjs | null>(dayjs(new Date()));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // going to just assume that the provider id is 1 for now
    e.preventDefault();
    const newSchedule: NewProviderSchedule = {
      id: "provider1",
      startTime,
      endTime,
    };
    handleAddProviderSchedule(newSchedule);
    setShowNewScheduleForm(false);
    console.log(newSchedule);
  };

  return (
    <Grid
      item
      xs={12}
      md={6}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
      >
        Provider View
      </Typography>
      {providersData.length === 0 ? (
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
        >
          No providers available
        </Typography>
      ) : (
        providersData.map((provider: Provider) => (
          <Typography
            key={provider.id}
            variant="h6"
            component="h3"
            gutterBottom
          >
            {`${provider.id} schedule:`}
            <List>
              {provider.schedule.map((schedule, index) => (
                <ListItem
                  key={index}
                  divider
                >
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                    >
                      <ListItemText
                        primary={`Start Time: ${dayjs(
                          schedule?.startTime
                        ).format("MMM D, YYYY h:mm A")}`}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                    >
                      <ListItemText
                        primary={`End Time: ${dayjs(schedule?.endTime).format(
                          "MMM D, YYYY h:mm A"
                        )}`}
                      />
                    </Grid>

                    {schedule?.reservedTimes.map((reservedTime) => {
                      if (reservedTime?.confirmed) {
                        return (
                          <Grid
                            container
                            xs={12}
                          >
                            <Paper>
                              <Box
                                m={1}
                                p={2}
                              >
                                <Typography>
                                  {dayjs(reservedTime?.startTime).format(
                                    "MMM D, YYYY h:mm A"
                                  )}
                                  {`15 minutes - Confirmed with ${reservedTime?.clientId}`}
                                </Typography>
                              </Box>
                            </Paper>
                          </Grid>
                        );
                      }
                    })}
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Typography>
        ))
      )}
      {/*
      if (showNewScheduleForm)  create a new ProviderScheduleForm that adds a new schedule to the provider
      */}
      {showNewScheduleForm && (
        <Paper>
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
          >
            New Schedule Form
          </Typography>

          {/* create date, starttime and endtime mui pickers and submit button to add a new schedule */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit}>
              <DateTimePicker
                label="Start Time"
                onChange={(value: Dayjs | null) => {
                  setStartTime(value);
                }}
              />
              -
              <DateTimePicker
                label="End Time"
                onChange={(value: Dayjs | null) => {
                  setEndTime(value);
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          </LocalizationProvider>
        </Paper>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowNewScheduleForm(!showNewScheduleForm)}
      >
        {showNewScheduleForm ? "Cancel" : "Add Schedule"}
      </Button>
      <Divider />
      <Grid
        item
        justifyContent={"space-around"}
        xs={12}
        spacing={2}
      >
        <Box
          m={2}
          p={3}
        >
          <Typography>Client requested times</Typography>

          {providersData.map((provider) => {
            return provider.schedule.map((schedule) => {
              return schedule?.reservedTimes.map((reservedTime) => {
                if (!reservedTime?.confirmed)
                  return (
                    <Paper>
                      <Box
                        m={1}
                        p={2}
                      >
                        <Typography>
                          {dayjs(reservedTime?.startTime).format(
                            "MMM D, YYYY h:mm A"
                          )}{" "}
                          15 minutes
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleConfirmReservation(reservedTime!.id)
                          }
                        >
                          Confirm
                        </Button>
                      </Box>
                    </Paper>
                  );
              });
            });
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProviderView;
