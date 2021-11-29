import React from "react";
import { shallow } from "enzyme";
import MapDeckGL from "./MapDeckGL";

describe("MapDeckGL", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MapDeckGL />);
    expect(wrapper).toMatchSnapshot();
  });
});
