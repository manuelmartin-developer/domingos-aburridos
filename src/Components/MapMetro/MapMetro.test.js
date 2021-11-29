import React from "react";
import { shallow } from "enzyme";
import MapMetro from "./MapMetro";

describe("MapMetro", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MapMetro />);
    expect(wrapper).toMatchSnapshot();
  });
});
