const form = document.querySelector("form");

export function addInputCommonEventListener() {
  const allInputsTypeText = form.querySelectorAll(
    "div.input-text-container input"
  );
  console.log(allInputsTypeText);
  for (let i = 0; i < allInputsTypeText.length; i++) {
    const input = allInputsTypeText[i];
    const inputParentNode = input.parentNode;

    input.addEventListener("focus", () => {
      inputParentNode.classList.add("selected");
    });
    input.addEventListener("focusout", () => {
      if (input.value.length < 1) {
        inputParentNode.classList.remove("selected");
      }
    });

    if (input.type == "password") {
      const icon = inputParentNode.querySelector("i");
      const types = {
        text: "password",
        password: "text",
      };
      icon.addEventListener("click", () => {
        input.type = types[input.type];
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
      });
    }
  }
}
