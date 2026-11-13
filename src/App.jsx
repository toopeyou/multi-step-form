
import { useState, useEffect, useRef } from "react";

import PersonalInfo from "./steps/PersonalInfo";
import Occupation from "./steps/Occupation";
import Education from "./steps/Education";
import Professional from "./steps/Professional";
import ProgressBar from "./components/ProgressBar";
import FormPreview from "./components/FormPreview";

import "./App.css";

const initialData = {
  fullName: "",
  email: "",
  occupation: "",
  university: "",
  company: ""
};

function App(

  
) {
  const allSteps = [
    {
      id: "personal",
      title: "Personal Information"
    },
    {
      id: "occupation",
      title: "Occupation"
    },
    {
      id: "details",
      title: "Additional Information",
      showIf: (data) => data.occupation !== ""
    },
    {
      id: "preview",
      title: "Preview"
    }
  ];

  const [formData, setFormData] = useState(() => {
    try {
      return {
        ...initialData,
        ...JSON.parse(localStorage.getItem("formData"))
      };
    } catch {
      return initialData;
    }
  });
  const [currentStep, setCurrentStep] = useState(0);
  const isHistoryNavigation = useRef(false);
  const headingRef = useRef(null);

  const updateForm = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "occupation") {
        if (value === "Student") {
          updated.company = "";
        } else if (value === "Professional") {updated.university = "";}
      }

      return updated;
    });

    setErrors((prev) => ({
      ...prev,
      [field]: ""
    }));
  };

  useEffect(() => {
    localStorage.setItem(
      "formData",
      JSON.stringify(formData)
    );
  }, [formData]);




  
  const steps = allSteps.filter(
    (step) => step.showIf?.(formData) ?? true
  );


  
  useEffect(() => {
    const handlePopState = () => {
      const stepFromUrl = Number(
        new URLSearchParams(window.location.search).get("step")
      );

      if (
        Number.isInteger(stepFromUrl) &&
        stepFromUrl >= 0 &&
        stepFromUrl < steps.length
      ) {
        isHistoryNavigation.current = true;
        setCurrentStep(stepFromUrl);
      } else {
        isHistoryNavigation.current = true;
        setCurrentStep(0);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [steps.length]);




  const activeStep = steps[currentStep];

  useEffect(() => {
      const timer = setTimeout(() => {
      const firstInput = document.querySelector(".form-content input");
      firstInput?.focus();
    }, 0);

    return () => clearTimeout(timer);
  }, [currentStep]);


  const [errors, setErrors] = useState({});


  const validateStep = () => {
    const newErrors = {};
    if (activeStep.id === "personal") {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Name is required";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Enter a valid email";
      }
    }

    if (activeStep.id === "occupation") {
      if (!formData.occupation) {
        newErrors.occupation = "Select your occupation";
      }
    }

    if (activeStep.id === "details") {
      if (
        formData.occupation === "Student" &&
        !formData.university.trim()
      ) {
        newErrors.university = "University is required";
      }

      if (
        formData.occupation === "Professional" &&
        !formData.company.trim()
      ) {
        newErrors.company = "Company is required";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      window.history.pushState(
        { step: nextStep },
        "",
        `?step=${nextStep}`
      );

      setCurrentStep(nextStep);
    }
  };
  const handleBack = () => {
    if (currentStep > 0) {
      window.history.back();
    }
  };

  const handleReset = () => {
    if (!window.confirm("u sure you want to reset the form?")) {
      return;
    }

    setFormData(initialData);
    setCurrentStep(0);
    setErrors({});
    localStorage.removeItem("formData");
  };

  const handleSubmit = () => {

    alert("Form submitted");

    localStorage.removeItem("formData");
    setFormData(initialData);
    setCurrentStep(0);
    setErrors({});
  };

  const renderStep = () => {
    switch (activeStep.id) {
      case "personal":
        return (
          <PersonalInfo
            formData={formData}
            updateForm={updateForm}
            errors={errors}
          />
        );

      case "occupation":
        return (
          <Occupation formData={formData}
            updateForm={updateForm}
            errors={errors}
          />
        );

      case "details":
        return formData.occupation === "Student" ? (
          <Education
            formData={formData}
            updateForm={updateForm}
            errors={errors}
          />
        ) : (
          <Professional
            formData={formData}
            updateForm={updateForm}
            errors={errors}
          />
        );

      case "preview":
        return <FormPreview formData={formData} />;

      default:
        return null;
    }
  };

  const isLastStep = activeStep.id === "preview";
  return (
    <main className="app">
      <div className="form-container">
        <h1 ref={headingRef} tabIndex="-1">
          Multi-Step Registration Form
        </h1>
        <ProgressBar current={currentStep + 1}    total={steps.length} />
        <section className="form-content">
          {renderStep()}
          {Object.entries(errors).map(([field, message]) => (
            <p className="error" key={field}>
              {message}
            </p>
          ))}
        </section>

        <div className="form-buttons">
          <button type="buttoon"onClick={handleBack} disabled={currentStep === 0}>
            Back
          </button>

          {!isLastStep ? (
            <button type="button" onClick={handleNext}>Next</button>
          ) : (
            <button type="buton" onClick={handleSubmit}>submit</button>
          )}

          <button type="button" className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
