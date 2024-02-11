import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("display image for each scoop option from server (msw)", async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map((image) => image.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanila scoop"]);
});

test("display image for each topping option from server (msw)", async () => {
  render(<Options optionType="toppings" />);

  //find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(2);

  //confirm alt text for imges
  const altText = toppingImages.map((image) => image.alt);
  expect(altText).toEqual(["Cherries topping", "M&Ms topping"]);
});
