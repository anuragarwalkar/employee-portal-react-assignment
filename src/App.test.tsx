import React from "react";
import { App } from "./App";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Enzyme from "enzyme-adapter-react-16";

configure({ adapter: new Enzyme() });

describe("<App />", () => {
  it("should render <App /> if user is not authenticated", () => {
    const wrapper: ShallowWrapper = shallow(<App isAuthenticated={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render <App /> if user is not authenticated", () => {
    const wrapper: ShallowWrapper = shallow(<App isAuthenticated={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});
