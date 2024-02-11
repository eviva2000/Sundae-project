import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole("alert", {});
  expect(alerts).toHaveLength(2);
});

// when we have more that one await, the assertion may happen before the last one finishes and we get an array of 1 instead of 2 elemnts.
//to resolve this issue we use a methid called "waitFor":
// await waitFor(async()=>{
// const alerts = await screen.findAllByRole("alert", {});
// expect(alerts).toHaveLength(2);
//})
