// Spam trap: moved off-screen and hidden from screen readers and keyboard
// navigation, so real visitors never fill it in — bots usually do. The backend
// silently drops any submission where it has a value.
export default function HoneypotField({ value, onChange }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
      <label htmlFor="website">Website</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
