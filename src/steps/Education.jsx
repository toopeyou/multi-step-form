function Education({ formData, updateForm }) {
  return (
    <div>
      <h2>Education Information</h2>
      <label>University Name</label>
      <input type="text"  placeholder="Enter university" value={formData.university}
        onChange={(e) => updateForm("university", e.target.value)}
      />
    </div>
  );
}

export default Education;