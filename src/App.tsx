import React, { useState, useEffect } from "react";
import { providers, clients } from "./data";
import { Box, Button, Grid, Typography } from "@mui/material";
import ClientView from "./pages/ClientView";
import ProviderView from "./pages/ProviderView";
import { Provider, Client } from "./data";
import { Dayjs } from "dayjs";

const App: React.FC = () => {
  const [providersData, setProvidersData] = useState<Provider[]>([]);
  const [clientsData, setClientsData] = useState<Client[]>([]);

  useEffect(() => {
    setClientsData(clients);
    setProvidersData(providers);
  }, []);

  const handleAddProviderSchedule = (providerSchedule: any) => {
    // find schedule in provider1 id and add providerSchedule to the array
    const newProviderSchedule = {
      startTime: providerSchedule.startTime,
      endTime: providerSchedule.endTime,
      reservedTimes: [],
    };
    setProvidersData((prev) => {
      return prev.map((provider) => {
        if (provider.id === providerSchedule.id) {
          return {
            ...provider,
            schedule: [...provider.schedule, newProviderSchedule],
          };
        }
        return provider;
      });
    });
  };

  const handleConfirmReservation = (id: string) => {
    // find reservation in providerData schedule by id and set confirmed to true
    setProvidersData((prev) => {
      return prev.map((provider) => {
        return {
          ...provider,
          schedule: provider.schedule.map((schedule) => {
            return {
              ...schedule,
              reservedTimes: schedule!.reservedTimes.map((reservedTime) => {
                if (reservedTime!.id === id) {
                  return {
                    ...reservedTime,
                    confirmed: true,
                  };
                }
                return reservedTime;
              }),
            };
          }),
        };
      });
    });
  };

  const handleRequestReservation = (
    scheduleId: string,
    clientId: string,
    startTime: Dayjs
  ) => {
    // find schedule in providerData schedule by id and set confirmed to true
    setProvidersData((prev) => {
      return prev.map((provider) => {
        return {
          ...provider,
          schedule: provider.schedule.map((schedule) => {
            if (schedule!.id === scheduleId) {
              return {
                ...schedule,
                reservedTimes: [
                  ...schedule!.reservedTimes,
                  {
                    id: clientId,
                    startTime,
                    confirmed: false,
                  },
                ],
              };
            }
            return schedule;
          }),
        };
      });
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        justifyContent={"space-around"}
        xs={12}
        spacing={2}
      >
        <ProviderView
          providersData={providersData}
          handleAddProviderSchedule={handleAddProviderSchedule}
          handleConfirmReservation={handleConfirmReservation}
        />
        <ClientView
          clientsData={clientsData}
          providersData={providersData}
          handleRequestReservation={handleRequestReservation}
        />
      </Grid>
    </Box>
  );
};

export default App;
