import React from "react";
import { LogInRegister } from "./loginRegisterForm";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Enzyme from "enzyme-adapter-react-16";
import TextField from "@material-ui/core/TextField";

configure({ adapter: new Enzyme() });

describe("<LogInRegister />", () => {
  it("should render sign-in screen <LogInRegister />", () => {
    const wrapper: ShallowWrapper = shallow(<LogInRegister isSignIn={true} togglePage={() => {} } auth={() => {}} loading={false} signInWithGoogle={() => {}} />);
    expect(wrapper.find(TextField)).toHaveLength(2);
  });

  it("should render sign-up in screen <LogInRegister />", () => {
    const wrapper: ShallowWrapper = shallow(<LogInRegister isSignIn={false} togglePage={() => {} } auth={() => {}} loading={false} signInWithGoogle={() => {}} />);
    expect(wrapper.find(TextField)).toHaveLength(3);
  });
});
