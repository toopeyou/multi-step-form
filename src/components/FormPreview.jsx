function FormPreview({ formData }) {
  return (
    <div>
      <h2>Application Preview</h2>
      <p>
        <strong>Full Name:</strong> {formData.fullName}
      </p>
      <p>
        <strong>Email</strong> {formData.email}
      </p>
      <p>
        <strong>Occupation:</strong> {formData.occupation}
      </p>

      {formData.occupation === "Student" && (
        <p>
          <strong>University:</strong> {formData.university}
        </p>
      )}

      {formData.occupation === "Professional" && (
        <p>
          <strong>Compan:</strong> {formData.company}
        </p>
      )}
    </div>
  );
}

export default FormPreview;