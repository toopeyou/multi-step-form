function PersonalInfo({ formData, updateForm, errors }) {
  return (
    <div>
      <h2>Personal Information</h2>
      <label>Full Name</label>
      <input type="text"placeholder="Enter your name"value={formData.fullName}
        onChange={(e) => updateForm("fullName", e.target.value) }
      />
      {errors.fullName && (
        <p className="error">{errors.fullName}</p>
      )}
      <label>Email</label>
      <input type="email" placeholder="Enter your email"value={formData.email}
        onChange={(e) => updateForm("email", e.target.value)}
      />
        {errors.email && (
          <p className="error">{errors.email}</p>
        )}

    </div>    
  );
}

export default PersonalInfo