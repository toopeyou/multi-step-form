function Professional({ formData, updateForm }) {
  return (
    <div>
      <h2>Professional Information</h2>

      <label>Company Name</label>
      <input type="text" placeholder="Enter company name" value={formData.company}
        onChange={(e) => updateForm("company", e.target.value)}
      />
    
    </div>
  );
}

export default Professional;