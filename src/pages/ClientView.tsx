import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Grid,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from "@mui/material";
import { Client, Provider, ProviderSchedule } from "../data";

type ClientViewProps = {
  providersData: Provider[];
  clientsData: Client[];
  handleRequestReservation: (
    scheduleId: string,
    clientId: string,
    startTime: Dayjs
  ) => void;
};

const ClientView: React.FC<ClientViewProps> = ({
  clientsData,
  providersData,
  handleRequestReservation,
}) => {
  const [selectedSchedule, setSelectedSchedule] =
    useState<ProviderSchedule | null>(null);

  const [timeInterval, setTimeInterval] = useState<Dayjs[] | null>(null);

  const handleRangeInterval = (selectedSchedule: ProviderSchedule) => {
    const start = dayjs(selectedSchedule.startTime);
    const end = dayjs(selectedSchedule.endTime);
    const range = end.diff(start, "minute");
    const intervals = range / 15;
    const intervalArr = [];
    for (let i = 0; i < intervals; i++) {
      const interval = start.add(15 * i, "minute");
      intervalArr.push(interval);
    }
    setTimeInterval(intervalArr);
  };

  const handleSelectSchedule = (id: string) => {
    const selectedSchedule = providersData
      .map((provider) => provider.schedule)
      .flat()
      .find((schedule) => schedule!.id === id);
    setSelectedSchedule(selectedSchedule!);

    handleRangeInterval(selectedSchedule!);
  };

  const handleTimeSelect = (time: Dayjs) => {
    handleRequestReservation(selectedSchedule!.id, "client1", time);
    setSelectedSchedule(null);
    setTimeInterval(null);
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
        Client View
      </Typography>
      <Typography
        variant="h6"
        component="h3"
        gutterBottom
      >
        Select Schedule range to request 15m
      </Typography>
      {providersData.map((provider: Provider) =>
        provider.schedule.map((schedule, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => handleSelectSchedule(schedule!.id)}
          >
            {dayjs(schedule?.startTime).format("MMM D, YYYY h:mm A")}-
            {dayjs(schedule?.endTime).format("MMM D, YYYY h:mm A")}
          </Button>
        ))
      )}

      {/* when selected schedule, show 15 minute intervals to request time in that schedule */}
      {timeInterval && (
        <Box mt={2}>
          {timeInterval?.map((interval, index) => (
            <Box
              key={index}
              m={0.5}
              display="inline-block"
            >
              <Button
                variant="contained"
                onClick={() => handleTimeSelect(dayjs(interval))}
              >
                {dayjs(interval).format("h:mm A")}
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Grid>
  );
};

export default ClientView;
