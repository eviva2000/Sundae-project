// This is functioning test, we wont test any component
import { screen, render } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoops subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure scoops start out from 0.00
  // we are using partial match for 'getByText' method
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check subtotal
  const vanilaInput = await screen.findByRole("spinbutton", { name: "Vanila" });

  await user.clear(vanilaInput);
  await user.type(vanilaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocklate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  //make sure that toppings subtotal starts from 0.00
  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  // update Cheries topping to be checked
  const cherryInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherryInput).not.toBeChecked();

  await user.click(cherryInput);
  expect(cherryInput).toBeChecked();
  expect(toppingSubtotal).toHaveTextContent("1.50");

  // update M&Ms topping to be checked
  const MInput = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  expect(MInput).not.toBeChecked();

  await user.click(MInput);
  expect(MInput).toBeChecked();
  expect(toppingSubtotal).toHaveTextContent("3.00");

  // update M&Ms topping to be unchecked
  await user.click(MInput);
  expect(MInput).not.toBeChecked();
  expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts from 0.00", () => {
    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total:\$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
    unmount();
  });

  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    //update vanilla scoop to 2
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanila",
    });
    const grandTotal = screen.getByRole("heading", {
      name: /grand total:\$/i,
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    //add cheries and check grand total
    const cherryInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherryInput);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    //add cheries and check grand total
    const cherryInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    const grandTotal = screen.getByRole("heading", {
      name: /grand total:\$/i,
    });
    await user.click(cherryInput);
    expect(grandTotal).toHaveTextContent("1.50");

    //update vanilla scoop to 2
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanila",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand totla updates if an item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total:\$/i,
    });

    //add topping
    const cherryInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherryInput);

    //add scoops
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanila",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    //remove topping
    await user.click(cherryInput);

    //remove 1 scoop
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("2");
  });
});
