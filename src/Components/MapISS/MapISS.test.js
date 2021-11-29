import React from "react";
import { shallow } from "enzyme";
import MapISS from "./MapISS";

describe("MapISS", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MapISS />);
    expect(wrapper).toMatchSnapshot();
  });
});
