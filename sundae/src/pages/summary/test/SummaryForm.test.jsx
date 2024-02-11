import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("initial condition", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button", { name: "Confirm order" });

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("checking checkbox will enable/disable button", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button", { name: "Confirm order" });

  await user.click(checkbox);
  expect(button).toBeEnabled();

  await user.click(checkbox);
  expect(button).toBeDisabled();
});

test("Popover response to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  // popover is hidden initially
  const nullPopover = screen.queryByText(/no ice cream will be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox
  const termsAndCondition = screen.getByText(/terms and condition/i);
  await user.hover(termsAndCondition);
  const popover = screen.getByText(/no ice cream will be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we  mouse out
  await user.unhover(termsAndCondition);
  expect(popover).not.toBeInTheDocument();
});
