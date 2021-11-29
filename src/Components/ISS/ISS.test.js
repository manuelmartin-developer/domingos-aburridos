import React from "react";
import { shallow } from "enzyme";
import ISS from "./ISS";

describe("ISS", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ISS />);
    expect(wrapper).toMatchSnapshot();
  });
});
