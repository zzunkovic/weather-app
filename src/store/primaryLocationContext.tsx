import React, { ReactNode, useContext, useState } from "react";

type locationData = {
  name: string;
  lat: string;
  lng: string;
};

type PrimaryLocationContext = {
  primaryLocation: locationData | undefined;
  addPrimaryLocation: (locationData: locationData) => void;
};

const primaryLocationContext = React.createContext<PrimaryLocationContext>({
  primaryLocation: undefined,
  addPrimaryLocation: () => {},
});

export const usePrimaryLocation = () => {
  return useContext(primaryLocationContext);
};

type PrimaryLocationProps = {
  children: ReactNode;
};

export const PrimaryLocationContextProvider: React.FC<PrimaryLocationProps> = ({
  children,
}) => {
  const [primaryLocation, setPrimaryLocation] = useState<locationData>();

  const addPrimaryLocation = (locationData: locationData) => {
    localStorage.setItem(
      "LOCATION",
      JSON.stringify({
        name: locationData.name,
        lat: locationData.lat,
        lng: locationData.lng,
      })
    );
    setPrimaryLocation({
      name: locationData.name,
      lat: locationData.lat,
      lng: locationData.lng,
    });
  };

  return (
    <primaryLocationContext.Provider
      value={{ primaryLocation, addPrimaryLocation }}
    >
      {children}
    </primaryLocationContext.Provider>
  );
};
