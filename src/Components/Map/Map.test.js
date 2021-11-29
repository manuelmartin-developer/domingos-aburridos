import React from "react";
import { shallow } from "enzyme";
import Map from "./Map";

describe("Map", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Map />);
    expect(wrapper).toMatchSnapshot();
  });
});
