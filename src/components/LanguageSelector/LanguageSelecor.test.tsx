import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"
import LanguageSelector from "./LanguageSelector"
import userEvent from "@testing-library/user-event"

test("LanguageSelector should render and change language correctly", async () => {
  const mockOnLanguageChange = "pt"
  renderWithProviders(<LanguageSelector />)

  expect(screen.getByLabelText(/select language/i)).toBeInTheDocument()
  expect(screen.getByLabelText("Select language")).toHaveValue("English")

  const languageSelect = screen.getByLabelText("Select language")
  await userEvent.selectOptions(languageSelect, "Spanish")

  expect(screen.getByLabelText("Select language")).toHaveValue("Spanish")

  await userEvent.click(screen.getByText("Change Language"))

  expect(mockOnLanguageChange).toHaveBeenCalledWith("Spanish")
})
