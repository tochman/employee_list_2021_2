import Weather from "../Weather";
import React from "react";

import axios from "axios";
import { render, screen } from "@testing-library/react";

import { openCageResponse } from "../mocks/openCageResponse";
import { openWeatherResponse } from "../mocks/openWeatherResponse";

let axiosSpy, getPositionSpy;

describe("Weather.jsx", () => {
  beforeEach(() => {
    getPositionSpy = jest
      .spyOn(Weather.prototype, "getPosition")
      .mockReturnValue({
        coords: {
          longitude: 11.96,
          latitude: 57.7,
        },
      });
    axiosSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValueOnce(openCageResponse)
      .mockResolvedValueOnce(openWeatherResponse);

    render(<Weather />);
  });

  it("is expected to call for position", () => {
    expect(getPositionSpy).toHaveBeenCalledTimes(1);
  });

  it("us expected to make 2 axios calls", () => {
    expect(axiosSpy).toHaveBeenCalledTimes(2);
  });

  it("is expected to render the city name", () => {
    expect(screen.getByText("You are in Gothenburg")).toBeInTheDocument();
  });

  it("is expected to render temperature", () => {
    expect(screen.getByText("Current temperature is 10℃")).toBeInTheDocument();
  });
});
