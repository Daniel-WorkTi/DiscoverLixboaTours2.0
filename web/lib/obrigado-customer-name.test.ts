import { describe, expect, it } from "vitest";
import { firstNameForGreeting } from "./obrigado-customer-name";

describe("firstNameForGreeting", () => {
  it("uses the first word", () => {
    expect(firstNameForGreeting("Maria João Silva")).toBe("Maria");
    expect(firstNameForGreeting("  Pedro  ")).toBe("Pedro");
  });

  it("single name", () => {
    expect(firstNameForGreeting("Ana")).toBe("Ana");
  });

  it("empty input", () => {
    expect(firstNameForGreeting("")).toBe("");
    expect(firstNameForGreeting("   ")).toBe("");
  });

  it("markup-like string stays as text (first token; React escapes in UI)", () => {
    expect(firstNameForGreeting("<script>x</script> Ana")).toBe("<script>x</script>");
  });
});
