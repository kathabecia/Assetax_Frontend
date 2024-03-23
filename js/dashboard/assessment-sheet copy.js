document.addEventListener("DOMContentLoaded", function () {
  const classificationSelects = document.querySelectorAll(
    'select[name="classification"]'
  );
  const subClassificationSelects = document.querySelectorAll(
    'select[name="sub-classification"]'
  );
  const areaInputs = document.querySelectorAll('input[name="area"]');
  const unitValueInputs = document.querySelectorAll(
    'input[name="unit-value-input"]'
  );
  const baseMarketValueInputs = document.querySelectorAll(
    'input[name="base-market-value"]'
  );
  const totalBaseMarketValueOutput = document.getElementById(
    "total-base-market-value"
  );

  // Add event listener to each classification select element
  classificationSelects.forEach((classificationSelect) => {
    classificationSelect.addEventListener("change", function () {
      const selectedClassification = this.value;
      const parentRow = this.closest("tr");
      const subClassificationSelect = parentRow.querySelector(
        'select[name="sub-classification"]'
      );

      // Hide all options first
      subClassificationSelect.querySelectorAll("option").forEach((option) => {
        option.style.display = "none";
      });

      // Show sub-classifications based on the selected classification
      switch (selectedClassification) {
        case "Residential":
          showSubClassifications(subClassificationSelect, [
            "R-1",
            "R-2",
            "R-3",
            "R-4",
          ]);
        default:
          // If other classifications are selected, show all options
          subClassificationSelect
            .querySelectorAll("option")
            .forEach((option) => {
              option.style.display = "block";
            });
      }

      // Reset selected sub-classification
      subClassificationSelect.value = "";
    });
  });

  // Add event listener to each sub-classification select element
  subClassificationSelects.forEach((subClassificationSelect) => {
    subClassificationSelect.addEventListener("change", function () {
      const selectedSubClassification = this.value;
      const unitValueInput = this.closest("tr").querySelector(
        'input[name="unit-value-input"]'
      );

      // Set unit value based on the selected sub-classification
      switch (selectedSubClassification) {
        case "R-1":
          unitValueInput.value = "400";
          break;
        case "R-2":
          unitValueInput.value = "300";
          break;
        case "R-3":
          unitValueInput.value = "200";
          break;
        case "R-4":
          unitValueInput.value = "100";
          break;
        default:
          unitValueInput.value = ""; // Clear the unit value if none of the above cases match
      }
    });
  });

  // Add event listener to each area input element
  areaInputs.forEach((areaInput, index) => {
    areaInput.addEventListener("input", function () {
      const area = parseFloat(this.value);
      const unitValue = parseFloat(unitValueInputs[index].value);
      const baseMarketValue = area * unitValue;

      if (!isNaN(baseMarketValue)) {
        baseMarketValueInputs[index].value = baseMarketValue.toFixed(2);
      } else {
        baseMarketValueInputs[index].value = "";
      }

      updateTotalBaseMarketValue(); // Recalculate total base market value
    });
  });

  // Add event listener to each unit value input element
  unitValueInputs.forEach((unitValueInput, index) => {
    unitValueInput.addEventListener("input", function () {
      const area = parseFloat(areaInputs[index].value);
      const unitValue = parseFloat(this.value);
      const baseMarketValue = area * unitValue;

      if (!isNaN(baseMarketValue)) {
        baseMarketValueInputs[index].value = baseMarketValue.toFixed(2);
      } else {
        baseMarketValueInputs[index].value = "";
      }

      updateTotalBaseMarketValue(); // Recalculate total base market value
    });
  });

  // Function to update total base market value
  function updateTotalBaseMarketValue() {
    let totalBaseMarketValue = 0;
    baseMarketValueInputs.forEach((input) => {
      const value = parseFloat(input.value);
      if (!isNaN(value)) {
        totalBaseMarketValue += value;
      }
    });
    totalBaseMarketValueOutput.textContent = totalBaseMarketValue.toFixed(2);
  }

  // Function to show sub-classifications based on the selected classification
  function showSubClassifications(selectElement, subClassifications) {
    subClassifications.forEach((subClassification) => {
      const option = selectElement.querySelector(
        `option[value="${subClassification}"]`
      );
      if (option) {
        option.style.display = "block";
      }
    });
  }

  // Call the function initially to calculate total base market value
  updateTotalBaseMarketValue();
});
