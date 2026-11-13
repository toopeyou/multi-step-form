function Occupation({ formData, updateForm }) {
  return (
    <div>
      <h2>Choose Your Occupation</h2>
      <label>
        <input type="radio" name="occupation" value="Student" checked={formData.occupation === "Student"} onChange={() => updateForm("occupation", "Student")}
        />
        Student
      </label>
      <label>
        <input type="radio" name="occupation" value="Professional" checked={formData.occupation === "Professional"} onChange={() => updateForm("occupation", "Professional") }/> Profesional
      </label>
    </div>
  );
}

export default Occupation;