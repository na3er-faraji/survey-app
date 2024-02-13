import { render } from "@testing-library/react";
import Alert from "./Alert";
import { AlertType } from "../enum/AlertType";

describe("Alert Component", () => {
  it("renders message properly", async () => {
    const message = "alert testing";
    const { getByText } = render(
      <Alert showIcon={true} message={message} type={AlertType.Error} />
    );
    expect(getByText(message)).toBeInTheDocument();
  });

  test("renders icon when showIcon is true", () => {
    const message = "Test message with icon";
    const { getByTestId } = render(
      <Alert showIcon={true} message={message} type={AlertType.Error} />
    );
    const iconElement = getByTestId("alert-icon");
    expect(iconElement).toBeInTheDocument();
    // You can add more assertions for icon attributes or styles if needed
  });
});
