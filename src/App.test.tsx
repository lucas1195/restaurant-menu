import { screen, waitFor } from "@testing-library/react"
import App from "./App"
import { renderWithProviders } from "./utils/test-utils"

test("App should have correct initial render", () => {
  renderWithProviders(<App />)

  expect(screen.getByText(/learn/i)).toBeInTheDocument()

  expect(screen.getByLabelText("Count")).toHaveTextContent("0")
  expect(screen.getByLabelText("Set increment amount")).toHaveValue(2)
})

test("Increment value and Decrement value should work as expected", async () => {
  const { user } = renderWithProviders(<App />)

  await user.click(screen.getByLabelText("Increment value"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("1")

  await user.click(screen.getByLabelText("Decrement value"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("0")
})

test("Add Amount should work as expected", async () => {
  const { user } = renderWithProviders(<App />)

  await user.click(screen.getByText("Add Amount"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("2")

  const incrementValueInput = screen.getByLabelText("Set increment amount")
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "2")
  await user.click(screen.getByText("Add Amount"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("4")

  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "-1")
  await user.click(screen.getByText("Add Amount"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("3")
})

it("Add Async should work as expected", async () => {
  const { user } = renderWithProviders(<App />)

  await user.click(screen.getByText("Add Async"))

  await waitFor(() =>
    expect(screen.getByLabelText("Count")).toHaveTextContent("2"),
  )

  const incrementValueInput = screen.getByLabelText("Set increment amount")
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "2")

  await user.click(screen.getByText("Add Async"))
  await waitFor(() =>
    expect(screen.getByLabelText("Count")).toHaveTextContent("4"),
  )

  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "-1")
  await user.click(screen.getByText("Add Async"))
  await waitFor(() =>
    expect(screen.getByLabelText("Count")).toHaveTextContent("3"),
  )
})

test("Add If Odd should work as expected", async () => {
  const { user } = renderWithProviders(<App />)

  await user.click(screen.getByText("Add If Odd"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("0")

  await user.click(screen.getByLabelText("Increment value"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("1")

  await user.click(screen.getByText("Add If Odd"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("3")

  const incrementValueInput = screen.getByLabelText("Set increment amount")
  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "1")
  await user.click(screen.getByText("Add If Odd"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("4")

  await user.clear(incrementValueInput)
  await user.type(incrementValueInput, "-1")
  await user.click(screen.getByText("Add If Odd"))
  expect(screen.getByLabelText("Count")).toHaveTextContent("4")
})
