function ProgressBar({ current, total, errors }) {
  const percentage = (current / total) * 100;

  return (
    <div>
      <p>Step {current} of {total}</p>
      <div className="progress">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

export default ProgressBar;