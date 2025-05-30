export default function AlertSucces() {
  return (
    <div
      role="alert"
      className="alert alert-success fixed top-0 max-w-[1200px] left-[20%] mt-4 transition-all duration-500 text-white animate-slide-down z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Your purchase has been confirmed!</span>
    </div>
  );
}
