import dayjs, { Dayjs } from "dayjs";
export type ProviderReservedTime = {
  id: string;
  clientId: string;
  startTime: Dayjs;
  confirmed: boolean;
};

export type ProviderSchedule = {
  id: string;
  startTime: Dayjs;
  endTime: Dayjs;
  reservedTimes: ProviderReservedTime[] | null[];
};

export type Provider = {
  id: string;
  schedule: ProviderSchedule[] | null[];
};

export const providers = [
  {
    id: "provider1", // can be converted to uuid and add name key field in the future
    schedule: [
      {
        id: crypto.randomUUID(),
        startTime: dayjs("2023-08-13 12:00 PM"),
        endTime: dayjs("2023-08-13 08:00 PM"),
        reservedTimes: [
          {
            id: crypto.randomUUID(),
            clientId: "client1",
            startTime: dayjs("2023-08-13 12:30 PM"),
            confirmed: false,
          },
        ],
      },
    ],
  },
];

export type ClientReservation = {
  providerId: string;
  reservationDateTime: Dayjs;
};

export type Client = {
  id: string;
  confirmedReservations: ClientReservation[] | null[];
};

export const clients = [
  {
    id: "client1",
    confirmedReservations: [
      {
        providerId: "provider1",
        reservationDateTime: dayjs("2023-08-13 03:00 PM"),
      },
    ],
  },
];
